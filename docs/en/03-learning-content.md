# Learning and content design

## Sample lesson

ID: speaking-shop-01. Assumed age: 8–11. Topic: buying ice cream. Observable goal: independently make a polite order that a listener can understand.

| Stage | Task | Support | Evidence |
|---|---|---|---|
| Watch | Understand the situation | Video or sample dialogue | No proficiency judgement |
| Listen | Hear each turn | Full text and model voice | No proficiency judgement |
| Repeat | Repeat a request | Full model | Temporary practice recording |
| Practise | Change the flavour | Sentence frame | Supported use |
| Answer | Respond to Bo | Optional hint | Track hint use |
| Check | Place an order independently | No answer text | Final teacher-review recording |
| Complete | Acknowledge submission | Feedback after review | Completion separate from mastery |

Synthetic speech tests functionality only. Natural pronunciation, stress and intonation need approved Babel models.

## Proposed pilot rubric

Not yet agreed. Rate each criterion as needs support / developing / independent:

1. Meaning: understands the question and orders the intended item.
2. Intelligibility: understandable without excessive guessing; a native accent is not required.
3. Fluency: appropriate chunks and pauses for the level.
4. Stress and intonation: focus on features taught in this lesson.
5. Independence: succeeds with reduced support and changed details.

Version 0.1 has only an overall achieved/needs-practice choice and a free-text comment. A multi-criterion rubric belongs to P1.

## Preparing Babel materials

For each lesson provide a stable ID, title, suitable age range, level, goals, skills, target language, media, transcript, model answers, prompts, acceptable responses, hints, rubric, completion conditions, author/reviewer, media rights and version.

Age and level are separate fields. Titles are not identifiers.

## Target content model

Programme → Level → Unit → Lesson → Activity.

An activity includes type, skill tags, goal IDs, VI/EN instructions, media references, prompt, response type, scaffolding and assessment policy. Initial types: video, listen-repeat, substitution, prompted-response and speaking-assessment. Later types: listening-choice, vocabulary-recall, reading-response and writing-response.

Reuse a video across activities. Link assessment evidence to skill goals, not just lessons.

Example target data, not the implemented schema:

```json
{
  "id": "shop-order-independent",
  "type": "prompted-response",
  "skillTags": ["speaking"],
  "objectiveIds": ["order-food-politely"],
  "instructions": {"vi": "Gọi món con muốn.", "en": "Order what you would like."},
  "responseType": "audio",
  "assessmentPolicy": {"reviewer": "teacher", "rubricId": "speaking-beginner-v1"}
}
```

## Authoring process

Choose a goal → select an activity template → add materials → preview as a learner → pedagogical review → publish a version → observe difficulties → revise in a new draft.

Assignments and submissions retain the relevant content and rubric versions. New edits must not reinterpret old results.
