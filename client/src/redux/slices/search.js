// searchSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  searchResults: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setSearchResults: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.searchResults = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setLoading, setError, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
