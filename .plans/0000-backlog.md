# Backlog

This is the index of template maintenance plans. Each plan corresponds to a GitHub issue filed against `TechSpokes/skill-base-template`.

All five issues originate from one descendant repository, [skill-postgres-introspection](https://github.com/TechSpokes/skill-postgres-introspection), which was generated from this template on 2026-06-19 and which already implemented every fix locally across its releases v1.1.0 through v1.5.0. Those implementations are the ground truth referenced in each plan.

## Plans

| Plan | Issue | Title | Status | Phase |
| --- | --- | --- | --- | --- |
| [0003](0003-ci-action-versions.md) | #3 | Current CI action versions and a placeholder smoke-test tag | in-progress | 1 |
| [0005](0005-packaging-install-correctness.md) | #5 | Install locations, `.gitkeep` pruning, plugin manifests | in-progress | 1 |
| [0004](0004-value-first-readme.md) | #4 | Value-first generated README with install-from-release | in-progress | 2 |
| [0006](0006-repo-hardening-and-release-process.md) | #6 | Repository hardening, branch protection, release process | in-progress | 2 |
| [0007](0007-template-feedback-folder.md) | #7 | Scaffold `.skill-template-feedback/` in generated repos | in-progress | 3 |
| [0008](0008-template-release-process.md) | none | Update the template's own release process and ship v1.2.0 | in-progress | 4 |
| [0009](0009-community-and-sponsorship.md) | none | Mirror the descendant's community and sponsorship setup | in-progress | 5 |
| [0010](0010-bootstrap-instruction-improvements.md) | none | Goals-and-values transmission and an alignment-confirmation gate | in-progress | 5 |

## Progress

Phases 1 through 3 are implemented and committed on the `template-maintenance-baseline` branch. Each plan above is implemented in code or documentation, with `npm run validate` and a package smoke test passing after each phase.

Plan 0008 is partially implemented. The branch-and-pull-request flow is documented in `docs/TEMPLATE-RELEASING.md`, and the template's own workflows are pinned to `actions/checkout@v7` with the `v0.0.0` smoke-test tag. The remaining 0008 work is outward-facing and gated on user confirmation: hardening the live `TechSpokes/skill-base-template` repository and cutting template v1.2.0.

These remain for the release step and are not yet done: the version bump to `1.2.0` in `package.json` and `docs/VERSION.md`, the `## [v1.2.0]` changelog section, and `docs/releases/v1.2.0.md`.

### Phase 5

Plans 0009 and 0010 are implemented on the `template-community-and-bootstrap` branch and ship together as template v1.3.0. Plan 0009 mirrors the descendant's community and sponsorship setup; its live repository settings were applied with user authorization. Plan 0010 strengthens goals-and-values transmission in the generated `AGENTS.md` and adds an alignment-confirmation step before skill construction.

## Implementation roadmap

The work lands in four phases on the `template-maintenance-baseline` branch, then ships as a single template release, v1.2.0. Each phase is a coherent commit set that keeps `npm run validate` green.

### Phase 1: mechanical correctness

Implement plan 0003 and plan 0005. Both are fully specified, low-risk, and independent. They edit generated-workflow staging, `docs/INSTALL.md`, `scripts/package-release.mjs`, the two plugin manifests, and optionally `scripts/validate-skill.mjs`. This phase removes the day-one Dependabot bump and the shipped `.gitkeep` for every future repository.

### Phase 2: bootstrap guidance

Implement plan 0004 and plan 0006. Both edit `.template/bootstrap/` guidance. Plan 0006 also edits `docs/RELEASING.md` and the governance files. Implement 0006 before 0004 only if convenient; they do not conflict. The one ordering constraint is that 0005 must precede 0004 so the README install section and `docs/INSTALL.md` agree on locations.

### Phase 3: feedback loop

Implement plan 0007. It adds the staged `.skill-template-feedback/` folder, the root git-ignore pattern, and the cleanup-and-maintenance notes. Sequence it after 0006, because both edit `.template/bootstrap/cleanup-and-boundaries.md` and the maintenance-mode `AGENTS.md` requirements.

### Phase 4: template release process and ship

Implement plan 0008. It updates the template's own release process to match the rigor issue #6 asks for in generated repositories, hardens the live template repository, and uses the process to cut template v1.2.0 carrying phases 1 through 3.

## Dependency summary

Plan 0005 precedes plan 0004, so install locations are consistent before the README guidance references them.

Plan 0006 precedes plan 0007, so the cleanup guidance is restructured before the feedback note is added to it.

Plan 0008 is last, because it releases the result of the other four.

## Branch and release strategy

All phases accumulate on one integration branch, `template-maintenance-baseline`, and ship as one minor release, v1.2.0. This keeps the changelog and release notes describing a single coherent baseline rather than five micro-releases.

A maintainer who prefers smaller reviews can instead open one pull request per phase from this branch. The release in plan 0008 then waits until all phase pull requests merge.

Outward-facing actions are gated. Live repository hardening, pushing the `v1.2.0` tag, and publishing the draft release require explicit user confirmation, because they change repository settings or publish content.

## Layer model

Every plan distinguishes three layers, because a fix often lands in more than one. Confirm which layer each change belongs to before editing.

The live template files layer is files this repository ships and that a generated repository inherits through `Use this template`. Examples are `docs/INSTALL.md`, `scripts/package-release.mjs`, and `packaging/*/plugin.json`.

The bootstrap guidance layer is `.template/bootstrap/*.md`, which instructs the agent how to shape and clean up a generated repository.

The generated-workflow staging layer is `.template/generated/`, which holds files the bootstrap agent installs into the generated repository during cleanup.

## Verification baseline

Run `npm run validate` after any change in this repository. The validator enforces template mode, manifest fields, reference links, and packaging boundaries.

Run `npm run package -- v0.0.0` after any change to packaging or release behavior, then inspect `dist/` for the produced assets.
