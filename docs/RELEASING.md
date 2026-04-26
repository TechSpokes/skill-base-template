# Releasing

This template contains release automation for generated skill repositories, but the release workflow is not active in the template repository itself.

Generated skill release workflows live under `.template/generated/.github/workflows/` until the bootstrap agent installs them during cleanup.

## Release Goal

Release assets should contain only what an agent host needs to install and use the generated skill.

The release process protects three things:

- User privacy by excluding raw intake.
- Skill portability by packaging the runtime skill cleanly.
- Maintainer confidence by requiring changelog and release notes.

## Release Checklist

- Update `src/SKILL.md`.
- Update supporting files in `src/references/`.
- Update `README.md` and docs.
- Update `CHANGELOG.md`.
- Add `docs/releases/vX.Y.Z.md`.
- Update packaging manifests.
- Run `npm run validate`.
- Tag the release with `vX.Y.Z`.

Each checklist item exists to keep repository state, package metadata, and release history synchronized. Skipping one makes it harder for future agents to understand what changed and whether an artifact is safe to publish.

## Local Packaging

Run:

```bash
npm run package -- v0.1.0
```

Use the intended tag. Assets are written to `dist/assets/`.

## GitHub Release

After bootstrap cleanup, pushing a `vX.Y.Z` tag in a generated skill repository runs `.github/workflows/release-draft.yml`. The workflow creates or updates a draft release and uploads ZIP assets.

The template repository keeps only `.github/workflows/template-ci.yml` active. This prevents template tags from publishing placeholder skill assets.
