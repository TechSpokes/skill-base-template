# Intake

Place all user-provided source material or skill ideas in this folder.

## Rules

- Add raw notes, examples, transcripts, PDFs, source docs, images, and rough instructions here.
- Add `goal.md` when you only have a skill idea or want the agent to explore what intake is needed.
- Do not edit `src/`, `docs/`, `packaging/`, `.github/`, or `.template/` during bootstrap.
- Do not assume the intake needs to be organized perfectly.
- Remove secrets and private credentials before committing intake material.

## How Agents Use This Folder

Agents treat this folder as source material. They infer the intended skill, extract durable knowledge, build `src/SKILL.md`, create references, update documentation, and prepare release packaging.

Agents may create `research/`, `experiments/`, and `playground/` subfolders here to hold evidence gathered while resolving gaps.

Intake files are never release artifacts. They may be transformed into skill references when the content is useful and safe to publish.

When this folder is empty or insufficient, agents should assess what is missing before skill construction. They may resolve gaps by extracting evidence, making low-risk assumptions, inspecting local tools or docs, creating disposable experiments, narrowing scope, asking concise questions, or stopping before build work when construction would require fabrication.
