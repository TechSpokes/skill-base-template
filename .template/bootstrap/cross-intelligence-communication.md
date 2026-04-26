# Cross-Intelligence Communication Rules

This file is a distilled operational version of TechSpokes cross-intelligence communication guidance for generated skill repositories.

## Goal

Preserve the practical lessons from the local communication theory files while building and maintaining generated skill repositories.

## Core Rationale

Agent instruction files are not ordinary documentation. They are control surfaces for future behavior. A human writes them once, but many agents may consume them later under different context windows, model assumptions, tool permissions, and task pressures.

The communication problem is that the sender, the receiving agent, and the tools that enforce checks do not process the same text the same way. Humans bring tacit context and experience. LLM agents activate statistical patterns from the text they receive. Tools apply explicit rules and ignore everything outside their configuration.

This difference creates three recurring failures:

- A future agent follows the literal rule but loses the purpose.
- A future agent interprets a common term differently from the author.
- A tool validates structure while the instruction still fails as guidance.

The guardrails in this file exist to reduce those failures. They are not style preferences. They are compensation mechanisms for communication across humans, LLM agents, and tools.

## Why This Matters

Future agents will not share the bootstrap agent's context. They may load only part of a file, work under a different model, or interpret common words through a different domain frame.

Rationale is what lets those agents adapt correctly when the exact instruction path does not fit the local situation. Rules tell an agent what to do. Reasons tell it what to preserve when it must choose.

## Values

- Preserve purpose over surface wording.
- Make implicit user intent explicit.
- Define terms before relying on them.
- Design files for partial loading and variable context.
- Give future agents enough reasoning to make local decisions.
- Use tools for deterministic checks and written rationale for judgment-heavy checks.

## Guardrail Purpose

The guardrails should make downstream agents more flexible, not less flexible. A rule without a reason narrows behavior mechanically. A rule with a reason gives the agent a target to preserve when local conditions differ.

When generating instructions for agents, always encode:

- The outcome the instruction protects.
- The failure mode the instruction prevents.
- The scope where the instruction applies.
- The conditions where local judgment is allowed.
- The verification path that shows whether the intent survived.

If one of these is missing, future agents may comply with the surface form while breaking the intended system behavior.

## Source Theory Position

These rules are adapted from TechSpokes research on cross-intelligence communication, directive-file design, README structure, and problem framing.

The full research files are not vendored into this template. They are too large and exploratory for bootstrap context. Use `.template/bootstrap/theory-context.md` as the operational summary and apply the practical rules below.

## Core Principles

### Goal Survival

Every directive file should state its goal near the top. Future agents may load only part of a file, so the goal must survive partial reading.

The reason: A rule without its goal becomes brittle. An agent can follow the literal wording while violating the underlying purpose.

Instruction-generation guardrail: before writing any rule, identify the goal it serves. If the goal cannot be stated, the rule is probably a preference, a habit, or an incomplete thought.

Local-decision effect: when an agent faces an unlisted case, it can choose the action that best preserves the stated goal.

### Entity Bias Control

Common words can mean different things to humans, LLMs, and tools. Define high-risk terms when they control behavior.

The reason: Entity bias is invisible to the recipient. The agent may confidently choose a plausible meaning that is wrong for this repository.

Instruction-generation guardrail: define ordinary words that carry repository-specific meaning. Do this especially for words that decide file ownership, release boundaries, validation criteria, user responsibility, or agent authority.

Local-decision effect: when the agent meets a new artifact or edge case, it can classify it by the defined meaning rather than by a generic training-data association.

Examples:

- `intake`
- `bootstrap`
- `skill product`
- `release artifact`
- `validation`
- `package`
- `plugin`
- `maintenance mode`

### Form Engineering

Formatting is part of the instruction, not decoration. Use structure that survives human scanning, LLM context loading, IDE outlines, and simple Markdown parsing.

The reason: A visually clear document can be structurally unclear to tools and agents. Real headings, short paragraphs, and flat lists make the message more likely to survive transport.

Instruction-generation guardrail: express structure in Markdown syntax, not visual habit. If a section matters, use a heading. If a requirement matters, use explicit requirement language. If order matters, use a numbered list.

Local-decision effect: future agents and tools can identify what is a section, what is a requirement, and what is context even when only part of the file is retrieved.

Required form rules:

