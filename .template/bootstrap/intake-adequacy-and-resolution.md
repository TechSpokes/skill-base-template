# Intake Adequacy And Resolution

This file defines how a bootstrap agent decides whether `.intake/` contains enough evidence to build a transferable skill, and what the agent should do when it does not.

## Goal

Prevent agents from fabricating a skill from weak intake while still preserving user convenience.

The agent should resolve missing evidence through extraction, inference, safe discovery, scoped experiments, scope narrowing, or minimal human clarification before building `src/SKILL.md`.

## Why This Phase Exists

Raw intake is often incomplete. Empty intake, a single idea, messy transcripts, tool exploration notes, and conflicting examples can all be valid starting points.

The risk is that an agent may convert a plausible idea into a confident but brittle skill. A generated skill must transfer to future agents that do not share the bootstrap conversation, local assumptions, or private context.

This phase makes the agent prove that the skill is buildable before construction starts.

## Pitfalls This Phase Must Avoid

### Research Sprawl

Do not treat weak intake as permission to explore indefinitely. Every discovery action must trace to a missing build-critical dimension.

### Premature Skill Construction

Do not start writing `src/SKILL.md` when the skill goal, activation boundary, workflow, required inputs, expected outputs, or safety constraints are unknown.

### Questionnaire Transfer

Do not push the design burden back to the user with a long form. Ask the smallest number of questions needed after local resolution paths are exhausted.

### False Certainty

Do not present inferred or researched facts as user intent. Label evidence, assumptions, and live-environment observations separately.

### Overfitting To Examples

Do not build a skill that only replays one transcript or fixture. Extract the reusable workflow, boundaries, and verification criteria.

### Unsafe Discovery

Do not run destructive actions against live systems. Use disposable fixtures or request explicit approval when an experiment may mutate data, configuration, accounts, files outside `.intake/`, or external services.

### Scope Inflation

Do not merge unrelated capabilities into one skill because they appeared in the same intake area. Split candidate skills or narrow to the smallest coherent skill.

## Adequacy Dimensions

Evaluate intake against these dimensions before skill design.

### Skill Goal

The agent must identify the specialized work the future skill helps agents perform.

This is blocking because a skill without a goal becomes a generic advice file.

### Recipient And Context

The agent should identify who will invoke the skill and under what working conditions.

This matters because an internal maintenance skill, a public API skill, and a host-specific tool skill need different assumptions.

### Activation Boundary

The agent must identify prompts and task shapes that should activate the skill.

This is blocking because the frontmatter description controls discovery and misuse risk.

### Non-Activation Boundary

The agent should identify adjacent requests that should not activate the skill.

This matters because broad skills crowd out more specific skills and produce wrong workflows.

### Core Workflow

The agent must identify the steps a future agent should follow.

This is blocking because `SKILL.md` must be executable, not merely descriptive.

### Required Inputs

The agent must identify what information, files, tools, permissions, or environment state the workflow needs.

This is blocking when missing inputs would make the skill impossible to follow.

### Expected Outputs

The agent must identify what the future agent should produce.

This is blocking because completion cannot be verified without an output target.

### Safety Constraints

The agent must identify destructive, private, legal, financial, medical, security, credential, or production-system risks.

This is blocking whenever unsafe behavior could result from a wrong assumption.

### Verification Method

The agent should identify how future agents can know the work is complete.

This matters because reusable skills need observable completion, even when validation is partly judgment-based.

### Maintenance Risks

The agent should identify volatile dependencies, changing APIs, host-specific behavior, and assumptions future maintainers must revisit.

This matters because a skill can become harmful when its operating environment changes.

## Build Readiness Gate

The agent may proceed to skill design only when these dimensions have evidence or documented low-risk assumptions:

- Skill goal.
- Activation boundary.
- Core workflow.
- Required inputs.
- Expected outputs.
- Safety constraints.

If any required dimension is missing and cannot be resolved safely, stop before building the skill and ask for the minimum missing input.

## Decision Procedure

Use this procedure after the adequacy dimensions are assessed.

### Step 1: Identify Blocking Gaps

Mark a gap as blocking when it affects the skill goal, activation boundary, core workflow, required inputs, expected outputs, or safety constraints.

Non-blocking gaps may become assumptions or maintenance notes when they do not change runtime behavior.

### Step 2: Classify The Risk

Classify each blocking gap as low, medium, or high risk.

Low-risk gaps can be resolved through conservative inference when the likely answer is obvious and reversible.

Medium-risk gaps require discovery, experiments, or scope narrowing.

High-risk gaps require stronger evidence, explicit approval, or a stop decision.

### Step 3: Choose The Least Costly Valid Path

Start with extraction, then inference, then discovery, then experiments, then scope narrowing, then human clarification, then stop.

Do not skip to human clarification unless the answer depends on user intent, priority, permission, or private context that the agent cannot discover.

### Step 4: Preserve The Reasoning

Record why the selected path is valid for the gap.

A future maintainer should be able to tell whether the agent discovered a fact, inferred an assumption, narrowed the skill, or received a human decision.

### Step 5: Recheck Readiness

After resolution work, rerun the build readiness gate.

Proceed only when required dimensions are supported by evidence or documented low-risk assumptions.

## Resolution Ladder

Use the lowest-cost path that can resolve the missing dimension.

### Extract

Read `.intake/`, the current user request, repository files, and existing documentation. Pull out repeated tasks, examples, vocabulary, constraints, and outputs.

Use this path first because it preserves the user's provided evidence.

### Infer

Make conservative assumptions when the evidence strongly points in one direction and the cost of being wrong is low.

Record each assumption and why it is low risk.

### Discover

Inspect local tools, schemas, docs, source files, command output, APIs, or primary public sources when the missing dimension is discoverable.

