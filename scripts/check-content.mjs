import { readdir, readFile } from "node:fs/promises"

const contentDirectory = new URL("../content/", import.meta.url)
const files = (await readdir(contentDirectory)).filter((file) => file.endsWith(".ts"))
const forbiddenPatterns = [
  { label: "example-domain URL", pattern: /https?:\/\/[^\s"'`]*\.example\.(?:com|net|org)\b/i },
  { label: "placeholder GitHub account", pattern: /github\.com\/(?:yourusername|username)\b/i },
]

const failures = []
for (const file of files) {
  const text = await readFile(new URL(file, contentDirectory), "utf8")
  for (const { label, pattern } of forbiddenPatterns) {
    if (pattern.test(text)) failures.push(`content/${file} contains ${label}`)
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"))
  process.exitCode = 1
} else {
  console.log(`Content contains no known placeholder URLs (${files.length} files checked).`)
}