- Use real Markdown headings.
- Do not use bold text as a heading substitute.
- Use flat lists.
- Keep list items atomic.
- Keep paragraphs short.
- Use imperative language for hard instructions.
- Put critical rules before context.
- Use `must`, `should`, `may`, and `prefer` consistently.

### Rule And Context Separation

Keep mandatory rules separate from background explanation. Put requirements in `Must-follow rules` or a clearly named equivalent section.

Context can explain why rules exist, but it should not introduce hidden requirements.

The reason: Hidden requirements inside prose are often missed during partial reading. Context should support judgment, not smuggle in obligations.

Instruction-generation guardrail: decide whether a sentence is a rule, a guideline, a rationale, or background before writing it. Put it in the matching section.

Local-decision effect: future agents can distinguish what must be preserved from what can be adapted.

### Verification Triangulation

Use deterministic checks for what tools can verify. Use agent judgment for structure, scope, and clarity. Use human review for goal fit, domain accuracy, and sensitive material.

The reason: No single intelligence type is reliable across all checks. Tools are precise but narrow. Agents are flexible but probabilistic. Humans are best positioned to judge whether the result serves the intended purpose.

Instruction-generation guardrail: each important instruction should say how compliance can be checked. Prefer executable validation for syntax and packaging. Use documented assumptions for design judgment. Flag human review when domain intent, privacy, or publication risk is involved.

Local-decision effect: agents can avoid false confidence from a passing script when the unresolved question is semantic or strategic.

## Writing Repository Agent Instructions

Use this pattern for `AGENTS.md` and maintenance documentation:

1. State the goal.
2. State the values that guide tradeoffs.
3. Define high-risk terms.
4. List hard rules.
5. Explain the rationale behind the hard rules.
6. Provide local judgment rules.
7. Provide verification steps.
8. Move background context to references or docs.

This pattern fits repository governance because maintainers need authority boundaries, tradeoff values, and validation paths. They may change many files and must know how to decide when instructions conflict.

## Writing Runtime Skill Instructions

Use this pattern for `SKILL.md`:

1. State what the skill helps the agent do.
2. Explain when to use the skill and when not to use it.
3. State the task values that should shape the output.
4. Define specialized terms the agent must use correctly.
5. Give the operating procedure in execution order.
6. Explain the rationale behind important decisions in the procedure.
7. Tell the agent which references to load and when.
8. Define the expected output or completion criteria.

This pattern fits `SKILL.md` because it behaves more like a runtime system prompt for a specific capability. It should teach the agent how to perform the task, not micromanage the agent, nor govern the whole repository.

The skill still needs purpose, values, and rationale, but they should be embedded around the task workflow. Avoid turning `SKILL.md` into repository main policy. Put maintenance authority, release rules, and file ownership rules in `AGENTS.md` and docs.

## What To Avoid

Do not write instructions that only say "do X" when the future agent may need to decide whether X still serves the goal.

Do not rely on words such as proper, clean, robust, standard, safe, or complete without defining the observable criteria.

Do not bury hard constraints in long explanatory paragraphs.

Do not preserve bootstrap rationale in generated repositories unless it helps maintain the generated skill. Bootstrap history is not automatically design intent.

## Generated AGENTS.md Rules

When rewriting `AGENTS.md` for maintenance mode:

- State the generated skill maintenance goal in the summary.
- List hard constraints before guidelines.
- Define specialized terms early.
- Include required validation commands.
- Include release boundaries.
- Keep the file short enough to load reliably.
- Move long explanations to `docs/`.

Carry the rationale for any rule that future agents may need to adapt. A maintenance agent should know not only that release artifacts exclude intake, but also that the exclusion protects privacy and prevents raw source material from being mistaken for a polished skill resource.

## Generated README Rules

When rewriting `README.md` for the generated skill:

- Start with the skill name as the H1.
- Explain what the skill does in the first paragraph.
- Explain what the skill does not do.
- Provide install and usage paths.
- Document release artifacts.
- Link to deeper docs instead of duplicating them.

The README should explain the generated skill's purpose and boundaries before mechanics. Humans and agents use the README to decide whether the repository is relevant and how much context to load.

## Maintenance Use

After cleanup, this file is deleted with `.template/`. Its guidance should survive in the generated `AGENTS.md`, `README.md`, and `docs/ARCHITECTURE.md`.
