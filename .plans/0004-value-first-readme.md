# 0004: Value-first generated README with install-from-release

Issue: [#4](https://github.com/TechSpokes/skill-base-template/issues/4)

Status: in-progress (implemented on `template-maintenance-baseline`)

Layer: bootstrap guidance (`.template/bootstrap/*.md`), plus a link adjustment in `docs/INSTALL.md`.

## Problem

The bootstrap guidance steers the generated README toward maintainer-oriented content such as clone, `npm run validate`, and `npm run package`. A normal user who lands on a published skill should be able to download a release ZIP and install it without cloning or Node.

The README is the front page of a generated skill. It should lead with value and an install path, not with build instructions.

## Goal

The bootstrap guidance instructs the agent to produce a generated README whose order is value proposition first, install-from-release second, usage third, and maintainer steps in a clearly separated section.

## Scope and layer

This issue is about what the bootstrap agent writes into the generated repository's README, not about this template's own README. The guidance lives in the bootstrap layer.

The two candidate files are `.template/bootstrap/skill-quality-standard.md`, which sets the quality bar for the skill and its docs, and `.template/bootstrap/repository-shape.md`, which defines repository layout. Neither currently prescribes README order.

## What the descendant did

The descendant rewrote its README to open with what the skill gives the user in plain language. It then added an Install section that downloads the release ZIP from the Releases page and installs the standalone skill or the plugin. It then showed usage and moved internal and conceptual detail into `docs/`. The reference releases are its v1.2.0 and v1.4.0.

## Steps

Add a README-structure subsection to `.template/bootstrap/skill-quality-standard.md`. Prescribe the order: value proposition in plain language, install-from-release, usage, then a separated maintainer and contributor section.

State that the install section links to the repository's Releases page and names the three release assets: the standalone skill ZIP, the Claude plugin ZIP, and the Codex plugin ZIP.

State that maintainer and clone steps, including `npm run validate` and `npm run package`, stay in a clearly labeled section below usage, not in the opening.

State that conceptual and internal detail moves into `docs/` with links from the README, so the front page stays value-first.

Cross-reference `docs/INSTALL.md`, since the install instructions in the README and in `docs/INSTALL.md` must agree on locations after plan [0005](0005-packaging-install-correctness.md) lands.

## Decisions

The guidance prescribes order and section boundaries rather than exact README wording, because the skill domain is unknown at bootstrap time. The agent supplies the domain-specific value proposition; the template supplies the shape.

This plan depends on plan [0005](0005-packaging-install-correctness.md) for the corrected install locations, so the README's install section and `docs/INSTALL.md` stay consistent. Sequence 0005 before 0004.

## Verification

Confirm `.template/bootstrap/skill-quality-standard.md` states the README order and names the three release assets.

Confirm the guidance keeps maintainer commands in a separated section rather than the opening.

Run `npm run validate` to confirm bootstrap files still satisfy template mode. The validator does not inspect prose order, so this check is editorial against the issue's acceptance description.
