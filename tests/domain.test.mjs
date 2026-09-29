import test from 'node:test';
import assert from 'node:assert/strict';
import { seedLesson, initialState, newAttempt, advanceAttempt, createSubmission, validateLesson, completionPercent } from '../src/domain.js';

test('publication cannot mutate an ongoing attempt or submitted content', () => {
 const content=structuredClone(seedLesson);
 let attempt=newAttempt(content);
 content.title='Changed'; content.lines[1]='Changed dialogue'; content.version=2;
 assert.equal(attempt.lesson.title,seedLesson.title);
 assert.equal(attempt.lessonVersion,1);
 attempt.step=5;
 const submission=createSubmission(attempt,{id:'audio-1',size:100,duration:3});
 attempt.lesson.lines[1]='Later change';
 assert.equal(submission.lesson.lines[1],seedLesson.lines[1]);
 assert.equal(submission.mastery,'pending');
});

test('a final recording is required and completion is not mastery',()=>{
 const attempt=newAttempt(seedLesson);
 assert.throws(()=>createSubmission(attempt,null),/recording-required/);
 assert.throws(()=>createSubmission(attempt,{id:'x',size:100}),/assessment-required/);
 attempt.step=5;
 assert.throws(()=>createSubmission(attempt,{id:'x',size:0}),/recording-required/);
 const s=createSubmission(attempt,{id:'x',size:100,duration:5});
 assert.equal(s.completion,'submitted'); assert.equal(s.mastery,'pending');
});

test('moving backwards and forwards does not double-count progress',()=>{
 let attempt=newAttempt(seedLesson);
 attempt=advanceAttempt(attempt); attempt.step=0; attempt=advanceAttempt(attempt);
 assert.deepEqual(attempt.completedSteps,['watch']);
 for(let i=0;i<4;i++) attempt=advanceAttempt(attempt);
 const state=initialState(); state.attempt=attempt;
 assert.equal(attempt.step,5); assert.equal(completionPercent(state),83);
 assert.equal(state.submission,null);
 state.submission=createSubmission(attempt,{id:'x',size:100,duration:5});
 assert.equal(completionPercent(state),100);
});

test('content validates URL protocol, mandatory goals and dialogue limits',()=>{
 assert.equal(validateLesson(seedLesson),null);
 assert.equal(validateLesson({...seedLesson,videoUrl:'javascript:alert(1)'}),'video');
 assert.equal(validateLesson({...seedLesson,videoUrl:'http://example.com/a.mp4'}),'video');
 assert.equal(validateLesson({...seedLesson,videoUrl:'https://example.com/a.mp4'}),null);
 assert.equal(validateLesson({...seedLesson,lines:['only one']}),'lines');
 assert.equal(validateLesson({...seedLesson,objective:{vi:'',en:'goal'}}),'objective');
 assert.equal(validateLesson({...seedLesson,title:' '}),'title');
});

