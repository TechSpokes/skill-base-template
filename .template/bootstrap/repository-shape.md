# Repository Shape

This file is a distilled operational version of TechSpokes repository-structure guidance for agent-maintained skill packages.

## Goal

Define the repository states before bootstrap, during bootstrap, and after cleanup.

## Why Shape Matters

Repository shape is a communication channel. Future agents infer what matters from where files live, which files remain, and which files are packaged.

The template uses structure to make authority visible: `.intake/` is user evidence, `.template/` is temporary bootstrap guidance, `src/` is the runtime skill, and `docs/` is durable repository explanation.

## Shape Values

- Make the current repository mode obvious from the file tree.
- Keep temporary construction files separate from durable product files.
- Keep runtime packages smaller than the repository.
- Make release artifact structure match install expectations.

## Bootstrap Mode

The repository starts in bootstrap mode after a user creates it from the template.

```text
skill-repository/
|-- AGENTS.md
|-- README.md
|-- .intake/
|-- .template/
|-- src/
|-- docs/
|-- packaging/
|-- scripts/
`-- .github/
```

In bootstrap mode, `.template/` is present and `AGENTS.md` points agents to `.template/bootstrap/`.

Rationale: Bootstrap instructions need to be discoverable during construction, but visibly temporary so agents know they must not package or preserve them.

## Generated Skill Product

The agent builds the skill product while `.template/` still exists.

```text
src/
|-- SKILL.md
|-- references/
|-- scripts/
|-- assets/
`-- test-fixtures/
```

Only create optional folders when they contain useful files or clarify a generated package shape.

Rationale: Empty or unnecessary folders imply capabilities the skill may not actually have. The repository should communicate the real skill surface.

## Maintenance Mode

After cleanup, the repository must stand alone as a skill repository.

```text
skill-name/
|-- AGENTS.md
|-- README.md
|-- CHANGELOG.md
|-- LICENSE
|-- .intake/
|-- src/
|-- docs/
|-- packaging/
|-- scripts/
`-- .github/
```

Maintenance-mode `AGENTS.md` must no longer describe bootstrap. It must describe how future agents maintain the generated skill.

Rationale: The closest instruction file becomes the future agent's operating frame. If it still describes bootstrap, future maintenance can drift toward rebuilding instead of preserving.

## Release Artifact Shape

Release artifacts are smaller than the repository because users install skills, not project history.

Standalone skill ZIP:

```text
skill-name/
|-- SKILL.md
`-- references/
```

Codex plugin ZIP:

```text
skill-name-codex-plugin/
|-- .codex-plugin/
|   `-- plugin.json
`-- skills/
    `-- skill-name/
        |-- SKILL.md
        `-- references/
```

Claude plugin ZIP:

```text
skill-name-claude-plugin/
|-- .claude-plugin/
|   `-- plugin.json
`-- skills/
    `-- skill-name/
        |-- SKILL.md
        `-- references/
```
