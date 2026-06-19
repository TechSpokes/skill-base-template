# 0006: Repository hardening, branch protection, and release process

Issue: [#6](https://github.com/TechSpokes/skill-base-template/issues/6)

Status: in-progress (template-side implemented on `template-maintenance-baseline`; live-repo hardening is outward-facing and pending)

Layer: bootstrap guidance (`.template/bootstrap/cleanup-and-boundaries.md`), generated-skill docs (`docs/RELEASING.md`), and several governance files.

## Problem

A repository generated from this template and made public starts with no protection. There is no branch protection or ruleset on `main`, no secret scanning or push protection, and no Dependabot security updates.

The generated `AGENTS.md` says never push directly to `main`, but nothing enforces it.

The release documentation lacks a branch-and-pull-request flow and contains hardcoded version commands such as `npm run package -- v0.1.0`, which read like a fixed version rather than a placeholder.

## Goal

Bootstrap cleanup includes a hardening step with a recommended ruleset and security settings, expressed as runnable `gh` commands. The release process is documented in a single source with the branch-and-pull-request flow and version-neutral commands.

## Part 1: Harden the repository

Add a hardening step to `.template/bootstrap/cleanup-and-boundaries.md`. The step instructs the agent to confirm with the user before changing repository settings, because these are outward-facing actions, then apply the settings with `gh`.

The required status check in a template-generated repository is named `Validate skill package`, which is the job name in the generated `ci.yml`. The CI workflow must already exist on the default branch for the check to be selectable.

### Repository settings

```bash
gh api repos/OWNER/REPO -X PATCH -F has_discussions=true -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false
```

### Secret scanning and push protection

```bash
gh api repos/OWNER/REPO -X PATCH --input - <<'JSON'
{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}
JSON
```

### Dependabot alerts and security updates

```bash
gh api repos/OWNER/REPO/vulnerability-alerts -X PUT
gh api repos/OWNER/REPO/automated-security-fixes -X PUT
```

### Branch protection ruleset

```bash
gh api repos/OWNER/REPO/rulesets -X POST --input - <<'JSON'
{
  "name": "main protection",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "bypass_actors": [],
  "rules": [
    { "type": "pull_request", "parameters": { "required_approving_review_count": 0, "dismiss_stale_reviews_on_push": true, "require_code_owner_review": false, "require_last_push_approval": false, "required_review_thread_resolution": true, "allowed_merge_methods": ["squash"] } },
    { "type": "required_status_checks", "parameters": { "strict_required_status_checks_policy": true, "required_status_checks": [ { "context": "Validate skill package" } ] } },
    { "type": "non_fast_forward" },
    { "type": "deletion" },
    { "type": "required_linear_history" }
  ]
}
JSON
```

### Decision on approvals

Required approvals are zero so a solo maintainer is not blocked, because a maintainer cannot approve their own pull request. The guidance notes that a team with a second maintainer should raise this to one and require code-owner review.

## Part 2: One clear release process

Make `docs/RELEASING.md` the single source for how changes land and how a release is cut. The flow is branch, pull request, required check, squash-merge, then a version bump on the default branch and a `vX.Y.Z` tag that triggers the draft-release workflow.

Note in the guidance that pushing a tag is not a push to the protected branch, so tagging a release is allowed under the ruleset.

Point the generated `AGENTS.md` to `docs/RELEASING.md` instead of repeating the steps. The bootstrap requirement for this lives in `.template/bootstrap/cleanup-and-boundaries.md` under the maintenance `AGENTS.md` requirements.

Reconcile `CONTRIBUTING.md` and `.github/PULL_REQUEST_TEMPLATE.md` with the single source so they describe the same flow.

## Part 3: Version-neutral commands

Replace hardcoded release-context versions with `vX.Y.Z` so they read as placeholders. The occurrences are listed below.

- `docs/RELEASING.md` line 37, the local packaging example.
- `README.md` line 79, the template's own packaging example.
- `CONTRIBUTING.md` line 23, the packaging check.
- `docs/BOOTSTRAP-WORKFLOW.md` line 114, the packaging example.
- `.github/PULL_REQUEST_TEMPLATE.md` line 19, the packaging check.

Distinguish release examples from smoke tests. A documentation example that shows a user how to cut a release uses `vX.Y.Z`. A smoke test that actually runs in CI uses the `v0.0.0` placeholder from plan [0003](0003-ci-action-versions.md). The pull-request template and contributing checks are illustrative, so they take `vX.Y.Z`.

## Decisions

The hardening guidance ships as instructions plus runnable commands rather than as automation, because branch protection and security settings are outward-facing and require user confirmation per the template's own values. The agent runs them only after confirming.

The ruleset values are copied from the descendant's verified configuration, including squash-only merges, required conversation resolution, required linear history, and blocked force-push and deletion.

## Verification

Confirm `.template/bootstrap/cleanup-and-boundaries.md` contains the hardening step with all four command groups and the approvals decision.

Confirm `docs/RELEASING.md` describes the branch-and-pull-request flow and the tag trigger, and that `AGENTS.md`, `CONTRIBUTING.md`, and the pull-request template point to it without duplicating steps.

Search the repository for hardcoded package versions and confirm none remain in release-context docs outside the changelog and release notes. A representative search is `grep -rnE 'package -- v[0-9]'`, expecting only smoke-test `v0.0.0` occurrences.

Run `npm run validate` to confirm template mode and governance files remain consistent.
