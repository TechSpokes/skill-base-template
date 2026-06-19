# 0009: Mirror the descendant's community and sponsorship setup

Issue: none. Requested directly: match the descendant's sponsorship and community settings on the template.

Status: in-progress (implemented on `template-community-and-bootstrap`)

Layer: live repository settings and the `.github/FUNDING.yml` file.

## Problem

The template's community setup diverged from the descendant `skill-postgres-introspection`. The template had Discussions disabled, Projects and Wiki enabled, and a bare `FUNDING.yml`. The descendant had Discussions enabled, Projects and Wiki disabled, and a `FUNDING.yml` with documented platform examples.

## Goal

The template's sponsorship and community configuration matches the descendant, so the template demonstrates the same setup it produces.

## What the descendant has

The descendant's `.github/FUNDING.yml` keeps `github: TechSpokes` and adds commented examples for `open_collective`, `patreon`, `ko_fi`, and a `custom` TechSpokes URL.

The descendant repository has Discussions enabled with the default categories, Projects disabled, and Wiki disabled.

## Steps

Enrich `.github/FUNDING.yml` to match the descendant: keep `github: TechSpokes` and add the commented platform examples.

Apply the live repository settings on `TechSpokes/skill-base-template`: enable Discussions, disable Projects, disable Wiki. These were applied with `gh api repos/TechSpokes/skill-base-template -X PATCH -F has_discussions=true -F has_projects=false -F has_wiki=false`.

## Decisions

The repository settings are outward-facing and were applied with explicit user authorization. The `FUNDING.yml` change is a tracked file and ships in the next release.

Projects and Wiki are disabled to match the descendant's focused setup, not only to enable Discussions. The descendant deliberately keeps both off.

## Verification

Confirm `gh api repos/TechSpokes/skill-base-template` reports `has_discussions` true and `has_projects` and `has_wiki` false.

Confirm `.github/FUNDING.yml` carries the commented platform examples.
