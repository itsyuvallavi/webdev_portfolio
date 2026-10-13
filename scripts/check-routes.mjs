// Checks what the server sends for every page in the sitemap. Run after `pnpm build`.
// It is a partial check: it reads HTML only, so it cannot see states set in a stylesheet.
import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const port = Number(process.env.CHECK_ROUTES_PORT ?? 3987)
const origin = `http://127.0.0.1:${port}`
const siteFacts = await readFile(new URL("../content/site.ts", import.meta.url), "utf8")
const siteUrl = siteFacts.match(/url:\s*"([^"]+)"/)?.[1]
if (!siteUrl) throw new Error("Could not read the site address from content/site.ts.")

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url))
const server = spawn(process.execPath, [nextBin, "start", "--port", String(port)], {
  cwd: fileURLToPath(new URL("..", import.meta.url)),
  stdio: ["ignore", "ignore", "inherit"],
})

const failures = []
const fail = (where, what) => failures.push(`${where}: ${what}`)

try {
  // Wait for the server to answer.
  for (let attempt = 0; ; attempt++) {
    try {
      await fetch(origin)
      break
    } catch {
      if (attempt > 100 || server.exitCode !== null) throw new Error("The production server did not start. Run `pnpm build` first.")
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text()
  const addresses = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  if (addresses.length === 0) fail("/sitemap.xml", "lists no pages")
  for (const address of addresses) {
    if (address !== siteUrl && !address.startsWith(`${siteUrl}/`)) fail("/sitemap.xml", `${address} is not under ${siteUrl}`)
  }

  const robots = await (await fetch(`${origin}/robots.txt`)).text()
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) fail("/robots.txt", `does not point at ${siteUrl}/sitemap.xml`)

  for (const address of addresses) {
    const path = new URL(address).pathname
    const response = await fetch(origin + path)
    if (response.status !== 200) {
      fail(path, `answered ${response.status}`)
      continue
    }
    const html = await response.text()
    const count = (pattern) => (html.match(pattern) ?? []).length
    if (count(/<h1[\s>]/g) !== 1) fail(path, `has ${count(/<h1[\s>]/g)} h1 elements, expected 1`)
    if (count(/<main[\s>]/g) !== 1) fail(path, `has ${count(/<main[\s>]/g)} main elements, expected 1`)
    // Content must be readable before scripts run.
    const hiddenInline = count(/style="[^"]*opacity:\s*0(?:;|")/g)
    if (hiddenInline > 0) fail(path, `${hiddenInline} element(s) start at opacity 0 in the server's HTML`)
    const hiddenClass = count(/class="(?:[^"]*\s)?opacity-0(?:\s[^"]*)?"/g)
    if (hiddenClass > 0) fail(path, `${hiddenClass} element(s) carry a bare opacity-0 class in the server's HTML`)
  }

  const missing = await fetch(`${origin}/this-page-does-not-exist`)
  if (missing.status !== 404) fail("/this-page-does-not-exist", `answered ${missing.status}, expected 404`)

  if (failures.length > 0) {
    console.error(`Route check failed:\n${failures.map((failure) => `  ${failure}`).join("\n")}`)
    process.exitCode = 1
  } else {
    console.log(`Route check passed for ${addresses.length} pages.`)
  }
} finally {
  server.kill()
}
