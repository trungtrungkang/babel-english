export const STORAGE_KEY = 'babel-online.demo.v1';
export const steps = ['watch', 'listen', 'repeat', 'practice', 'answer', 'check', 'complete'];
export const seedLesson = {
  id: 'speaking-shop-01', version: 1, skill: 'speaking', level: 'Babel Explorers 1',
  title: 'At the ice cream shop',
  objective: { vi: 'Tự gọi món kem yêu thích bằng tiếng Anh.', en: 'Order your favourite ice cream in English.' },
  videoUrl: '',
  lines: ['Hello! What would you like?', 'Can I have a chocolate ice cream, please?', 'Of course! Here you are.', 'Thank you!'],
  prompt: 'What would you like?',
};
export function initialState() {
  return { schemaVersion: 1, lang: 'vi', lesson: structuredClone(seedLesson), draft: null, attempt: null, submission: null, feedback: null, walkthrough: false };
}
export function newAttempt(lesson) {
  return { lessonId: lesson.id, lessonVersion: lesson.version, lesson: structuredClone(lesson), step: 0, startedAt: new Date().toISOString(), completedSteps: [], hintUsed: false };
}
export function advanceAttempt(attempt) {
  return { ...attempt, completedSteps: [...new Set([...attempt.completedSteps, steps[attempt.step]])], step: Math.min(5, attempt.step + 1) };
}
export function createSubmission(attempt, recording, now = new Date().toISOString()) {
  if (!recording?.size || !recording?.id) throw new Error('recording-required');
  if (attempt.step !== 5) throw new Error('assessment-required');
  return { id: `submission-${Date.now()}`, lessonId: attempt.lessonId, lessonVersion: attempt.lessonVersion, lesson: structuredClone(attempt.lesson), recordingId: recording.id, duration: recording.duration, submittedAt: now, completion: 'submitted', mastery: 'pending', hintUsed: attempt.hintUsed };
}
export function validateLesson(lesson) {
  if (!lesson.title?.trim() || lesson.title.length > 120) return 'title';
  if (!lesson.objective?.vi?.trim() || !lesson.objective?.en?.trim()) return 'objective';
  if (!Array.isArray(lesson.lines) || lesson.lines.length < 2 || lesson.lines.length > 8 || lesson.lines.some(x => typeof x !== 'string' || !x.trim() || x.length > 250)) return 'lines';
  if (!lesson.prompt?.trim() || lesson.prompt.length > 250) return 'prompt';
  if (lesson.videoUrl) {
    try { if (new URL(lesson.videoUrl).protocol !== 'https:') return 'video'; } catch { return 'video'; }
  }
  return null;
}
export function completionPercent(state) {
  if (state.submission) return 100;
  return state.attempt ? Math.round(state.attempt.completedSteps.length / 6 * 100) : 0;
}
