# 0005: Install locations, `.gitkeep` pruning, plugin manifests

Issue: [#5](https://github.com/TechSpokes/skill-base-template/issues/5)

Status: in-progress (implemented on `template-maintenance-baseline`)

Layer: live template files (`docs/`, `scripts/`, `packaging/`), with a supporting edit in bootstrap guidance.

## Problem

This issue bundles three packaging and install-correctness defects that every generated repository inherits.

The install documentation names a skill location that no tool reads. The release packager ships placeholder scaffolding inside the ZIPs. The placeholder plugin manifests omit valid fields that hosts display.

## Part 1: Wrong skill install locations

`docs/INSTALL.md` lists three standalone locations on lines 17 through 19: `.github/skills/`, `.codex/skills/`, and `.claude/skills/`. The entry `.codex/skills/` is not where Codex looks.

The cross-tool standard is `.agents/skills/`, which Codex scans from the working directory up to the repository root and which GitHub Copilot also reads.

### Sources

These were cited by the descendant and should be re-checked when implementing.

- Codex skills at `https://developers.openai.com/codex/skills`.
- GitHub agent skills at `https://docs.github.com/en/copilot/concepts/agents/about-agent-skills`.
- Claude Code skills at `https://code.claude.com/docs/en/skills`.

### Fix

Lead with `.agents/skills/` as the cross-tool location. Keep `.claude/skills/` and `~/.claude/skills/` for Claude Code. Keep `.github/skills/` for GitHub Copilot. Remove `.codex/skills/`.

The descendant's `docs/INSTALL.md` from its release v1.3.0 is a working model for the rewritten location list. It also adds a download-from-Releases lead paragraph, which overlaps with plan [0004](0004-value-first-readme.md).

## Part 2: Packaging ships `.gitkeep` and empty folders

`scripts/package-release.mjs` defines `copyDir` on lines 57 through 68, which copies every entry, including `src/assets/.gitkeep`. As a result the standalone ZIP contains an empty `assets/` folder holding only a `.gitkeep`.

The current staged output confirms the defect: `dist/stage/placeholder-skill/assets/.gitkeep` exists.

### Fix

In `copyDir`, skip entries named `.gitkeep`, and prune any directory left empty after copying. Prune after recursion so nested empty directories are also removed. The descendant's implementation is the reference.

```javascript
function copyDir(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (entry.name === ".gitkeep") {
      continue;
    }
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
  if (fs.readdirSync(destination).length === 0) {
    fs.rmdirSync(destination);
  }
}
```

Add a short comment above `copyDir` explaining that `.gitkeep` placeholders are dropped and empty directories are pruned so deliverables contain only real skill content.

## Part 3: Plugin manifest completeness

The placeholder manifests omit fields that the current plugin specs accept and that hosts display.

`packaging/claude-plugin/.claude-plugin/plugin.json` omits `license` and a top-level `displayName`.

`packaging/codex-plugin/.codex-plugin/plugin.json` omits `license`. It already carries `interface.displayName`, which is a separate field from the Claude top-level `displayName`.

### Fix

Add `"license"` to both manifests as a placeholder value such as `"MIT"`. Add a top-level `"displayName"` to the Claude manifest.

Validate every manifest field against the current specs: Claude at `https://code.claude.com/docs/en/plugins-reference`, Codex at `https://developers.openai.com/codex/plugins/build`. Keep `author` as an object, matching the existing manifests.

## Decisions

The manifests are placeholders, rewritten during bootstrap from the generated skill. Adding placeholder `license` and `displayName` values keeps the manifests spec-complete from the first commit, so the bootstrap agent edits values rather than discovering missing keys.

## Optional validator hardening

`scripts/validate-skill.mjs` defines `validateManifests` on lines 211 through 234, which currently checks only `name`, `version`, and `description`. Extend it to require `license` in both manifests and a top-level `displayName` in the Claude manifest, so the install-correctness fix cannot silently regress.

This validator change is optional within issue #5 but is the most durable way to satisfy the issue's request to validate manifests against the specs.

## Verification

For Part 1, confirm `docs/INSTALL.md` leads with `.agents/skills/` and contains no `.codex/skills/`.

For Part 2, run `npm run package -- v0.0.0`, then unzip each asset in `dist/assets/` and confirm no `.gitkeep` and no empty `assets/` folder appears inside any ZIP.

For Part 3, run `npm run validate` and confirm both manifests parse and carry the new fields. If the validator was hardened, confirm it fails when a field is removed.
