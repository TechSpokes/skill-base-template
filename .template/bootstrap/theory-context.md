# Theory Context For Bootstrap Agents

This file gives the reasoning model the bootstrap workflow relies on. Use it to make skill-design and instruction decisions that hold up when no specific rule applies.

## Goal

Carry the reasoning model in compact operational form, so design choices preserve purpose rather than only following steps.

## Values

- Preserve purpose over literal wording.
- Make implicit intent explicit.
- Treat repository structure as communication.
- Treat formatting as part of instruction transport.
- Define terms that can activate different meanings in different agents.
- Give downstream agents reasons so they can adapt locally.
- Verify with tools where possible and with written judgment where tools cannot decide.

## Operating Model

### Goal Stack

Every important instruction should carry its purpose.

Use three levels:

- Global goal: why the repository exists.
- Communication goal: why this file exists.
- Task goal: what the current agent should accomplish.

The reason: future agents may not share the builder's context. A rule without its goal is brittle when conditions change.

### Entity Bias

Common words can mean different things to different readers.

High-risk terms in this template include:

- `intake`
- `bootstrap`
- `skill`
- `package`
- `plugin`
- `validation`
- `release`
- `maintenance`
- `authority`

Define these terms when they affect behavior. The `AGENTS.md` Definitions section carries the meanings this template uses.

The reason: an agent can confidently choose a plausible meaning that is wrong for this repository.

### Form Engineering

Markdown structure changes how instructions survive transport.

Use real headings, short paragraphs, flat lists, code fences with language identifiers, and explicit command blocks. Avoid visual-only priority signals.

The reason: humans, LLMs, IDEs, and tools parse Markdown differently. The safest form is structurally explicit.

### Progressive Disclosure

Put activation-critical guidance in `SKILL.md`. Put detailed durable knowledge in references. Put repository design intent in docs.

The reason: agents load context selectively. Important information must live where the relevant agent will actually see it.

### Problem And Task Framing

Treat a task as a problem assumed to have no obstacles yet.

When obstacles appear, define current state, goal state, gap, constraints, and acceptance criteria before continuing.

The reason: bootstrap work often starts as a simple request and reveals hidden design choices.

### Authority Shift

During bootstrap, `.template/` is authoritative for construction. During maintenance, `.template/` must be gone and the generated `AGENTS.md` plus `docs/ARCHITECTURE.md` become authoritative.

The reason: the repository's purpose changes after generation. Keeping both frames active creates conflicting goals.

### Verification Triangulation

Use different verification modes for different risks:

- Tools check syntax, frontmatter, manifests, links, and package boundaries.
- Agents check coherence, scope, reference structure, and rationale.
- Humans check domain fit, sensitivity, publication readiness, and value judgment.

The reason: no single intelligence type catches every failure mode.

## How Meaning Survives Transport

These principles explain why the rules above matter when an instruction crosses between humans, agents, and tools.

### Write For One-Way Delivery

A directive file is read later by a recipient who cannot ask you to clarify. Anticipate the questions a future agent would ask.

The reason: a gap you leave becomes a silent wrong guess, not a question.

### Protect The Weakest Stage

Meaning passes through many stages from intent to action, and the weakest stage caps the result. The stage that fails most often is the one where the goal was never stated.

The reason: stating the goal raises fidelity more than polishing already-clear rules.

### Track Goal Survival Separately From Rule Survival

Rules often arrive intact while the reason behind them is lost, which produces confident but brittle compliance. Check whether the purpose survived, not only whether the steps did.

The reason: an agent that keeps the rule but loses the goal defends the wrong behavior when conditions change.

### Treat Distortion As Worse Than Loss

Missing information leaves a visible gap. A distorted instruction looks complete, parses cleanly, and produces confident wrong action that passes output checks.

The reason: a result that ran and looked right is not evidence the instruction was understood.

### Design For The Boundary Being Crossed

Each handoff loses something specific. Prose aimed at a human invites unwarranted trust from an agent; a rule aimed at a tool drops what is not expressible as a rule; paraphrase between agents drifts toward generic meaning.

The reason: write for the specific recipient and boundary, not for an AI in general.

### Repeat Critical Constraints On Purpose

Repeating a critical constraint where it is needed raises the chance it is processed at least once under partial loading.

The reason: deduplication assumes full reading, which rarely holds for agents.

## How To Use This File

Read this file before designing or rewriting generated repository instructions.

Do not copy this file into the generated skill package. Instead, preserve the relevant reasoning in generated `AGENTS.md`, `docs/ARCHITECTURE.md`, and `README.md`.
