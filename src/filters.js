const filters = {
  searchText: '',
  sortBy: 'byEdited',
};

const getFilters = () => filters;

const setFilters = (updates) => {
  if (typeof updates.serachText === 'string') 
    filters.searchText = updates.serachText;

  if (typeof updates.sortBy === 'string') 
    filters.sortBy = updates.sortBy;
};

export { getFilters, setFilters };