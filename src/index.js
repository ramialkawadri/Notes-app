import { createNote, loadNotes } from './notes';
import { setFilters } from './filters';
import { renderNotes } from "./views";

renderNotes();

document.getElementById('create-note').addEventListener('click', () => {
  const id = createNote();
  location.assign(`./edit.html#${id}`);
});

document.getElementById('search-text').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderNotes();
});

document.getElementById('filter-by').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value,
  });
  renderNotes();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    renderNotes();
  }
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    loadNotes();
    renderNotes();
  }
});
