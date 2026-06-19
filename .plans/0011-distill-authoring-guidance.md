# 0011: Distill authoring and reasoning guidance into the bootstrap docs

Issue: none. Requested directly after reviewing the TechSpokes source corpus the template draws on.

Status: in-progress (implemented on `template-community-and-bootstrap`)

Layer: bootstrap guidance (`.template/bootstrap/*.md`).

## Problem

The template distills a body of TechSpokes guidance, credited in `docs/PROVENANCE.md`: the cross-intelligence communication theory, the AGENTS.md and README specifications, and a problem-solving framework. The bootstrap docs captured the core but left out several concrete, publishable rules that make the agent's output more consistent.

## Goal

Strengthen the bootstrap guidance with distilled, paraphrased operational rules from the source material, written in the template's own voice. Do not vendor or quote the private theory, its formulas, its translation matrix, its cited figures, or the problem-solving framework's taxonomy and schemas.

## What was added

`theory-context.md` gains a "How Meaning Survives Transport" section: write for one-way delivery, protect the weakest stage by stating the goal, track goal survival separately from rule survival, treat distortion as worse than loss, design for the specific boundary crossed, and repeat critical constraints on purpose.

`cross-intelligence-communication.md` gains the AGENTS.md authoring shape: the section order, read-depth guidance in the Summary, an under-100-line size target, and the rule to write `AGENTS.md` only when a standalone Summary is useful.

`skill-quality-standard.md` gains README required elements, anti-patterns, and sizing, plus a `Script Rules` section for commenting any scripts a generated skill ships.

`intake-adequacy-and-resolution.md` gains an "Asking High-Value Questions" section: ask only for genuine gaps, phrase questions as confirm-or-refute tests, ask the question that separates competing interpretations, separate fixed constraints from preferences, do not promote nearby mentions to requirements, and recompute gaps after each answer.

## Decisions

Each addition is paraphrased and kept digestible: headed sections, flat atomic lists, short rationale. The private theory's formal apparatus and the framework's implementation details were deliberately excluded; only the generic, publishable principles were reflected.

The script-commenting rule is self-contained rather than pointing to a specific installed skill, so it stays portable in a generated repository.

## Verification

Confirm the four bootstrap docs carry the additions, that no proprietary formula, matrix, figure, or taxonomy appears, and that `npm run validate` passes.
