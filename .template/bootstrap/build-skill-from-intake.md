# Build Skill From Intake

This file is part of the TechSpokes Skill Base Template bootstrap system. It distills TechSpokes guidance on agent skill creation, instruction design, and repository maintenance into an actionable workflow.

## Goal

Convert a repository created from this template into a standalone agent skill repository. The user supplies raw material in `.intake/`; the agent performs the skill design, repository rewrite, validation, cleanup, and release preparation.

## Why This Workflow Exists

The user should not need to understand skill architecture, frontmatter semantics, reference splitting, plugin packaging, or release hygiene. Those are agent responsibilities.

The workflow exists to preserve the user's domain intent while converting it into a form another agent can use later. The end product is not a transcript of the intake. The end product is a durable operating procedure packaged as a skill.

## Goal Stack

### Global Goal

Create a standalone repository that can distribute and maintain one high-quality agent skill.

Purpose: Agent skills are only useful when they survive transfer across time, agents, hosts, and changing context.

### Communication Goal

Guide the bootstrap agent from unstructured intake to a clean maintained repository without requiring the user to write a specification.

Purpose: Intake is often indirect. The agent must infer the useful workflow, preserve reasoning, and record assumptions so later maintainers can judge whether the inference still holds.

### Task Goal

Build the skill product, rewrite the repository around it, validate it, and remove bootstrap scaffolding.

Purpose: The generated repository should be understandable on its own and should not require future agents to reconstruct the bootstrap process.

## Operating Values

- User effort is concentrated in `.intake/`; agent effort handles structure, synthesis, and packaging.
- The final repository matters more than preserving the template's original files.
- Rationale should travel with maintenance instructions when it affects future decisions.
- Raw intake is evidence, not automatically publishable content.
- A skill should teach a reusable capability, not archive everything the user provided.
- Validation should catch mechanical errors, while docs should support human and agent judgment.

## Local Judgment Rules

When intake conflicts, prefer repeated user intent, high-quality examples, and explicit source documents over one-off notes. Record unresolved contradictions instead of silently choosing when the choice affects skill behavior.

When the user provides too much material, select what helps the future agent perform the task. Move durable concepts into references, summarize context in docs, and exclude redundant or private material.

When a template rule and the generated skill's local needs conflict, preserve the higher-level goal: a clean, portable, maintainable skill repository. Document the reason for deviations.

## Communication Model

This file is a bootstrap directive. Its recipient is an AI coding agent working in a newly cloned template repository. Its output is not a single file; its output is a clean skill repository ready for maintenance and release.

## Required Reading

Read these files before changing the repository:

- `AGENTS.md`
- `.template/bootstrap/theory-context.md`
- `.template/bootstrap/skill-quality-standard.md`
- `.template/bootstrap/cross-intelligence-communication.md`
- `.template/bootstrap/repository-shape.md`
- `.template/bootstrap/release-packaging.md`
- `.template/bootstrap/cleanup-and-boundaries.md`
- `docs/BOOTSTRAP-WORKFLOW.md`
- `.intake/README.md`

## Phase 1: Intake Inventory

Inspect every file under `.intake/`. Record the file types, apparent topics, source quality, contradictions, missing information, and private or unsafe material.

Do not require the user to provide a formal specification. If the material is messy, infer the intended skill from repeated tasks, examples, vocabulary, source documents, and desired outputs.

Rationale: Intake is the user's cognitive dump, not a schema. The agent's job is to externalize the tacit skill hidden in the material and make the implicit workflow explicit.

## Phase 2: Skill Design

Create a temporary design note in `.template/state/skill-design.md` while bootstrap mode is active. The note should answer these questions:

- What task will the skill help an agent perform?
- Who is the expected user?
- Which prompts should activate the skill?
- Which prompts should not activate the skill?
- What workflow should the skill teach?
- Which intake material belongs in `SKILL.md`?
- Which intake material belongs in `src/references/`?
- Are scripts, templates, assets, or test fixtures needed?
- What assumptions did the agent make?
- What should future maintainers review periodically?

The design note is temporary. Move durable architecture information into `docs/ARCHITECTURE.md` before cleanup.

Rationale: The design note gives the bootstrap agent a place to reason before committing to permanent files. Durable decisions move into docs because future maintainers need the why, not the temporary scratchpad.

