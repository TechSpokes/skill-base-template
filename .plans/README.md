# Plans

This folder is the tracked backlog for template maintenance work on `skill-base-template` itself. It is the machinery for planning changes to the template before they are implemented.

## What belongs here

This folder holds one Markdown plan per unit of maintenance work, usually one plan per GitHub issue.

A plan describes the problem, the goal, the exact files to change, the ordered steps, the decisions and research behind them, the risks, and the verification method.

Each plan is written to be executed later by an agent or maintainer who did not do the planning. A plan must therefore be self-contained.

## What does not belong here

User skill-source material does not belong here. It lives in `.intake/`.

Bootstrap control instructions for building a generated skill do not belong here. They live in `.template/`.

Implementation of the work does not belong here. Plans describe changes; they do not make them.

## File naming

Each plan filename starts with a four-digit number that matches its GitHub issue number, followed by a short slug.

```text
.plans/
|-- README.md                 # this file
|-- 0000-backlog.md           # index of all plans, status, and priority
`-- NNNN-short-slug.md         # one plan; NNNN matches the GitHub issue number
```

When a plan does not map to a single issue, allocate the next free number above the highest issue number.

## Status values

A plan's status line uses one of the following words.

- `proposed`: drafted, not yet approved to start.
- `ready`: approved, can be implemented as written.
- `in-progress`: implementation started on a branch.
- `done`: merged, kept for history until the issue is closed.
- `dropped`: will not be done, with a one-line reason recorded.

## Lifecycle and boundaries

This folder is part of the template's own repository, not part of a generated skill. It travels into a new repository when someone clicks `Use this template`, where it has no meaning.

The release packager `scripts/package-release.mjs` stages only `src/` and `packaging/`, so `.plans/` never ships in any release ZIP.

Bootstrap cleanup should delete `.plans/` along with `.template/` when a generated repository transitions to maintenance mode. The plan in [0007-template-feedback-folder.md](0007-template-feedback-folder.md) adds that deletion to the cleanup guidance in `.template/bootstrap/cleanup-and-boundaries.md`.

The downstream equivalent of this folder for a generated skill is `.skill-template-feedback/`, which routes template gaps back upstream to this repository. That folder is designed in [0007-template-feedback-folder.md](0007-template-feedback-folder.md).
