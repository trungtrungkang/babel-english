# Working on Babel Online

## Product intent
- Build a companion to Babel's in-person programme; Speaking first.
- Keep the implementation appropriate to the current milestone. v0.1 is a local product prototype, not a production LMS.
- Use Vietnamese for project discussions/docs, with English in learning content and bilingual product UI.
- Prioritize the learner's actual speaking, useful teacher feedback and independent recall over scores or time-on-screen.

## Development
- Read README.md and the relevant docs before changing scope.
- Run `npm run check` and `npm test` for changes to learning progression, content versioning, submission or storage rules.
- No dependencies are currently required. Introduce a framework/service only with a recorded reason and a migration plan.
- Keep learning data/rules in src/domain.js and persistence behind src/storage.js. UI is in src/app.js.
- Escape user-edited content when rendering HTML. Never serve arbitrary project files.
- Do not fabricate assessment scores, completed work, learners, analytics or AI capabilities.
- Keep preview-only completion distinct from submitted work. Completion is not mastery.
- Do not put real children's data into fixtures, source control, screenshots or external services.
- Do not add analytics, paid APIs, public deployment or secrets silently.
- Stop active audio tracks when recording ends; handle denial, unsupported browsers and persistence failures visibly.
- Update docs/08-decisions.md for architectural changes; docs/05-roadmap-backlog.md for scope; docs/09-qa.md with actual verification and limitations.
- Preserve ongoing attempts' content versions when a lesson is published.
- Keep commits and changes bounded; do not modify unrelated projects.
