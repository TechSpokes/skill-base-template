# Cleanup And Boundaries

This file is a distilled operational version of TechSpokes guidance on repository handoff, authority boundaries, and maintenance-mode transition.

## Goal

Convert a generated repository from bootstrap mode to maintenance mode without leaking bootstrap instructions into the final skill.

## Why Cleanup Is A Product Step

Cleanup changes the repository's governing purpose. Before cleanup, the repository exists to build a skill. After cleanup, it exists to maintain and release that skill.

Leaving bootstrap files behind gives future agents two competing frames: build a skill from scratch, or maintain the skill that already exists. Removing `.template/` makes the maintenance frame authoritative.

## Values

- Preserve future maintainer clarity.
- Protect user source material.
- Keep release artifacts focused on runtime use.
- Carry forward rationale only when it helps maintain the generated skill.
- Remove bootstrap details that would create conflicting goals.

## Cleanup Is Required

The normal path ends with deleting `.template/`. Keeping `.template/` is only acceptable when the repository is intentionally still being used as a template.

## Files To Rewrite

Rewrite these files before deleting `.template/`:

- `README.md`
- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/RELEASING.md`
- `CONTRIBUTING.md`
- `SUPPORT.md`
- `SECURITY.md`
- `.github/CODEOWNERS`
- `.github/FUNDING.yml`
- `.github/copilot-instructions.md`
- `.github/workflows/*`
- `.github/ISSUE_TEMPLATE/*.yml`
- `.github/DISCUSSION_TEMPLATE/*`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `packaging/codex-plugin/.codex-plugin/plugin.json`
- `packaging/claude-plugin/.claude-plugin/plugin.json`

## Intake Policy

Keep `.intake/README.md` if future maintainers may provide raw update material. Raw files in `.intake/` should not be released.

If raw intake contains private, licensed, or temporary material, remove it before publishing the repository.

Rationale: Intake is evidence used to build or update the skill. It is not automatically part of the public skill package.

## Maintenance AGENTS.md Requirements

The final `AGENTS.md` must support future maintenance.

It should include:

- The generated skill's maintenance goal.
- Required validation commands.
- Versioning and release rules.
- Skill reference organization rules.
- Boundaries for raw intake, temp files, and release artifacts.
- Definitions for high-risk terms used by the skill.

The final `AGENTS.md` should explain why important boundaries exist. A future agent can adapt a rule responsibly only when it understands the value the rule protects.

## GitHub Community File Handoff

The `.github/` community and maintenance files start with TechSpokes template defaults. After a skill is generated, rewrite them for the generated repository's owner, support process, funding preference, discussion categories, issue forms, and pull request checks.

Do not leave TechSpokes ownership, support, funding, or discussion language in a generated repository unless the generated repository is intentionally maintained by TechSpokes.

At minimum, check:

- `.github/CODEOWNERS` points to the generated repository maintainers.
- `.github/FUNDING.yml` matches the generated repository owner or is removed.
- `.github/ISSUE_TEMPLATE/config.yml` links to the generated repository docs and support paths.
- `.github/DISCUSSION_TEMPLATE/*` names the generated project and its intended community topics.
- `.github/PULL_REQUEST_TEMPLATE.md` lists checks relevant to the generated skill.
- `.github/copilot-instructions.md` points to the generated repository `AGENTS.md` and validation commands.
- `.github/workflows/template-ci.yml` is removed.
- `.github/workflows/ci.yml` and `.github/workflows/release-draft.yml` are installed from `.template/generated/.github/workflows/` or rewritten for the generated skill.
- `CONTRIBUTING.md`, `SUPPORT.md`, and `SECURITY.md` describe the generated repository's process.

Rationale: these files are public governance files. If they still mention the template author after generation, contributors and agents may route support, ownership, funding, or reviews to the wrong place.

## Final Verification

Before declaring cleanup complete, verify:

- `.template/` is absent.
- `README.md` describes the generated skill.
- `AGENTS.md` describes maintenance mode.
- `src/SKILL.md` does not reference `.template/`.
- Release staging excludes `.intake/`.
- Validation passes.
