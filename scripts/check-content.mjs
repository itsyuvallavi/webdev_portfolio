import { readFile } from "node:fs/promises"

const projectData = await readFile(new URL("../lib/data.ts", import.meta.url), "utf8")
const forbiddenPatterns = [
  { label: "example-domain URL", pattern: /https?:\/\/[^\s"'`]*\.example\.(?:com|net|org)\b/i },
  { label: "placeholder GitHub account", pattern: /github\.com\/(?:yourusername|username)\b/i },
]

const failures = forbiddenPatterns
  .filter(({ pattern }) => pattern.test(projectData))
  .map(({ label }) => label)

if (failures.length > 0) {
  console.error(`Project data contains ${failures.join(" and ")}.`)
  process.exitCode = 1
} else {
  console.log("Project links contain no known placeholder URLs.")
}
