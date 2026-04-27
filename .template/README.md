# Template Control Plane

This folder contains bootstrap instructions for agents. It is not part of the generated skill package.

## Contents

- `bootstrap/` contains the workflow an agent follows to build a skill from `.intake/`.
- `generated/` contains files that should be moved into place when the repository becomes a generated skill repository.
- `schemas/` contains optional structured validation helpers.
- `state/` may be created during bootstrap for temporary agent assessment and design notes.

## Boundary

Delete this folder when the repository is converted to maintenance mode. Release packaging must never include `.template/`.

Do not move `state/` files into the generated skill. Preserve only durable rationale that future maintainers need.
