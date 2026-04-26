# Quickstart

This repository starts as a template for building a skill repository.

## Create A Skill Repository

1. Open the template repository on GitHub.
2. Click `Use this template`.
3. Select `Create a new repository`.
4. Choose the owner, repository name, description, and visibility.
5. Click `Create repository from template`.
6. Clone the generated repository.
7. Add all source material to `.intake/`.
8. Ask an AI coding agent to build the skill from intake.
9. Let the agent rewrite the repository into maintenance mode.
10. Review the generated skill, docs, manifests, and validation results.

## What To Expect From The Agent

The agent should not merely fill placeholders. It should infer the reusable capability hidden in the intake, decide what belongs in the skill, record important assumptions, and explain the reasoning that future maintainers need.

If the agent finds contradictions in the intake, it should resolve low-risk issues locally and document high-impact assumptions. The goal is a maintainable skill, not a perfect transcript of every source file.

## What The Agent Builds

The agent builds `src/SKILL.md`, supporting references, documentation, packaging manifests, release notes, and a maintenance-mode `AGENTS.md`.

## After Cleanup

After cleanup, `.template/` should be gone. The repository should read like a normal skill repository, not a generated project.

The generated `AGENTS.md` should explain how to maintain the skill and why important boundaries exist. Future agents should not need to know this template existed.

## Related

- `BOOTSTRAP-WORKFLOW.md` - Full lifecycle and cleanup rationale.
- `ARCHITECTURE.md` - Repository modes and authority model.
