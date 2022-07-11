import moment from 'moment';
import { getFilters } from './filters';
import { getNotes, sortNotes } from './notes';

// Generate the DOM structure for a note
const generateNoteDom = (note) => {
  const noteEl = document.createElement('a');
  const textEl = document.createElement('p');
  const statusEl = document.createElement('p');

  // Setting the note title text
  if (!note.title.length) {
    textEl.textContent = 'Unnamed node';
  } else {
    textEl.textContent = note.title;
  }
  textEl.classList.add('list-item__title');
  noteEl.appendChild(textEl);

  // Setup the link
  noteEl.setAttribute('href', `./edit.html#${note.id}`);
  noteEl.classList.add('list-item');

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add('list-item__subtitle');
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const notesEl = document.getElementById('notes');
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

 
  notesEl.innerHTML = '';

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDom(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes to show';
    emptyMessage.classList.add('empty-message');
    notesEl.appendChild(emptyMessage);
  }
};

const initalizeEditPage = (noteId) => {
  const noteTitleInput = document.getElementById('note-title');
  const noteBodyInput = document.getElementById('note-body');
  const dateElement = document.getElementById('last-edited');
  const notes = getNotes();
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    location.assign('./index.html');
  }
  noteTitleInput.value = note.title;
  noteBodyInput.value = note.body;
  dateElement.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDom, renderNotes, generateLastEdited, initalizeEditPage };