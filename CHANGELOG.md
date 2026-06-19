# Changelog

## [Unreleased]

- No unreleased changes.

## [v1.3.0]

- Add documented sponsorship platform examples to `.github/FUNDING.yml`.
- Enable Discussions and disable Projects and Wiki on the template repository.
- Require a core-principles-and-decision-stance section in the generated `AGENTS.md`, so the skill's goals and values reach future agents that make local decisions.
- Add an alignment-confirmation step to the exploratory phase: after the build readiness gate and before construction, the agent confirms its synthesized understanding with the user, distinct from the resolution ladder's `Ask` rung.
- Gate Phase 3 construction on the confirmed design synthesis in the bootstrap workflow, and add the matching must-follow rule to `AGENTS.md`.
- Reframe the bootstrap instruction files to address the executing agent directly, keeping authorship attribution in `docs/PROVENANCE.md`.
- Document `.plans/` and `.skill-template-feedback/` in the repository-shape trees and the Phase 7 cleanup steps for consistency.
- Distill the AGENTS.md and README authoring guidance into the bootstrap docs: the generated `AGENTS.md` section shape, read-depth and under-100-line size guidance, and README required elements, anti-patterns, and sizing.
- Add cross-intelligence transport principles to the reasoning model: one-way delivery, the weakest stage, goal survival, distortion, boundary-specific design, and deliberate redundancy.
- Add an "Asking High-Value Questions" guide to the exploratory phase and a `Script Rules` section for commenting any scripts a generated skill ships.

## [v1.2.0]

- Pin the generated CI and release workflows to `actions/checkout@v7` and `actions/setup-node@v6`, and use a `v0.0.0` placeholder for the packaging smoke test, so new repositories do not start a major behind or read the smoke-test tag as a real version.
- Correct the standalone install locations in `docs/INSTALL.md` to lead with the cross-tool `.agents/skills/` and drop the incorrect `.codex/skills/`.
- Skip `.gitkeep` and prune empty directories when packaging, so release ZIPs no longer ship an empty `assets/` folder.
- Add `license` to both plugin manifests and a top-level `displayName` to the Claude manifest, and enforce both in validation.
- Add bootstrap guidance for a value-first generated README that leads with the value proposition and install-from-release.
- Add a repository hardening step to bootstrap cleanup with branch-protection and security `gh` commands, and make `docs/RELEASING.md` the single source for how changes land and how a release is cut.
- Document the branch-and-pull-request flow for template releases and replace hardcoded `v0.1.0` release examples with `vX.Y.Z`.
- Scaffold a `.skill-template-feedback/` folder in generated repositories to route template gaps back upstream, and delete the template's own `.plans/` backlog during cleanup.

## [v1.1.0]

- Add Phase 0 intake adequacy and resolution workflow before skill construction.
- Add bootstrap guidance for empty, weak, conflicting, exploratory, overbroad, tool-dependent, and high-risk intake.
- Add a build readiness gate that blocks `src/SKILL.md` construction until critical dimensions are supported.
- Add resolution paths for extraction, inference, discovery, experiments, scope narrowing, human clarification, and stop decisions.
- Document pitfalls for research sprawl, premature construction, questionnaire transfer, false certainty, overfitting, unsafe discovery, and scope inflation.
- Add template draft release workflow and separate template release documentation for `v*.*.*` tags.
- Update quickstart, bootstrap workflow, architecture, intake, and agent instructions to support starting from a short skill idea.

## [v1.0.0]

- Prepare public Skill Base Template release.
- Add intake-driven bootstrap workflow for generating standalone skill repositories.
- Add distilled TechSpokes guidance for cross-intelligence communication and agent-readable instructions.
- Add validation and packaging scripts for skill frontmatter, manifests, references, and workflow mode.
- Add template-safe CI and generated skill workflow templates.
- Add GitHub issue, discussion, pull request, funding, support, security, and contribution files.
- Add documentation for repository architecture, release packaging, bootstrap cleanup, provenance, and generated repository maintenance.

## [v0.1.0]

- Add bootstrap template scaffold for intake-driven skill repository generation.
