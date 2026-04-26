import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tag = process.argv[2];

if (!tag || !/^v[0-9]+\.[0-9]+\.[0-9]+([.-][A-Za-z0-9.-]+)?$/.test(tag)) {
  console.error("Usage: npm run package -- vX.Y.Z");
  process.exit(1);
}

const version = tag.slice(1);
const skill = parseSkill();
const dist = path.join(root, "dist");
const stage = path.join(dist, "stage");
const assets = path.join(dist, "assets");

resetDir(dist);
fs.mkdirSync(stage, { recursive: true });
fs.mkdirSync(assets, { recursive: true });

stageStandalone(skill.name);
stagePlugin("codex", skill.name, version);
stagePlugin("claude", skill.name, version);

zipDirectory(path.join(stage, skill.name), path.join(assets, `${skill.name}-${tag}.zip`));
zipDirectory(
  path.join(stage, `${skill.name}-codex-plugin`),
  path.join(assets, `${skill.name}-codex-plugin-${tag}.zip`)
);
zipDirectory(
  path.join(stage, `${skill.name}-claude-plugin`),
  path.join(assets, `${skill.name}-claude-plugin-${tag}.zip`)
);

console.log(`Packaged release assets for ${skill.name} ${tag}.`);

function parseSkill() {
  const skillPath = path.join(root, "src", "SKILL.md");
  const text = fs.readFileSync(skillPath, "utf8");
  const name = text.match(/\n?name:\s*([a-z0-9-]+)/)?.[1];
  const description = text.match(/\n?description:\s*(.+)/)?.[1]?.trim();

  if (!name) {
    throw new Error("src/SKILL.md is missing a valid name.");
  }

  return { name, description };
}

function resetDir(directory) {
  fs.rmSync(directory, { recursive: true, force: true });
  fs.mkdirSync(directory, { recursive: true });
}

function copyDir(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

function stageStandalone(skillName) {
  const target = path.join(stage, skillName);
  copyDir(path.join(root, "src"), target);
}

function stagePlugin(type, skillName, version) {
  const pluginName = `${skillName}-${type}-plugin`;
  const target = path.join(stage, pluginName);
  const manifestDir = type === "codex" ? ".codex-plugin" : ".claude-plugin";
  const manifestSource = path.join(root, "packaging", `${type}-plugin`);

  copyDir(manifestSource, target);
  copyDir(path.join(root, "src"), path.join(target, "skills", skillName));

  const manifestPath = path.join(target, manifestDir, "plugin.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.name = skillName;
  manifest.version = version;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function zipDirectory(source, destination) {
  const parent = path.dirname(source);
  const base = path.basename(source);
  const zip = spawnSync("zip", ["-r", destination, base], {
    cwd: parent,
    stdio: "inherit"
  });

  if (zip.status === 0) {
    return;
  }

  const powershell = spawnSync(
    "powershell",
    ["-NoProfile", "-Command", `Compress-Archive -Path '${source}' -DestinationPath '${destination}' -Force`],
    { stdio: "inherit" }
  );

  if (powershell.status !== 0) {
    throw new Error(`Unable to create ZIP ${destination}.`);
  }
}
