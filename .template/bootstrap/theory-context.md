# Theory Context For Bootstrap Agents

This is a distilled operational version of TechSpokes cross-intelligence communication and problem-framing research. It is adapted for bootstrap agents using this public template and is not the full source theory.

## Goal

Give bootstrap agents the reasoning model behind this template without requiring them to load large research files.

## Decision

Do not vendor the full theory files into generated repositories. Use this adapted operational summary instead.

The original research files are long, exploratory, and partly project-local. Including them as-is would increase context load, expose non-template research material, and make bootstrap agents sort theory from action. The useful part for this template is the operating model below.

## Values Preserved From The Theory

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

Define these terms when they affect behavior.

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

## How To Use This File

Read this file before designing or rewriting generated repository instructions.

Do not copy this file into the generated skill package. Instead, preserve the relevant reasoning in generated `AGENTS.md`, `docs/ARCHITECTURE.md`, and `README.md`.
