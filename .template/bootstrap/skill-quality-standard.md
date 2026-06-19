# Skill Quality Standard

## Goal

Define the minimum quality bar for skills generated from this template.

## Why Quality Means Transferability

A generated skill is not judged only by whether it works in the bootstrap session. It is judged by whether another agent can discover it, activate it at the right time, follow it under variable context, and update it later without damaging its purpose.

This is why the quality bar emphasizes description quality, boundaries, progressive disclosure, references, and maintenance documentation. These are transfer mechanisms, not decorative documentation.

## Quality Values

- Activation accuracy matters more than a clever title.
- Scope boundaries matter as much as capabilities.
- Short `SKILL.md` files are preferred when references can carry detail.
- Examples and fixtures should test behavior, not merely demonstrate formatting.
- Maintenance notes should preserve the reasoning behind volatile choices.
- Optional metadata should not reduce portability without a clear benefit.

## Required Skill Shape

Every generated skill must have `src/SKILL.md`.

The `SKILL.md` file must begin with YAML frontmatter containing:

- `name`
- `description`

The `name` must use lowercase letters, numbers, and hyphens. It must not start or end with a hyphen, contain consecutive hyphens, exceed 64 characters, or include namespace prefixes.

The `description` must explain what the skill does and when to use it. It must be 1024 characters or fewer. It should include natural trigger phrases, task verbs, scope boundaries, and important exclusions.

## Optional Frontmatter

For maximum Codex portability, prefer only `name` and `description` in `SKILL.md` frontmatter.

Rationale: Codex uses `name` and `description` as the portable discovery surface. Extra fields can help specific hosts, but they can also create compatibility assumptions that do not travel.

The open Agent Skills specification also defines these optional fields:

- `license`
- `compatibility`
- `metadata`
- `allowed-tools`

VS Code also documents host-specific fields:

- `argument-hint`
- `user-invocable`
- `disable-model-invocation`

Use optional fields only when the generated skill needs them. Keep custom data under `metadata` instead of inventing top-level fields.

Decision rule: If an optional field affects runtime behavior for a known host, include it and document why. If it only records human-facing package information, prefer plugin manifests or repository docs.

## Required Body Content

The `SKILL.md` body must include:

- A short purpose statement.
- When to use the skill.
- When not to use the skill.
- Required inputs or assumptions.
- The core workflow.
- Reference loading guidance.
- Output expectations.
- Completion criteria.

Rationale: The frontmatter decides whether the skill loads. The body decides whether the activated agent can execute the workflow without reconstructing missing context.

## Generated README Shape

The generated `README.md` is the front page of the skill repository. A first-time reader should see what the skill does and how to install it before any maintainer detail.

Order the README so value comes first, then installation, then usage, then a separated maintainer section.

- Open with the value proposition in plain language.
- Follow with an install-from-release section.
- Then show how to use the skill.
- Keep maintainer and contributor steps in a separated section below usage.

The install section links to the repository's Releases page and names the three release assets: the standalone skill ZIP, the Claude plugin ZIP, and the Codex plugin ZIP. Tell readers to download the asset that matches their tool rather than cloning.

Keep clone and maintainer commands such as `npm run validate` and `npm run package` out of the opening. Move conceptual and internal detail into `docs/` and link to it from the README. The install locations in the README and in `docs/INSTALL.md` must agree.

Required elements: an H1 that is the skill name, a first paragraph that says what the skill does without relying on another file, and the license stated or linked. Front-load anything decision-critical, such as prerequisites or warnings, because readers consume the page in part.

Avoid walls of text, nested lists, horizontal rules, and bold used as a heading. Tag every code fence with a language, give images alt text, and flag any destructive or privileged command right before it. Aim for roughly 100 to 200 lines; treat 500 or more as a signal to move detail into `docs/`.

Rationale: A normal user landing on a published skill should be able to download a release and install it without cloning or Node. Leading with build instructions hides the skill's value behind maintainer concerns.

## Reference Rules

Move durable detail into `src/references/` when it would make `SKILL.md` too long or too dense.

Reference files should be focused. A future agent should be able to load one relevant file without loading the whole reference library.

Rationale: References protect context budget. A skill that forces every task to load all domain knowledge becomes less useful as it grows.

## Fixture Rules

Use `src/test-fixtures/` for prompts or examples that verify the skill after changes. Do not load fixtures during ordinary skill use unless the task is specifically to test the skill.

Rationale: Fixtures preserve behavioral expectations across maintenance changes. They are evidence that the skill still works, not part of normal execution.

## Script Rules

When a generated skill ships runnable scripts, comment them to explain why the code does what it does and any non-obvious constraints, not to narrate what each line does. Prefer structured docblock tags over prose so the comments stay parseable and stay out of search noise.

Rationale: A future agent maintaining the skill cannot ask the original author. Comments that protect intent and constraints survive that handoff; line-by-line narration does not.

## Cross-Intelligence Communication Rules

Write for humans, LLM agents, and tools.

- State goals before procedures.
- Define common terms used in specialized ways.
- Use headings for structure.
- Use flat lists.
- Keep list items atomic.
- Use `must`, `should`, `may`, and `prefer` precisely.
- Avoid visual emphasis as a priority signal.
- Keep critical constraints near the top of directive files.

## Quality Risks

Watch for these failure patterns:

- The skill description is too generic to activate correctly.
- The skill tries to cover multiple unrelated domains.
- `SKILL.md` repeats long reference material instead of pointing to references.
- The skill lacks boundaries and activates for adjacent tasks.
- Generated documentation still describes the template.
- Release packaging includes raw intake or bootstrap files.
