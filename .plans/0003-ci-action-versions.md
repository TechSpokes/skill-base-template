# 0003: Current CI action versions and a placeholder smoke-test tag

Issue: [#3](https://github.com/TechSpokes/skill-base-template/issues/3)

Status: in-progress (implemented on `template-maintenance-baseline`)

Layer: generated-workflow staging (`.template/generated/`).

## Problem

The generated CI workflow pins old action majors and runs a smoke test against a tag that reads like a real version.

`.template/generated/.github/workflows/ci.yml` pins `actions/checkout@v4` on line 17 and `actions/setup-node@v4` on line 20. It runs `npm run package -- v0.1.0` on line 28.

`.template/generated/.github/workflows/release-draft.yml` pins `actions/checkout@v4` on line 24 and `actions/setup-node@v4` on line 66.

Because the template also ships `.github/dependabot.yml` with a GitHub Actions updater, every new repository receives a Dependabot pull request bumping these actions on its first day. The descendant received exactly that as its PR #1, bumping `actions/checkout` from v4 to v7.

## Goal

A repository generated from this template starts on current action majors and does not present a smoke-test tag that looks like a meaningful release version.

## Research and decisions

The current major versions were verified against the action repositories on 2026-06-19 using `gh api`.

- `actions/checkout` latest release is `v7.0.0`, so pin `@v7`.
- `actions/setup-node` latest release is `v6.4.0`, so pin `@v6`.

The descendant only bumped `actions/checkout` to v7 and left `actions/setup-node` at v4, because Dependabot opened one bump at a time. This template fix is more complete than the descendant: it updates both actions in both generated workflows.

Keep `.github/dependabot.yml`. Dependabot is desirable; the goal is only to stop new repositories from starting a full major behind.

The smoke-test invocation must run, so its tag must satisfy the version regex in `scripts/package-release.mjs`, which is `^v[0-9]+\.[0-9]+\.[0-9]+([.-][A-Za-z0-9.-]+)?$`. Use `v0.0.0` so the tag is a valid format that no human reads as a real release. The release-draft workflow already packages `${{ steps.meta.outputs.tag }}`, which needs no change.

## Steps

Edit `.template/generated/.github/workflows/ci.yml`. Change `actions/checkout@v4` to `actions/checkout@v7`. Change `actions/setup-node@v4` to `actions/setup-node@v6`. Change `npm run package -- v0.1.0` to `npm run package -- v0.0.0` and add a trailing comment marking it as a smoke-test placeholder rather than a release tag.

Edit `.template/generated/.github/workflows/release-draft.yml`. Change `actions/checkout@v4` to `actions/checkout@v7`. Change `actions/setup-node@v4` to `actions/setup-node@v6`.

## Secondary cleanup

The template's own workflows `.github/workflows/template-ci.yml` and `.github/workflows/template-release-draft.yml` currently pin `actions/checkout@v6`. Bump them to `@v7` for consistency, or let the template's own Dependabot do it. This is not part of issue #3 and does not affect generated repositories.

The hardcoded `v0.1.0` smoke-test tag also appears in `template-ci.yml` line 28. Align it to the same `v0.0.0` placeholder when touching that file.

## Out of scope

Release-documentation examples that show users how to cut a release belong to plan [0006](0006-repo-hardening-and-release-process.md), which converts them to `vX.Y.Z`. This plan changes only smoke-test invocations that actually run.

## Verification

Confirm both generated workflows reference `actions/checkout@v7` and `actions/setup-node@v6`.

Run `npm run validate` to confirm template mode is intact.

Confirm `v0.0.0` passes the package regex by running `npm run package -- v0.0.0` and observing that it produces assets without a tag-format error.
