/* global process, Buffer */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];
const bootstrapMode = exists(".template");

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function parseFrontmatter(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return null;
  }

  const end = normalized.indexOf("\n---", 4);
  if (end === -1) {
    return null;
  }

  const block = normalized.slice(4, end).trim();
  const lines = block.split("\n");
  const data = {};
  const types = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2].trim();

    if (value === ">" || value === "|") {
      const folded = value === ">";
      const collected = [];
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1;
        collected.push(lines[index].trim());
      }
      data[key] = folded ? collected.join(" ") : collected.join("\n");
      types[key] = "string";
      continue;
    }

    if (value === "") {
      const collected = [];
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1;
        collected.push(lines[index]);
      }
      data[key] = collected.join("\n");
      types[key] = "mapping";
      continue;
    }

    data[key] = value.replace(/^["']|["']$/g, "");
    types[key] = "string";
  }

  return { data, types, keys: Object.keys(data), raw: block };
}

function walk(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(relativePath));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

function validateSkill() {
  if (!exists("src/SKILL.md")) {
    fail("Missing src/SKILL.md.");
    return;
  }

  const skillText = readText("src/SKILL.md");
  const parsed = parseFrontmatter(skillText);
  if (!parsed) {
    fail("src/SKILL.md must start with YAML frontmatter.");
    return;
  }

  const { data: frontmatter, types } = parsed;
  const standardFields = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
  const vscodeFields = new Set(["argument-hint", "user-invocable", "disable-model-invocation"]);

  for (const key of parsed.keys) {
    if (standardFields.has(key) || vscodeFields.has(key)) {
      continue;
    }
    warn(`src/SKILL.md has non-standard frontmatter field '${key}'. Prefer metadata for portable custom data.`);
  }

  if (!frontmatter.name) {
    fail("src/SKILL.md frontmatter is missing name.");
  } else if (frontmatter.name.length > 64) {
    fail("Skill name must be 64 characters or fewer.");
  } else if (!/^(?!.*--)[a-z0-9]+(-[a-z0-9]+)*$/.test(frontmatter.name)) {
    fail("Skill name must use lowercase letters, numbers, and hyphens, with no leading, trailing, or consecutive hyphens.");
  }

  if (!frontmatter.description) {
    fail("src/SKILL.md frontmatter is missing description.");
  } else if (frontmatter.description.length > 1024) {
    fail("Skill description must be 1024 characters or fewer.");
  } else {
    if (frontmatter.description.trim().length === 0) {
      fail("Skill description must be non-empty.");
    }
    if (frontmatter.description.length < 80) {
      warn("Skill description is short. Include what the skill does and when agents should use it.");
    }
    if (!/\b(use|when|asked|needs?|whenever|trigger|for)\b/i.test(frontmatter.description)) {
      warn("Skill description should include trigger context, not only capability description.");
    }
  }

  if (frontmatter["license"] !== undefined && frontmatter["license"].trim().length === 0) {
    fail("license must be non-empty when provided.");
  }

  if (frontmatter["compatibility"] !== undefined) {
    if (frontmatter["compatibility"].trim().length === 0) {
      fail("compatibility must be non-empty when provided.");
    }
    if (frontmatter["compatibility"].length > 500) {
      fail("compatibility must be 500 characters or fewer.");
    }
  }

  if (frontmatter.metadata !== undefined && types.metadata !== "mapping") {
    fail("metadata must be a YAML mapping when provided.");
  }

  if (frontmatter["allowed-tools"] !== undefined && types["allowed-tools"] !== "string") {
    fail("allowed-tools must be a space-separated string when provided.");
  }

  for (const key of ["user-invocable", "disable-model-invocation"]) {
    if (frontmatter[key] !== undefined && !/^(true|false)$/.test(frontmatter[key])) {
      fail(`${key} must be true or false when provided.`);
    }
  }

  if (frontmatter["argument-hint"] !== undefined && frontmatter["argument-hint"].trim().length === 0) {
    fail("argument-hint must be non-empty when provided.");
  }

  if (!bootstrapMode && skillText.includes(".template/")) {
    fail("src/SKILL.md must not reference .template/ after generation.");
  }
}

function validateReferences() {
  const markdownFiles = walk("src").filter((file) => file.endsWith(".md"));
  const linkPattern = /\[[^\]]+]\(([^)]+)\)/g;

  for (const file of markdownFiles) {
    const text = readText(file);
    let match;
    while ((match = linkPattern.exec(text)) !== null) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) {
        continue;
      }

      const cleaned = target.split("#")[0];
      if (!cleaned) {
        continue;
      }

      const resolved = path.normalize(path.join(path.dirname(file), cleaned));
      if (!exists(resolved)) {
        fail(`${file} links to missing file ${target}.`);
      }
    }
  }
}

function validateManifests() {
  const manifestPaths = [
    "packaging/codex-plugin/.codex-plugin/plugin.json",
    "packaging/claude-plugin/.claude-plugin/plugin.json"
  ];

  for (const manifestPath of manifestPaths) {
    if (!exists(manifestPath)) {
      fail(`Missing ${manifestPath}.`);
      continue;
    }

    try {
      const manifest = JSON.parse(readText(manifestPath));
      for (const key of ["name", "version", "description"]) {
        if (!manifest[key]) {
          fail(`${manifestPath} is missing ${key}.`);
        }
      }
    } catch (error) {
      fail(`${manifestPath} is not valid JSON: ${error.message}`);
    }
  }
}

function validateReleaseNotes() {
  if (!exists("CHANGELOG.md")) {
    fail("Missing CHANGELOG.md.");
  }

  if (!exists("docs/releases/README.md")) {
    fail("Missing docs/releases/README.md.");
  }
}

function validatePackagingBoundaries() {
  const sourceFiles = walk("src");
  for (const file of sourceFiles) {
    const text = fs.readFileSync(path.join(root, file));
    if (!bootstrapMode && text.includes(Buffer.from(".template/"))) {
      fail(`${file} references bootstrap control files.`);
    }
  }
}

function validateWorkflowMode() {
  if (bootstrapMode) {
    if (!exists(".github/workflows/template-ci.yml")) {
      fail("Template mode requires .github/workflows/template-ci.yml.");
    }
    for (const workflow of [".github/workflows/ci.yml", ".github/workflows/release-draft.yml"]) {
      if (exists(workflow)) {
        fail(`${workflow} should live under .template/generated/ while the repository is in template mode.`);
      }
    }
    return;
  }

  if (exists(".github/workflows/template-ci.yml")) {
    fail("Maintenance mode must remove .github/workflows/template-ci.yml.");
  }
}

validateSkill();
validateReferences();
validateManifests();
validateReleaseNotes();
validatePackagingBoundaries();
validateWorkflowMode();

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

console.log("Validation passed.");