import { seedLessons, selectLesson, lessonRecord, migrateState, practiceSentence, snapshotCurrent } from '../src/domain.js';
test('switching lessons preserves independent attempts, submissions, drafts and feedback',()=>{
 let state=initialState(); state.attempt=newAttempt(state.lesson); state.attempt.step=5;
 state.submission=createSubmission(state.attempt,{id:'audio-a',size:123,duration:4});
 state.feedback={mastery:'achieved',comment:'Clear request'}; state.draft={...state.lesson,title:'Draft A'};
 state=selectLesson(state,seedLessons[1].id);
 assert.equal(state.submission,null); assert.equal(state.feedback,null); assert.equal(state.draft,null);
 state.attempt=advanceAttempt(newAttempt(state.lesson));
 state=selectLesson(state,seedLessons[0].id);
 assert.equal(state.submission.recordingId,'audio-a'); assert.equal(state.feedback.comment,'Clear request');
 assert.equal(state.draft.title,'Draft A'); assert.equal(lessonRecord(state,seedLessons[1].id).attempt.step,1);
 const restored=migrateState(JSON.parse(JSON.stringify(snapshotCurrent(state))));
 assert.equal(selectLesson(restored,seedLessons[1].id).attempt.step,1);
});
test('legacy data retains edited content, progress and audio references when adding lessons',()=>{
 const old={...initialState(),schemaVersion:1,records:undefined};
 old.lesson.title='My custom title';old.attempt=newAttempt(old.lesson);old.attempt.step=5;
 old.submission=createSubmission(old.attempt,{id:'legacy-audio',size:10,duration:2});
 delete old.lesson.practice;delete old.attempt.lesson.practice;
 const updated=migrateState(old);
 assert.equal(updated.schemaVersion,2);assert.equal(updated.lesson.title,'My custom title');
 assert.equal(updated.submission.recordingId,'legacy-audio');assert.ok(updated.attempt.lesson.practice);
 assert.equal(selectLesson(updated,seedLessons[5].id).lesson.title,'My favourite day');
});
test('all six lessons have valid distinct content, practice choices and bilingual scaffolding',()=>{
 assert.equal(new Set(seedLessons.map(l=>l.id)).size,6);
 for(const lesson of seedLessons){assert.equal(validateLesson(lesson),null);assert.ok(lesson.challenge.vi&&lesson.challenge.en&&lesson.focus.vi&&lesson.focus.en);for(const choice of lesson.practice.choices){const sentence=practiceSentence(lesson,choice);assert.ok(sentence.includes(choice));assert.ok(!sentence.includes('{choice}'));}}
 assert.equal(seedLessons.filter(l=>l.review).length,2);
});

import { updateTask, buildReview, unitDesign } from '../src/domain.js';
test('task choices persist separately and submitted evidence is immutable',()=>{
 let state=initialState(); state.attempt=updateTask(newAttempt(state.lesson),{support:'keywords',turn:2});
 state=selectLesson(state,seedLessons[2].id);state.attempt=updateTask(newAttempt(state.lesson),{story:[2,0,1],support:'none'});
 state.attempt.step=5;const submission=createSubmission(state.attempt,{id:'story-audio',size:20,duration:4});
 state.attempt.task.story.reverse();assert.deepEqual(submission.practiceEvidence.story,[2,0,1]);
 state=selectLesson(state,seedLessons[0].id);assert.equal(state.attempt.task.turn,2);assert.equal(state.attempt.task.support,'keywords');
 assert.equal(state.submission,null);assert.equal(state.feedback,null);
});
test('self-tracking does not imply submission or achievement',()=>{
 const state=initialState();state.attempt=updateTask(newAttempt(seedLessons[1]),{said:[0,1]});
 assert.equal(completionPercent(state),0);assert.equal(state.submission,null);assert.equal(state.feedback,null);
 assert.throws(()=>updateTask(state.attempt,{story:[0,0]}),/invalid-story/);
 assert.throws(()=>updateTask(state.attempt,{support:'automatic'}),/invalid-support/);
});
test('teacher review requires all three explicit criteria',()=>{
 assert.throws(()=>buildReview({mastery:'achieved',comment:'Good'},'s1'),/criteria-required/);
 const review=buildReview({mastery:'practice',comment:' Clear words; try without the model. ',meaning:'independent',clarity:'developing',independence:'support'},'s1');
 assert.equal(review.mastery,'practice');assert.equal(review.criteria.independence,'support');assert.equal(review.submissionId,'s1');
 assert.equal(review.comment,'Clear words; try without the model.');
});
test('only the three review-unit lessons have detailed editorial designs',()=>{
 assert.deepEqual(Object.values(unitDesign).map(d=>d.type),['roleplay','shopping','story']);
 for(const d of Object.values(unitDesign))for(const key of ['label','canDo','prerequisite','evidence','classroom']) assert.ok(d[key].vi && d[key].en);
});
