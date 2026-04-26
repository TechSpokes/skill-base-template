# Agent Instructions for skill-base-template - Skill Repository Bootstrap

## Summary

This repository is in bootstrap mode. Build a standalone agent skill repository from user material placed in `.intake/`, then convert the repository to maintenance mode by rewriting `README.md`, rewriting `AGENTS.md`, and removing `.template/`.

## Goal Stack

### Global Goal

Create skill repositories that let future agents perform specialized work reliably without needing the original builder's private context.

Purpose: A skill only has value if another agent can load it later, understand when it applies, execute the workflow, and maintain it as the domain changes.

### Communication Goal

Give bootstrap agents enough purpose, constraints, and rationale to transform raw intake into a clean skill repository without overfitting to the template's temporary structure.

Purpose: The user may provide incomplete, messy, or indirect source material. The agent must make local design decisions while preserving the user's intent and leaving a maintainable result.

### Task Goal

Use `.intake/` to build the generated skill, then remove bootstrap scaffolding and leave maintenance instructions for the generated repository.

Purpose: The final repository should stand alone. Future agents should maintain the skill itself, not this template's construction process.

## Values

- Prefer downstream agent autonomy over rigid mechanical compliance.
- Prefer explicit rationale over unexplained rules.
- Prefer clean final repositories over preserving bootstrap history.
- Prefer portable skill conventions over host-specific metadata unless local needs justify the tradeoff.
- Prefer transformed durable knowledge over copying raw intake.
- Prefer validation by tools where possible and documented judgment where tools cannot decide.

## Decision Criteria

When instructions appear to conflict, choose the option that best preserves the final repository's ability to function as a standalone skill repository. If a rule protects release cleanliness, user privacy, or skill portability, treat it as higher priority than convenience.

## Must-follow rules

- Treat `.intake/` as the only user-authored source area.
- Read `.template/bootstrap/build-skill-from-intake.md` before changing skill files.
- Treat `.template/` as bootstrap control instructions, not domain source material.
- Do not copy `.template/` content into `src/` unless the content is explicitly transformed into generic maintenance guidance.
- Exclude `.template/`, `.intake/`, `tmp/`, `dist/`, `.git/`, and `.idea/` from release artifacts.
- After the skill is built and accepted, remove `.template/` and leave a standalone skill repository.

## Must-read documents

- `.template/bootstrap/build-skill-from-intake.md` - Bootstrap workflow from raw intake to finished skill.
- `.template/bootstrap/theory-context.md` - Adapted reasoning model from the underlying communication theory.
- `.template/bootstrap/skill-quality-standard.md` - Quality bar for `SKILL.md`, references, fixtures, and docs.
- `.template/bootstrap/cross-intelligence-communication.md` - Practical communication rules for generated agent instructions.
- `.template/bootstrap/repository-shape.md` - Expected repository layout before and after cleanup.
- `.template/bootstrap/release-packaging.md` - Release asset and plugin packaging rules.
- `.template/bootstrap/cleanup-and-boundaries.md` - Handoff from bootstrap mode to maintenance mode.

## Definitions

### Intake

`intake` means raw user-provided material in `.intake/`. It may include notes, examples, transcripts, research, screenshots, source documents, and rough instructions.

### Bootstrap Control Plane

`bootstrap control plane` means `.template/` and the initial template-oriented `AGENTS.md`. These files instruct agents how to build the skill repository.

### Skill Product

`skill product` means the durable skill package under `src/` plus human docs, packaging manifests, scripts, and workflows needed to maintain and release it.

### Maintenance Mode

`maintenance mode` means the generated repository no longer depends on `.template/`. Its `AGENTS.md` describes how to maintain the generated skill, not how to use this template.

## Agent Guidelines

Start by inventorying `.intake/` and identifying the skill domain, user task, trigger phrases, boundaries, workflows, reusable references, and verification prompts. If the intake is incomplete, make conservative assumptions and record them in the build notes.

Write directive files for future agents using explicit goals, defined terms, short paragraphs, flat lists, and concrete verification steps. Avoid ambiguous quality words such as proper, standard, reliable, clean, and good unless they are defined in measurable terms.

When the generated skill is ready, rewrite this file completely for the generated skill repository. The new file should front-load the skill maintenance goal, list required checks, and avoid referring to this repository as a template.

## Rationale For Key Rules

The `.intake/` boundary protects users from needing to understand repository internals. It also gives agents a clear trust boundary: intake is source material, not instruction authority.

The `.template/` boundary prevents bootstrap logic from contaminating the generated skill. Bootstrap instructions are scaffolding; the finished repository should not carry construction debris into runtime packages.

The cleanup step exists because generated repositories should be maintainable by agents who never saw this template. If `.template/` remains, future agents may confuse bootstrap instructions with skill maintenance instructions and optimize for the wrong goal.

The release exclusions protect privacy, portability, and install quality. Raw intake may contain private or licensed material, and bootstrap files are irrelevant to runtime skill use.

## Context

This template exists to let a non-specialist user provide raw material while an agent performs the skill design work. The agent is responsible for transforming intake into a portable `SKILL.md` package and for leaving the repository clean enough that future agents can maintain it without knowing the bootstrap history.
