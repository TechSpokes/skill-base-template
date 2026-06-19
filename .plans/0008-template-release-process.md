# 0008: Update the template's own release process and ship v1.2.0

Issue: none. This plan organizes the release of plans 0003 through 0007 and applies issue #6's rigor to the template repository itself.

Status: in-progress (Parts 1 and 3 done; Parts 2 and 4 are outward-facing and pending confirmation)

Layer: template-own release machinery (`docs/TEMPLATE-RELEASING.md`, `.github/workflows/template-release-draft.yml`), template governance, and live repository settings.

## Problem

The template's release process already runs. Releases v1.0.0 and v1.1.0 were drafted by `.github/workflows/template-release-draft.yml`. Two gaps remain.

The process is not documented as a branch-and-pull-request flow, the same gap that issue #6 fixes for generated repositories. `docs/TEMPLATE-RELEASING.md` lists a checklist and the tag trigger but not how a change lands on `main` first.

The live template repository is under-hardened. Its `main` ruleset, named `Protect main`, enforces only `deletion` and `non_fast_forward`. It does not require a pull request or the CI check. Secret scanning, push protection, and Dependabot security updates are disabled. The template should meet the bar it now asks generated repositories to meet.

## Goal

The template's release process is documented as a branch, pull request, required check, squash-merge, then tag flow. The live template repository is hardened to the same baseline issue #6 prescribes. The five fixes ship as template v1.2.0 through that process.

## Part 1: Document the branch-and-pull-request flow

Update `docs/TEMPLATE-RELEASING.md` to state that changes land on `main` through a branch, a pull request, the required CI check, and a squash-merge, before a release is cut.

State that the version bump and the `vX.Y.Z` tag come after the change is merged, and that pushing a tag is not a push to the protected branch, so it is allowed under the ruleset.

Keep the existing asset policy unchanged. Template releases publish source archives, not the placeholder `dist/assets/*.zip`.

## Part 2: Harden the live template repository

These are outward-facing actions on `TechSpokes/skill-base-template` and require user confirmation before running. The required status check name is `Validate template scaffold`, the job name in `.github/workflows/template-ci.yml`. Note that this differs from the generated-repository check name `Validate skill package` used in plan [0006](0006-repo-hardening-and-release-process.md).

### Repository settings

```bash
gh api repos/TechSpokes/skill-base-template -X PATCH -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false
```

### Secret scanning and push protection

```bash
gh api repos/TechSpokes/skill-base-template -X PATCH --input - <<'JSON'
{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}
JSON
```

### Dependabot security updates

```bash
gh api repos/TechSpokes/skill-base-template/vulnerability-alerts -X PUT
gh api repos/TechSpokes/skill-base-template/automated-security-fixes -X PUT
```

### Upgrade the existing ruleset

The ruleset `Protect main` already exists, so update it rather than create a second one. Fetch its id, then add the pull-request, required-status-check, and linear-history rules to match the baseline in plan [0006](0006-repo-hardening-and-release-process.md).

```bash
gh api repos/TechSpokes/skill-base-template/rulesets --jq '.[] | "\(.id) \(.name)"'
```

Required approvals stay at zero so a solo maintainer is not blocked, matching the decision in plan 0006.

## Part 3: Align the template workflow action versions

`.github/workflows/template-release-draft.yml` pins `actions/checkout@v6` on line 24. `.github/workflows/template-ci.yml` pins `actions/checkout@v6` on line 17. Bump both to `@v7` to match the current major confirmed in plan [0003](0003-ci-action-versions.md). The `actions/setup-node@v6` pins are already current.

Align the `template-ci.yml` smoke-test tag on line 28 to the `v0.0.0` placeholder, consistent with plan 0003.

## Part 4: Cut template v1.2.0

After phases 1 through 3 of the roadmap are merged, cut the release using the documented process.

Bump `version` in `package.json` to `1.2.0`. Update `docs/VERSION.md` to state the current version is `1.2.0`.

Move the changes from `[Unreleased]` in `CHANGELOG.md` into a new `## [v1.2.0]` section summarizing the five fixes.

Add `docs/releases/v1.2.0.md` with the release notes.

Run `npm run validate`. Run `npm run package -- v1.2.0` as a local smoke test.

Push the `v1.2.0` tag, which triggers `template-release-draft.yml` to create a draft release. Review and publish the draft. The tag push and the publish require user confirmation.

## Decisions

The template repository is hardened to the same baseline it prescribes for descendants, so the template demonstrates the practice rather than only documenting it.

The existing `Protect main` ruleset is upgraded in place rather than replaced, to avoid two overlapping rulesets on the same branch.

The release is a single minor version, v1.2.0, carrying all five fixes, so the changelog and release notes describe one coherent baseline.

## Verification

Confirm `docs/TEMPLATE-RELEASING.md` describes the branch-and-pull-request flow and the tag trigger.

Confirm `template-release-draft.yml` and `template-ci.yml` reference `actions/checkout@v7`.

After hardening, confirm `gh api repos/TechSpokes/skill-base-template/rules/branches/main` lists pull-request, required-status-check, and linear-history rules, and that the security settings report as enabled.

After the release, confirm the draft release for `v1.2.0` exists with notes from `docs/releases/v1.2.0.md` and that no `dist/assets/*.zip` were attached.
