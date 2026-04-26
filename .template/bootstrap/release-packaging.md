# Release Packaging

## Goal

Create release assets that install cleanly as a standalone skill and as plugin packages.

## Why Packaging Has Strict Boundaries

Packaging is the point where repository content becomes installable capability. Anything included in the ZIP can be loaded by an agent host or inspected by users.

Strict exclusions protect privacy, reduce context noise, and prevent bootstrap instructions from competing with the generated skill's runtime instructions.

## Packaging Values

- Include only files needed to use the skill.
- Keep package structure predictable across releases.
- Keep version metadata synchronized.
- Refuse ambiguous releases instead of producing misleading artifacts.
- Prefer clean draft releases over mutating published releases.

## Version Source

Use Git tags in `vX.Y.Z` format as the release source of truth.

For every release tag:

- `CHANGELOG.md` must contain `## [vX.Y.Z]`.
- `docs/releases/vX.Y.Z.md` must exist.
- Package manifests must use version `X.Y.Z`.

## Required Assets

Every release should produce three ZIP files:

- `skill-name-vX.Y.Z.zip`
- `skill-name-codex-plugin-vX.Y.Z.zip`
- `skill-name-claude-plugin-vX.Y.Z.zip`

## Exclusions

Release assets must not include:

- `.template/`
- `.intake/`
- `.git/`
- `.idea/`
- `.github/`
- `docs/`
- `tmp/`
- `dist/`
- `node_modules/`
- `setup.plan.yaml`

Rationale: These files are repository, bootstrap, or development artifacts. They do not help an installed agent execute the skill.

## Manifest Rules

The Codex plugin manifest lives at `packaging/codex-plugin/.codex-plugin/plugin.json`.

The Claude plugin manifest lives at `packaging/claude-plugin/.claude-plugin/plugin.json`.

When the generated skill name or version changes, update both manifests.

Rationale: Manifests are the package identity seen by host systems. Stale manifests cause confusion even when the skill files themselves are correct.

## Workflow Rules

The draft release workflow should package from the tagged commit. It should refuse to publish when release notes or changelog entries are missing.

Rationale: A tag is a promise that the repository state, docs, package manifests, and release notes describe the same artifact.

## Template Repository Rule

The template repository should not keep generated skill release workflows active in `.github/workflows/`.

Generated skill workflows live in `.template/generated/.github/workflows/` until bootstrap installs them into the generated repository.

Rationale: release workflows are correct for generated skill repositories, but unsafe for the template repository because they can publish placeholder skill assets if a template tag is pushed.
