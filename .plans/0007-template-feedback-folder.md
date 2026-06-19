# 0007: Scaffold `.skill-template-feedback/` in generated repos

Issue: [#7](https://github.com/TechSpokes/skill-base-template/issues/7)

Status: in-progress (implemented on `template-maintenance-baseline`)

Layer: generated-workflow staging (`.template/generated/`), bootstrap guidance, and the root `.gitignore`.

## Problem

There is no standard channel for a generated skill repository to capture the gaps it finds in this template and route them back upstream. While maintaining a generated skill, an agent or maintainer notices outdated defaults, missing safeguards, or unclear instructions, but that feedback has nowhere to live and tends to get lost.

The four improvements in issues #3, #4, #5, and #6 were all found this way, by hand, in one descendant.

## Goal

A generated repository carries a tracked `.skill-template-feedback/` folder whose job is to capture template gaps locally and surface them upstream as issues or pull requests. The maintenance documentation mentions the practice.

## What the descendant did

In its release v1.5.0 the descendant added a tracked `.skill-template-feedback/` folder. The folder's `README.md` and a `.gitkeep` are tracked, so the convention travels with the repository. Everything else in the folder is git-ignored, so working notes and draft artifacts stay local and never ship in the skill package.

The descendant also keeps a portable upgrade guide in the folder, `SKILL-REPO-UPGRADE-GUIDE.md`, which is a single skill-agnostic checklist for bringing other template-generated repositories up to the current baseline.

### Git-ignore pattern

```gitignore
.skill-template-feedback/*
!.skill-template-feedback/.gitkeep
!.skill-template-feedback/README.md
```

## Design decision: how the scaffold travels

A `.skill-template-feedback/` folder is meaningless in the template itself, because the template has no upstream template to send feedback to. So the folder must be installed into the generated repository during bootstrap, not shipped pre-populated at the template root.

Stage the folder under `.template/generated/.skill-template-feedback/`, mirroring how the generated workflows are staged under `.template/generated/.github/workflows/`. Bootstrap cleanup installs it into the generated repository root.

Ship the git-ignore pattern in the template's root `.gitignore`. The pattern is inert in the template, where the folder does not exist, and it travels automatically through `Use this template`, so the generated repository ignores working notes from its first commit.

## Steps

Create `.template/generated/.skill-template-feedback/README.md`. Base it on the descendant's README. State that the folder is a local staging area for notes about the template the skill was generated from, name the upstream as `TechSpokes/skill-base-template`, and explain the capture-then-surface loop. State that only `README.md` and `.gitkeep` are tracked and that nothing in the folder ships in the skill package.

Add the git-ignore pattern above to the template's root `.gitignore`.

Add an install step to `.template/bootstrap/cleanup-and-boundaries.md`. The step instructs the agent to copy the staged `.skill-template-feedback/` into the generated repository root, create the tracked `.gitkeep`, and confirm the git-ignore pattern is present.

Add a maintenance-practice note to the maintenance `AGENTS.md` requirements in `.template/bootstrap/cleanup-and-boundaries.md`. The note states that when maintaining a generated skill reveals a template gap, the agent captures it in `.skill-template-feedback/` and opens an issue or pull request on the template.

Add `.plans/` to the cleanup deletion list in `.template/bootstrap/cleanup-and-boundaries.md`, so the template's own maintenance backlog does not leak into a generated repository. This closes the boundary described in [README.md](README.md).

## Optional: ship the portable upgrade guide

The descendant's `SKILL-REPO-UPGRADE-GUIDE.md` is a skill-agnostic checklist that lets one descendant upgrade another to the current baseline. Optionally stage a generic version under `.template/generated/.skill-template-feedback/` so every descendant inherits it.

If shipped, the guide must stay skill-agnostic and must be regenerated from the merged set of issues #3 through #7 once those land, so it reflects the current template baseline rather than the descendant's snapshot.

## Decisions

The git-ignore pattern ships at the template root rather than being written during cleanup, because a pattern is inert without the folder and shipping it removes one manual cleanup step.

The README and upgrade guide are staged under `.template/generated/` rather than shipped at the template root, because a feedback-to-upstream folder is self-referential and meaningless in the template itself.

This plan shares two edit targets with plan [0006](0006-repo-hardening-and-release-process.md): the cleanup guidance and the maintenance `AGENTS.md` requirements. Sequence 0006 first so the feedback note is added beside an existing hardening and release section rather than into a file still being restructured.

## Verification

Confirm `.template/generated/.skill-template-feedback/README.md` exists and names the upstream template and the capture-then-surface loop.

Confirm the root `.gitignore` contains the three-line pattern.

Confirm `.template/bootstrap/cleanup-and-boundaries.md` instructs the agent to install the folder, records the maintenance practice, and lists `.plans/` for deletion.

Run `npm run validate` and confirm template mode is intact and the staged folder does not trip packaging-boundary checks.
