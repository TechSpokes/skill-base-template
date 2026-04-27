# Template Releasing

This document describes releases for the Skill Base Template repository itself.

Generated skill packaging is a separate process. See `docs/RELEASING.md` for generated skill release packaging after bootstrap cleanup.

## Release Goal

Template releases should publish the template source state and release notes.

They must not upload placeholder generated skill ZIP assets. Those ZIPs are only meaningful after a generated repository replaces the placeholder skill with a real skill product.

## Release Checklist

- Update `package.json`.
- Update `CHANGELOG.md`.
- Update `docs/VERSION.md`.
- Add `docs/releases/vX.Y.Z.md`.
- Run `npm run validate`.
- Run `npm run package -- vX.Y.Z` as a local smoke test when packaging changes need verification.
- Tag the release with `vX.Y.Z`.

## GitHub Draft Release

Pushing a `vX.Y.Z` tag runs `.github/workflows/template-release-draft.yml`.

The workflow:

- Checks out the tagged commit.
- Confirms the tag uses `vX.Y.Z` format.
- Confirms `docs/releases/vX.Y.Z.md` exists.
- Confirms `CHANGELOG.md` contains `## [vX.Y.Z]`.
- Runs `npm run validate`.
- Runs `npm run package -- vX.Y.Z` as a smoke test.
- Creates or updates a draft GitHub release from the release notes.

The workflow refuses to mutate an existing published release.

## Asset Policy

Do not upload `dist/assets/*.zip` to template repository releases.

Those files are placeholder skill packages in template mode. GitHub source archives are the correct template release assets.
