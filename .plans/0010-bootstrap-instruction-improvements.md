# 0010: Strengthen goals-and-values transmission and add an alignment-confirmation gate

Issue: none. Requested directly after reviewing the descendant's generated agent instructions.

Status: in-progress (implemented on `template-community-and-bootstrap`)

Layer: bootstrap guidance (`.template/bootstrap/*.md`) and the template `AGENTS.md`.

## Problem

Two weaknesses surfaced when comparing the descendant's generated `AGENTS.md` with the bootstrap guidance that should produce it.

First, the descendant's `AGENTS.md` transmits goals and values for local decisions very well. It has a "Core principles the skill must keep" section and an explicit decision stance: surface findings as obstacles to the goal, weigh local context, and bring decisions to the user rather than acting alone or silently deferring. The bootstrap guidance supports this in its theory, but the operational checklists that the agent actually follows do not require it, so a generated `AGENTS.md` may omit it.

Second, the exploratory phase has no alignment-confirmation step. The agent assesses intake adequacy, resolves gaps through inference and scope narrowing, and passes the build readiness gate, then builds. It never confirms its synthesized understanding with the user. When the readiness decision rested on the agent's own guesses, construction can start misaligned with the user's intent.

## Goal

A generated `AGENTS.md` reliably carries the skill's core principles and a decision stance that enables aligned local decisions. The bootstrap agent confirms its synthesized understanding with the user before it starts building the skill.

## Part 1: Goals and values for local decisions

The descendant's `AGENTS.md` is the model. Its core-principles section states each durable principle with its rationale, and its decision stance tells a future agent how to act when the exact instruction does not fit: diagnose, weigh local context, and confirm with the user.

The theory already exists. `cross-intelligence-communication.md` states "Give future agents enough reasoning to make local decisions" and prescribes a "Writing Repository Agent Instructions" pattern with values and local judgment rules. The gap is in the operational checklists.

Update the `Generated AGENTS.md Rules` checklist in `cross-intelligence-communication.md` to require a core-principles-and-decision-stance section.

Update the `Maintenance AGENTS.md Requirements` in `cleanup-and-boundaries.md` to require the same, aligned with the cross-intelligence wording.

## Part 2: Alignment confirmation before construction

Add an alignment-confirmation step to `intake-adequacy-and-resolution.md`. After the build readiness gate passes and before writing `src/SKILL.md`, the agent presents a short synthesis the user can confirm or correct: the skill candidate and goal, the activation and non-activation boundary, the core workflow in outline, the key assumptions the decision depends on, and anything narrowed or deferred.

Frame it to avoid the existing `Questionnaire Transfer` pitfall. The agent presents synthesized understanding, not a list of design questions. The agent does the design; the user confirms the direction. Scale the step to how much the readiness decision rested on inference rather than direct evidence.

Add a gate in `build-skill-from-intake.md` between Phase 2 (Skill Design) and Phase 3 (Build The Skill Product), so the confirmation happens once the design synthesis exists and before construction.

Add a must-follow rule to the template `AGENTS.md`: do not start `src/SKILL.md` until the build readiness gate passes and the agent's understanding is confirmed with the user.

Add the confirmation to the Phase 0 completion criteria in `intake-adequacy-and-resolution.md`.

## Decisions

The changes target the operational checklists and the phase sequence rather than the theory, because the theory already endorses both goals: reasoning for local decisions and user alignment. The risk was that the checklists let an agent skip them.

The alignment-confirmation step is explicitly distinguished from the resolution ladder's `Ask` rung. `Ask` resolves a specific blocking gap. Alignment confirmation validates the agent's overall interpretation so construction starts from shared understanding.

## Part 3: Reader-standpoint language alignment

An audit of the bootstrap control plane found the instruction files opened in author and provenance voice ("This file is a distilled operational version of TechSpokes research"), referenced private research the executing agent cannot see, and omitted recently added directories from the repository-shape and cleanup guidance.

Reframe the opening of each bootstrap instruction file to address the executing agent and its task. Keep authorship attribution in `docs/PROVENANCE.md` and the README, not in each operational file. Remove references to private research the reader cannot access.

Document `.plans/` and `.skill-template-feedback/` in the repository-shape trees, and add the feedback-folder install and the `.plans/` deletion to the Phase 7 cleanup steps, so the workflow and the shape guidance agree with `cleanup-and-boundaries.md`.

Do not vendor or expose the private theory or approaches the template distills. The instruction files carry only the operational, public-appropriate form.

## Verification

Confirm `cross-intelligence-communication.md` and `cleanup-and-boundaries.md` require a core-principles-and-decision-stance section in the generated `AGENTS.md`.

Confirm the bootstrap instruction files open by addressing the executing agent, and that no file references private research material.

Confirm `intake-adequacy-and-resolution.md` has an alignment-confirmation step that is distinguished from the `Ask` rung and scaled to the reliance on inference.

Confirm `build-skill-from-intake.md` gates Phase 3 on the confirmation, and the template `AGENTS.md` carries the must-follow rule.

Run `npm run validate` to confirm template mode is intact.
