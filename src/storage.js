import { STORAGE_KEY, initialState, validateLesson } from './domain.js';
export function loadState() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!value || value.schemaVersion !== 1 || validateLesson(value.lesson)) return initialState();
    return { ...initialState(), ...value, lang: value.lang === 'en' ? 'en' : 'vi' };
  } catch { return initialState(); }
}
export function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
let database;
function db() {
  if (!database) database = new Promise((resolve, reject) => {
    const request = indexedDB.open('babel-online-audio', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('recordings', { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return database;
}
async function transaction(mode, action) {
  const database = await db();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('recordings', mode);
    const request = action(tx.objectStore('recordings'));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}
export const getRecording = id => transaction('readonly', store => store.get(id));
export const putRecording = recording => transaction('readwrite', store => store.put(recording));
export const clearRecordings = () => transaction('readwrite', store => store.clear());
