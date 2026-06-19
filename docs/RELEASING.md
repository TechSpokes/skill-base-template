# Releasing and repository workflow

This document is the single source for how changes land in a generated skill repository and how a release is cut. It is written for a human or an agent maintaining the repository, and it explains both the steps and the GitHub features that enforce them.

Template repository releases use a separate process. See `docs/TEMPLATE-RELEASING.md`.

Generated skill release workflows live under `.template/generated/.github/workflows/` until the bootstrap agent installs them during cleanup. After cleanup they live at `.github/workflows/`.

## How changes land

The `main` branch is protected, so no change reaches it by a direct push, including from an administrator. Every change goes through a pull request that passes checks and is then squash-merged.

The flow for any change:

1. Create a branch from `main`.
2. Make the change and run `npm run validate` locally.
3. Push the branch and open a pull request into `main`.
4. Wait for the required `Validate skill package` check to pass.
5. Resolve any review conversations.
6. Squash-merge the pull request.

Dependabot changes follow the same path. It opens pull requests for GitHub Actions and dependency updates, which must pass the check and be squash-merged.

## What protects `main`

A repository ruleset on the default branch enforces these rules. The hardening commands that create it are in `.template/bootstrap/cleanup-and-boundaries.md`.

- A pull request is required before merging, with conversation resolution required and stale approvals dismissed on push.
- The `Validate skill package` status check must pass, and the branch must be up to date with `main` first.
- Force pushes and branch deletion are blocked.
- Linear history is required, and the only allowed merge method is squash.
- The rules are enforced for administrators too.

Required approvals are set to zero so a solo maintainer is not blocked. Raise this to one and require `CODEOWNERS` review if a second maintainer becomes active.

## Other repository safeguards

Secret scanning and push protection are enabled, so a credential pushed by mistake is caught before it reaches the public repository. Dependabot alerts and security updates are enabled, alongside the version updates configured in `.github/dependabot.yml`.

## Continuous integration

`.github/workflows/ci.yml` runs on pull requests and on pushes to `main`. Its job, `Validate skill package`, runs `npm run validate` and a packaging smoke test. This job is the required status check, so a pull request cannot merge unless validation and packaging succeed.

## Cutting a release

A release is a version bump landed through a pull request, followed by a tag.

1. On a branch, update `src/SKILL.md` and the relevant files in `src/references/`, then `README.md` and the files in `docs/`.
2. Set the new version in `package.json` and in both `packaging/*/plugin.json`.
3. Add a `## [vX.Y.Z]` section to `CHANGELOG.md`, move any entries from `## [Unreleased]` into it, and reset `## [Unreleased]` to note no unreleased changes. The release workflow requires this exact heading for the tag.
4. Add `docs/releases/vX.Y.Z.md` with the release notes. The release workflow requires this file for the tag.
5. Run `npm run validate`, then `npm run package -- vX.Y.Z` to confirm the assets build. Assets are written to `dist/assets/`, which is git-ignored.
6. Open the pull request, let the check pass, and squash-merge it into `main`.

## Tagging and the draft release

After the version bump is on `main`, push a `vX.Y.Z` tag. Pushing a tag is not a push to the `main` branch, so the branch ruleset does not block it. The tag triggers `.github/workflows/release-draft.yml`, which validates the skill, packages the assets, creates or updates a draft GitHub release from `docs/releases/vX.Y.Z.md`, and uploads the ZIP assets. It refuses to run if the matching `## [vX.Y.Z]` section in `CHANGELOG.md` or the release-notes file is missing.

The workflow leaves the release as a draft. Review it on GitHub and publish it manually.

## Versioning

Use tags in `vX.Y.Z` format as the release source of truth. The version in `package.json`, both plugin manifests, the `CHANGELOG.md` heading, and the `docs/releases/vX.Y.Z.md` file must all match the tag.
