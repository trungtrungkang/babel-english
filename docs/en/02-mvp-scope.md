# Demo and pilot scope

## Two distinct milestones

**D0 — Interactive demo:** test the idea, learning journey and initial reactions. One device, one sample learner, six lessons across two units. This is the current version.

**P1 — Pilot MVP:** support a small group of real learners. Requires a backend, sign-in, access controls, private storage, Babel materials and a workable teacher process. This is not yet delivered.

## Available in D0

| Area | Capability |
|---|---|
| Learner | Home screen, sample lesson, resume current step |
| Speaking | Watch, listen, repeat, practise, answer, check and completion screen |
| Recording | Record, replay, re-record; store the final submission in the browser |
| Progress | Track activity completion without presenting it as proficiency |
| Teacher | View one sample learner, listen, assess the goal and leave feedback |
| Parent | View the lesson, submission and teacher feedback |
| Content | Edit the sample, save a draft, publish a new version, optionally add a direct video URL |
| Language | Vietnamese and English interface and project documentation |
| Demonstration | Preview completion without creating a submission; reset with confirmation |

## Not included

Real authentication, access controls, device synchronisation, class assignments, multiple learners/classes, submission history, Babel video production, AI scoring, automatic review scheduling, arbitrary lesson creation, server media uploads, payments, live video classes and parent notifications.

This demo does not prove educational effectiveness or production capacity.

## Demo acceptance criteria

- Complete the journey using mouse or keyboard; resume progress and language after reloading.
- Require a final recording to submit; previewing must not create a submission.
- On a supported browser with permission, record and replay from teacher/parent views on the same origin.
- Report microphone, storage and video errors without blaming the learner.
- Keep completion separate from achievement; show teacher feedback to parents.
- Drafts do not change published lessons; publication does not mutate an ongoing attempt.
- No real children’s personal data or API keys in source.
- Check desktop and mobile layouts and document untested devices.

## Minimum P1 scope

- Accounts, guardian–child links and server-enforced permissions.
- One level with approximately 10–15 approved lessons; pilot size agreed after discovery.
- Class/individual assignments, deadlines and a teacher review queue.
- Private recordings, expiring access URLs, upload retries and clear processing status.
- Teacher rubrics, evidence of proficiency and attempt history.
- Content templates with draft, preview, approval and publication versions.
- Device testing, backup/restore and a support process.
- Agreed consent, retention, deletion and supplier policies before using children’s data.

AI is not required to run the pilot. Evaluate it separately before exposing feedback to children.
