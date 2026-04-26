# Contributing

Thank you for improving Skill Base Template.

## Purpose

This project helps teams create structured, validated, releasable agent skill repositories from raw intake material. Contributions should preserve that purpose.

## Good Contributions

- Improve bootstrap instructions for agents.
- Improve generated repository maintenance guidance.
- Improve validation or release packaging.
- Improve documentation clarity for new GitHub users.
- Add checks that prevent raw intake or bootstrap files from leaking into release assets.
- Clarify rationale behind instructions when it improves downstream agent judgment.

## Before Opening A Pull Request

- Read `README.md`.
- Read `docs/ARCHITECTURE.md`.
- Run `npm run validate`.
- Run `npm run package -- v0.1.0` when changing packaging or release behavior.

## Documentation Standards

Use plain Markdown with real headings, short paragraphs, flat lists, and fenced code blocks with language identifiers.

Prefer explaining why a rule exists when future agents may need to adapt it. Avoid adding long theory directly to the README. Put operational depth in `docs/` or `.template/bootstrap/`.

## Pull Request Expectations

Each pull request should explain:

- What changed.
- Why it matters.
- How it was validated.
- Whether generated repositories are affected.

## Security And Privacy

Do not commit private intake material, credentials, tokens, or proprietary examples. Use minimal public examples when demonstrating a workflow.
