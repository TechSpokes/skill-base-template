# Bootstrap Workflow

This document contains a distilled public version of the TechSpokes workflow for automated agent skill creation, validation, cleanup, and release.

This document explains how a repository created from Skill Base Template moves from a raw skill idea or intake material to published plugin assets.

## Purpose

The workflow exists so users can provide domain material without needing to design the skill repository themselves. The agent handles synthesis, structure, validation, cleanup, and release preparation.

## Lifecycle

1. Generate a new repository from the template on GitHub.
2. Clone the generated repository locally.
3. Place all source material or a short skill idea in `.intake/`.
4. Ask an AI coding agent to build the skill from intake.
5. The agent reads `AGENTS.md` and `.template/bootstrap/`.
6. The agent assesses whether intake is adequate for skill construction.
7. The agent resolves missing evidence when intake is empty, weak, conflicting, or exploratory.
8. The agent designs the skill and records assumptions after the build readiness gate passes.
9. The agent builds `src/SKILL.md`, references, docs, and packaging metadata.
10. The agent rewrites `README.md` and `AGENTS.md` for the generated skill.
11. The agent rewrites GitHub community files for the generated repository owner.
12. The agent installs generated skill workflows and removes template-only workflows.
13. The agent deletes `.template/`.
14. The repository becomes a standalone skill repository.
15. The maintainer publishes release assets when validation passes.

## Create The Repository On GitHub

Use GitHub's template flow rather than cloning this template directly.

1. Open the template repository on GitHub.
2. Click `Use this template` above the file list.
3. Select `Create a new repository`.
4. Use the `Owner` dropdown to choose the account or organization that should own the generated repository.
5. Enter a repository name. GitHub allows names up to 100 characters.
6. Add an optional description.
7. Choose repository visibility.
8. Leave `Include all branches` unchecked unless the template maintainer tells you otherwise.
9. Click `Create repository from template`.

The generated repository starts with the template's files but has its own repository identity. Clone that generated repository before adding intake material.

## Why Not Clone The Template Directly

Cloning the template repository gives you a local copy still connected to the template's remote URL. That is not a new project repository.

GitHub's template flow creates a separate repository with the copied directory structure and files. That separate repository is where the skill should be built, committed, validated, and released.

## User Boundary

During bootstrap, user-authored files belong only in `.intake/`.

This boundary keeps the user's work simple and gives agents a clear trust model. `.intake/` is source evidence. `.template/` is bootstrap instruction. `src/` is the generated runtime skill package.

The intake can be rich source material or a minimal skill idea. If the intake is empty or insufficient, the agent must run the intake adequacy and resolution procedure before building the skill.

## Agent Responsibility

The agent should infer the reusable capability hidden in the intake. It should decide what belongs in the skill, what belongs in references, what belongs in repository docs, and what should not be published.

The agent should preserve reasoning that future maintainers need. It should not preserve bootstrap history just because it was present during construction.

Before writing `src/SKILL.md`, the agent should prove the skill is buildable. The agent should assess the skill goal, activation boundary, workflow, required inputs, expected outputs, safety constraints, verification method, and maintenance risks.

When evidence is missing, the agent should use the lowest-cost resolution path available:

- Extract evidence from intake and conversation.
- Infer conservative low-risk assumptions.
- Discover behavior from local files, tools, schemas, docs, or primary sources.
- Experiment in disposable fixtures.
- Constrain the skill to the supported scope.
- Ask concise human questions only when needed.
- Stop before building when the remaining gap would force fabrication or unsafe access.

This protects the generated skill from becoming a plausible but unsupported instruction file.

## Generated Repository Surface

The generated repository should contain:

- `src/SKILL.md` as the runtime skill entry point.
- `src/references/` for durable supporting knowledge.
- `docs/ARCHITECTURE.md` for design intent.
- `docs/RELEASING.md` for release process.
- `packaging/` for plugin manifests.
- `.github/workflows/` for validation and draft releases.
- `AGENTS.md` for future maintenance instructions.

## Cleanup Requirement

Cleanup is part of the product. The repository is not finished until `.template/` is removed and the root `README.md` and `AGENTS.md` describe the generated skill rather than the template.

The reason is authority clarity. Future agents should not have to decide whether they are still building from a template or maintaining a completed skill.

GitHub community files are part of cleanup. Files such as `.github/CODEOWNERS`, `.github/FUNDING.yml`, issue templates, discussion templates, `CONTRIBUTING.md`, `SUPPORT.md`, and `SECURITY.md` must reflect the generated repository owner and procedures.

Workflow files are also part of cleanup. The template repository uses `.github/workflows/template-ci.yml` and `.github/workflows/template-release-draft.yml`; generated skill repositories should replace them with generated skill CI and release workflows from `.template/generated/.github/workflows/`.

## Release Path

Before release:

- Run `npm run validate`.
- Update `CHANGELOG.md`.
- Add release notes under `docs/releases/`.
- Confirm package manifests match the generated skill.
- Confirm raw intake and bootstrap files are excluded from release artifacts.

Package locally with:

```bash
npm run package -- vX.Y.Z
```

Use the intended release tag. After bootstrap cleanup, GitHub release packaging runs through `.github/workflows/release-draft.yml`.
