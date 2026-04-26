# Template Control Plane

This folder contains bootstrap instructions for agents. It is not part of the generated skill package.

## Contents

- `bootstrap/` contains the workflow an agent follows to build a skill from `.intake/`.
- `generated/` contains files that should be moved into place when the repository becomes a generated skill repository.
- `schemas/` contains optional structured validation helpers.

## Boundary

Delete this folder when the repository is converted to maintenance mode. Release packaging must never include `.template/`.