Use discovery when the skill depends on behavior that can be observed without unsafe side effects.

### Experiment

Create disposable fixtures under `.intake/playground/` or `.intake/research/` and test representative behavior.

Use experiments when documentation is incomplete, tool behavior is uncertain, or examples do not cover important edge cases.

### Constrain

Narrow the skill to the portion supported by evidence.

Use this path when the intake suggests several capabilities but only one has enough support to become a high-quality first skill.

### Ask

Ask the user a concise question only when local resolution cannot answer a build-critical question.

Ask about decisions, priorities, and permissions. Do not ask the user to perform skill architecture work.

### Stop

Stop before building when the remaining gap would force fabrication, unsafe access, or high-risk assumptions.

State the blocking gap and the smallest input that would unblock the work.

## Asking High-Value Questions

When local resolution is exhausted and a question is necessary, make it count.

- Ask only about genuine capability gaps, conflicts, priorities, or permissions. A gap you can extract, infer, or discover is research you skipped, not a question.
- Phrase a question as a confirm-or-refute test of a specific assumption, not an open prompt. Say what would confirm it and what would refute it.
- When the intake reads more than one way, list the competing interpretations and ask the one question whose answer separates the most of them.
- Separate what cannot change from what merely should not. Only fixed constraints can block a build.
- Do not turn nearby mentions or ordering in the intake into a requirement, and do not assume a request for one case applies to every case. Confirm intent first.
- After each answer, recompute the remaining gaps. A resolved blocker can shift the goal and reveal new ones.

## Common Intake States

### Empty Intake

If `.intake/` contains no source material, inspect the current user request for a clear skill goal.

If a clear goal exists, create an agent-derived seed note in `.template/state/intake-assessment.md` and continue through the adequacy gate. If no goal exists, ask one question: what should this skill help future agents do?

### Goal-Only Intake

Treat a short goal as a seed, not a specification.

Resolve missing workflow, boundary, input, output, safety, and verification dimensions before writing the skill.

### Messy Intake

Cluster repeated tasks, terms, examples, outputs, and constraints.

Proceed when one skill candidate dominates. Ask the user to choose only when competing candidates would produce different skills.

### Conflicting Intake

Identify the conflict and its effect on the generated skill.

Resolve low-impact conflicts with documented assumptions. Ask about high-impact conflicts that change activation, workflow, safety, or output.

### Tool-Dependent Intake

Inventory the tool surface, inspect schemas, test read-only operations first, and compare against fallback methods when possible.

Use disposable fixtures for mutations. Treat live environment state as evidence with a timestamp, not as a portable guarantee.

### Overbroad Intake

Select the smallest coherent skill that has a complete workflow and verification method.

Document deferred adjacent skills separately instead of inflating the first skill.

### High-Risk Intake

Require stronger evidence for domains involving medicine, law, finance, security, credentials, destructive operations, production systems, or private data.

Do not use low-confidence assumptions to pass the build readiness gate in high-risk areas.

## Alignment Confirmation

After the build readiness gate passes and before writing `src/SKILL.md`, confirm the agent's synthesized understanding with the user. The purpose is alignment, not design delegation.

Present a short synthesis the user can confirm or correct in one reading:

- The skill candidate and its goal in one or two sentences.
- The activation and non-activation boundary.
- The core workflow in outline.
- The key assumptions the readiness decision depends on, labeled as assumptions.
- Anything narrowed, deferred, or resolved from a conflict.

Ask the user to confirm or correct this synthesis. A correction is cheap; a wrong skill is expensive. If the user corrects it, revise the design and confirm the corrected direction before construction begins.

Scale the step to how much the readiness decision rested on the agent's own guesses. When intake was explicit and the decision rested on direct evidence with no material assumptions, a brief restatement is enough. When the decision rested on inference, scope narrowing, or conflict resolution, confirmation matters more, because the agent is acting on its interpretation rather than on stated intent.

This step is distinct from the `Ask` rung of the resolution ladder. `Ask` resolves a specific blocking gap during resolution. Alignment confirmation validates the agent's overall interpretation after resolution, so construction starts from a shared understanding.

Do not turn this into a questionnaire. Present synthesized understanding, not a list of design questions. The agent does the design work; the user confirms the direction. This keeps the step clear of the `Questionnaire Transfer` pitfall.

## Required Temporary Artifacts

Create these files under `.template/state/` while bootstrap mode is active:

- `intake-assessment.md`.
- `intake-resolution-plan.md` when resolution work is needed.
- `build-readiness.md`.

These files are temporary construction records. Move durable rationale into `docs/ARCHITECTURE.md` before cleanup when it helps future maintainers.

## Evidence Artifacts

When the agent creates durable evidence, place it under `.intake/`.

Use these folders when helpful:

```text
.intake/
|-- research/
|-- experiments/
`-- playground/
```

Do not place bootstrap reasoning in `.intake/`. Intake is evidence for the skill, not the agent's private planning area.

## Build Readiness Format

Use this structure in `.template/state/build-readiness.md`:

```markdown
# Build Readiness

## Skill Candidate

## Evidence Summary

## Resolved Gaps

## Remaining Assumptions

## Human Decisions

## Safety Notes

## Decision
```

The decision must be one of:

- Ready to build.
- Ready to build with documented low-risk assumptions.
- Not ready to build.

## Completion Criteria

Phase 0 is complete when:

- The adequacy dimensions have been assessed.
- Blocking gaps have been resolved, narrowed, asked, or stopped.
- Unsafe discovery has been avoided or approved.
- Build readiness has a clear decision.
- The agent's synthesized understanding has been confirmed with the user.
- Any created evidence is stored under `.intake/`.
- Any temporary reasoning is stored under `.template/state/`.
