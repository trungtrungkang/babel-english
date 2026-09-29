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
