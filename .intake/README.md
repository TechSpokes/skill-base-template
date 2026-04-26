# Intake

Place all user-provided source material for the skill in this folder.

## Rules

- Add raw notes, examples, transcripts, PDFs, source docs, images, and rough instructions here.
- Do not edit `src/`, `docs/`, `packaging/`, `.github/`, or `.template/` during bootstrap.
- Do not assume the intake needs to be organized perfectly.
- Remove secrets and private credentials before committing intake material.

## How Agents Use This Folder

Agents treat this folder as source material. They infer the intended skill, extract durable knowledge, build `src/SKILL.md`, create references, update documentation, and prepare release packaging.

Intake files are never release artifacts. They may be transformed into skill references when the content is useful and safe to publish.
