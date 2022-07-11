import { initalizeEditPage, generateLastEdited } from './views';
import { updateNote, removeNote, loadNotes } from './notes';

const noteId = location.hash.substring(1);
const removeButton = document.getElementById('remove');
const dateElement = document.getElementById('last-edited');
const noteTitleInput = document.getElementById('note-title');
const noteBodyInput = document.getElementById('note-body');
initalizeEditPage(noteId);

noteTitleInput.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

noteBodyInput.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    body: e.target.value
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

removeButton.addEventListener('click', () => {
  removeNote(noteId);
  location.assign('./index.html');
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initalizeEditPage(noteId);
  }
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    loadNotes();
    initalizeEditPage(noteId);
  }
});
