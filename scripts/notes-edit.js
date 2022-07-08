'use strict';

const noteId = location.hash.substring(1);
const noteTitleInput = document.getElementById('note-title');
const noteBodyInput = document.getElementById('note-body');
const removeButton = document.getElementById('remove');
const dateElement = document.getElementById('last-edited');

let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign('./index.html');
}
noteTitleInput.value = note.title;
noteBodyInput.value = note.body;

noteTitleInput.addEventListener('input', () => {
  note.title = noteTitleInput.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

noteBodyInput.addEventListener('input', () => {
  note.body = noteBodyInput.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

removeButton.addEventListener('click', () => {
  removeNote(note.id);
  location.assign('./index.html');
  saveNotes(notes);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    let note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign('./index.html');
    }
    noteTitleInput.value = note.title;
    noteBodyInput.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});

dateElement.textContent = generateLastEdited(note.updatedAt);
