# Architecture and expansion

## Current D0 implementation

Static web app using JavaScript modules and responsive CSS. A small Node server serves an explicit allowlist of files on localhost. No installed runtime dependencies are required. This keeps discovery inexpensive before choosing a production stack.

- domain.js: sample content, attempt snapshots, progression, validation and submission rules.
- storage.js: localStorage metadata and IndexedDB recording blobs.
- app.js: screens, UI controller, speech synthesis and MediaRecorder.
- server.mjs: public file allowlist, localhost only, GET/HEAD only.

This is not a production backend. The UI currently re-renders from state; components/controllers can be separated as scope grows. Reusing every line of prototype UI code is not a goal.

## Stable foundations

Preserve identifiers, completion versus mastery, lesson versions, activity types, rubrics and data contracts. Keep persistence behind an adapter so a future API does not become entangled with learning rules.

## Proposed P1 architecture

Responsive web app → modular application API → relational database.

Private audio/video storage → controlled delivery and expiring access URLs.

Completed uploads → job queue → optional audio processing → assessment or teacher review.

Start with one backend divided into identity/enrolment, curriculum/content, assignment/attempt, assessment and reporting modules. Microservices are unnecessary initially. Select vendors after budget, scale and data requirements are understood.

## Target entities

| Entity | Purpose |
|---|---|
| User, Role, GuardianLink | Identity, permissions and parent–child relationship |
| Class, Enrolment | Teachers and learners in classes |
| Programme, Level, Unit | Curriculum structure |
| Lesson, LessonVersion, Activity | Content and immutable versions |
| Asset | Media, transcript and usage rights |
| Assignment | Recipient, due date and content version |
| Attempt, Response | Work, answers, time and hint use |
| Rubric, Assessment, Feedback | Criteria, judgement, reviewer and comments |
| SkillObjective, MasteryEvidence | Learning goals and evidence |

## States

Learning: not started → in progress → submitted → reviewed.

Mastery: unknown/pending → achieved or needs practice. Submission must not imply achievement.

Upload: local → uploading → stored or failed. Show submission success only after server confirmation; idempotency keys prevent duplicate submissions during retries.

## Access controls for P1

Learners access their own permitted work. Parents access linked children. Teachers access assigned classes. Content managers have distinct editing/publication rights with audit records.

Enforce these rules in APIs and audio access, not just by hiding buttons. Test cross-account access before a pilot.

## Media and operations

Validate codecs/devices and duration/size limits; retry interrupted uploads. Keep children’s recordings out of public buckets. Do not send recordings to AI by default. Evaluate supplier policies and quality using authorised samples first.

Agree retention, deletion and backup/restore processes with Babel. Track recording/upload errors, video latency, processing minutes and teacher review time. Set capacity tests from expected class numbers and peak usage rather than invented targets.

## Adding skills

Add activity types and evaluators while reusing identity, enrolment, assets, assignments, attempts and reporting. Testing is an assessment policy and organisation layer that may span skills. Online-only enrolment, placement, support and payments follow after core learning works.

## Migration from D0 to P1

1. Validate the content schema and rubric with 3–5 real lessons.
2. Select the production framework/backend and record the decision.
3. Replace browser storage with APIs and server permissions.
4. Migrate approved materials, not prototype recordings by default.
5. Prepare staging and device, security and recovery testing.
6. Pilot at small scale before expanding classes.
