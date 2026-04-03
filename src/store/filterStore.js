import { create } from 'zustand';
const initialState = {
  keyword: '',
  kindFilter: 'all',
  categoryFilter: 'all',
  fromDate: null,
  toDate: null,
  sortField: 'date',
  sortDirection: 'desc'
};

/** Zustand store for transaction filtering and sorting — no persistence */
export const useFilterStore = create()(set => ({
  ...initialState,
  setKeyword: keyword => set({
    keyword
  }),
  setKindFilter: kindFilter => set({
    kindFilter
  }),
  setCategoryFilter: categoryFilter => set({
    categoryFilter
  }),
  setFromDate: fromDate => set({
    fromDate
  }),
  setToDate: toDate => set({
    toDate
  }),
  setSortField: sortField => set({
    sortField
  }),
  setSortDirection: sortDirection => set({
    sortDirection
  }),
  clearAllFilters: () => set(initialState)
}));