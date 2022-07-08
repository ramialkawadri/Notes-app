'use strict';

// Read existing notes from local sotrage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (_) {
    return [];
  }
};

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

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
  noteEl.setAttribute('href', `/edit.html#${note.id}`);
  noteEl.classList.add('list-item');

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add('list-item__subtitle');
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Saves the notes to local storage
const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortBy === 'alphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      else return 0;
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const notesEl = document.getElementById('notes');
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

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;
