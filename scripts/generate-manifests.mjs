import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, "seo-checklist.json"), "utf8"));
const outputDir = path.join(root, "public-manifests");
fs.mkdirSync(outputDir, { recursive: true });

for (const [projectId, project] of Object.entries(config.projects)) {
  const checkoutDir = process.env[projectId === "steem-flags" ? "STEEM_FLAGS_DIR" : "STEEM_GAMES_DIR"];
  if (!checkoutDir || !fs.existsSync(checkoutDir)) {
    throw new Error("Missing checkout directory for " + project.repository);
  }
  const commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: checkoutDir, encoding: "utf8" }).trim();
  const branch = project.branch || "main";
  const allPaths = execFileSync("git", ["ls-files", "-z"], { cwd: checkoutDir, encoding: "utf8" })
    .split("\0").filter(Boolean).sort();
  const allowed = new Set(config.scan.extensions);
  const files = allPaths.filter(file => allowed.has(path.extname(file).toLowerCase()));
  const manifest = {
    schemaVersion: 1,
    projectId,
    repository: project.repository,
    branch,
    commit,
    generatedAt: new Date().toISOString(),
    totalTrackedFiles: allPaths.length,
    files,
    allPaths
  };
  const destination = path.join(outputDir, projectId + ".json");
  fs.writeFileSync(destination, JSON.stringify(manifest, null, 2) + "\n");
  console.log(project.repository + ": " + files.length + " source files, " + allPaths.length + " tracked paths, commit " + commit);
}