## Phase 3: Build The Skill Product

Build the product surface in `src/`.

`src/SKILL.md` is the canonical skill entry point. Keep it concise enough to load into an agent context. Move detailed durable material into `src/references/`.

Use this layout when useful:

```text
src/
|-- SKILL.md
|-- references/
|-- scripts/
|-- assets/
`-- test-fixtures/
```

Do not create empty folders unless they clarify the intended structure or contain `.gitkeep`.

Rationale: Skills use progressive disclosure. `SKILL.md` should carry activation-critical guidance, while references carry detail that should load only when needed.

## Phase 4: Build Repository Documentation

Rewrite repository documentation for the generated skill.

Required files:

- `README.md`
- `docs/QUICKSTART.md`
- `docs/INSTALL.md`
- `docs/ARCHITECTURE.md`
- `docs/RELEASING.md`
- `docs/VERSION.md`
- `CHANGELOG.md`

The root README must describe the generated skill, not this template. It should be understandable without reading `.template/`.

Rationale: The README becomes the public orientation document for humans and agents. If it still explains the template, the repository has not truly entered maintenance mode.

## Phase 5: Rewrite Agent Instructions

Replace the bootstrap `AGENTS.md` with a maintenance-mode `AGENTS.md`.

The new file must:

- Name the generated skill repository.
- State the maintenance goal in the summary.
- Identify `src/SKILL.md` as the canonical skill entry point.
- Define any specialized terms with entity-bias risk.
- Tell agents how to update references, fixtures, docs, packaging, and release notes.
- Tell agents which validation commands to run.
- Avoid references to `.template/`.

Rationale: `AGENTS.md` is the future maintenance control plane. It must carry enough purpose and local reasoning for future agents to update the skill without reviving bootstrap assumptions.

## Phase 5B: Rewrite GitHub Community Files

Rewrite public GitHub maintenance files for the generated repository.

Required files to review:

- `CONTRIBUTING.md`
- `SUPPORT.md`
- `SECURITY.md`
- `.github/CODEOWNERS`
- `.github/FUNDING.yml`
- `.github/copilot-instructions.md`
- `.github/ISSUE_TEMPLATE/`
- `.github/DISCUSSION_TEMPLATE/`
- `.github/PULL_REQUEST_TEMPLATE.md`

Remove or replace TechSpokes-specific ownership, funding, support, and discussion language unless the generated repository is intentionally maintained by TechSpokes.

Rationale: these files govern how the public repository is maintained. A generated skill repository needs its own ownership and support process.

## Phase 5C: Install Generated Skill Workflows

Replace template-safe workflows with generated skill workflows.

Actions:

- Copy `.template/generated/.github/workflows/ci.yml` to `.github/workflows/ci.yml`.
- Copy `.template/generated/.github/workflows/release-draft.yml` to `.github/workflows/release-draft.yml`.
- Delete `.github/workflows/template-ci.yml`.
- Update workflow names, release title logic, and package commands if the generated skill needs a different process.

Rationale: the template repository should not publish placeholder skill releases. Generated skill repositories need release automation, but the template repository only needs scaffold validation.

## Phase 6: Package And Validate

Update package manifests in `packaging/`.

Run:

```bash
npm run validate
```

When release packaging is needed, run:

```bash
npm run package -- v0.1.0
```

Use the actual version tag instead of `v0.1.0`.

Rationale: Packaging is where private intake and bootstrap files can accidentally leak. Validation protects the boundary between construction material and runtime skill artifacts.

## Phase 7: Bootstrap Cleanup

Convert the repository to maintenance mode after the generated skill is accepted.

Required cleanup:

- Delete `.template/`.
- Rewrite `README.md` for the generated skill.
- Rewrite `AGENTS.md` for maintaining the generated skill.
- Keep `.intake/README.md` if future raw update intake is useful.
- Remove raw intake files when they should not remain in source control.
- Ensure release packaging excludes `.template/` and `.intake/`.

Rationale: Cleanup converts the repository's identity. Before cleanup, the repository is a skill factory. After cleanup, it is the skill.

## Completion Criteria

The repository is complete when a future agent can maintain and release the generated skill without knowing this repository came from a template.
