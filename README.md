# Skill Base Template

Skill Base Template is a public GitHub repository template by TechSpokes for creating structured, validated, releasable agent skill repositories from raw intake material.

Use this template when you want a repeatable path from a skill idea to a maintained repository with `SKILL.md`, references, validation scripts, release workflows, and plugin packaging. The template is designed for agent-assisted creation: the user places source material in `.intake/`, and an AI coding agent turns that material into a standalone skill repository.

## Why It Exists

Agent skills are becoming reusable operational units for AI coding environments. Teams need a consistent way to create them without hand-building repository structure, release assets, validation checks, and maintenance instructions each time.

This template promotes a structured workflow for automated creation, validation, release, and maintenance of agent skills. It helps skill authors move faster while preserving the reasoning and boundaries future agents need to maintain the skill safely.

## What It Provides

- Intake-driven skill generation from `.intake/`.
- Bootstrap instructions for AI coding agents.
- A portable `src/SKILL.md` package layout.
- Reference, asset, and fixture folders for progressive disclosure.
- Validation for skill frontmatter, manifests, links, and release boundaries.
- Template-safe CI plus generated skill release workflows installed during bootstrap cleanup.
- A cleanup path that converts the generated repository into a standalone maintained skill repo.

## Intended Users

This template is for teams and maintainers who want to publish dedicated agent skills without requiring every contributor to understand the full skill packaging process.

It is also useful for organizations adopting structured agent workflows across multiple skill repositories.

## Quick Start

1. Open this template repository on GitHub.
2. Click `Use this template` above the file list.
3. Select `Create a new repository`.
4. Choose the owner account or organization for the new repository.
5. Enter a repository name and optional description.
6. Choose public or private visibility.
7. Leave `Include all branches` unchecked unless you intentionally need every branch from the template.
8. Click `Create repository from template`.
9. Clone the new repository GitHub created, not the template repository.
10. Add source material, examples, and rough notes to `.intake/`.
11. Ask an AI coding agent to build the skill from intake.
12. Review the generated skill, docs, packaging, and validation results.
13. Publish release assets when the generated repository is ready.

Detailed workflow: [docs/BOOTSTRAP-WORKFLOW.md](docs/BOOTSTRAP-WORKFLOW.md).

## Documentation

- [docs/BOOTSTRAP-WORKFLOW.md](docs/BOOTSTRAP-WORKFLOW.md) - Full lifecycle from intake to standalone skill repository.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Repository modes, authority model, and design intent.
- [docs/QUICKSTART.md](docs/QUICKSTART.md) - Short usage path for creating a skill repository.
- [docs/INSTALL.md](docs/INSTALL.md) - How generated skill packages are installed.
- [docs/RELEASING.md](docs/RELEASING.md) - Release checklist and packaging workflow.
- [docs/PROVENANCE.md](docs/PROVENANCE.md) - Attribution and distilled-source notes.
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines.
- [SUPPORT.md](SUPPORT.md) - Support paths and contact options.
- [SECURITY.md](SECURITY.md) - Security reporting and sensitive material guidance.

## Template Status

This repository starts in bootstrap mode. Generated repositories should eventually remove `.template/`, rewrite `README.md`, rewrite `AGENTS.md`, and become standalone skill repositories.

## Validation

Run:

```bash
npm run validate
```

## Packaging

Run:

```bash
npm run package -- v0.1.0
```

Use the intended release tag. Packaging writes release assets to `dist/assets/`.

## Author

Authored and maintained by TechSpokes.

Several bootstrap and documentation files contain distilled versions of TechSpokes ideas on agent instructions, README structure, Markdown form engineering, and cross-intelligence communication. See [docs/PROVENANCE.md](docs/PROVENANCE.md).

## License

This repository is licensed under the terms in [LICENSE](LICENSE).
