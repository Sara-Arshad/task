import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  location: string;
  language: string;
  skills: string;
  price: number;
}

const initialState: FilterState = {
  location: "All",
  language: "All",
  skills: "All",
  price: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocationFilter(state, action: PayloadAction<string | null | undefined>) {
      state.location = action.payload?.trim() || "All";
    },
    setLanguageFilter(state, action: PayloadAction<string | null | undefined>) {
      state.language = action.payload?.trim() || "All";
    },
    setSkillsFilter(state, action: PayloadAction<string | null | undefined>) {
      state.skills = action.payload?.trim() || "All";
    },
    setPriceFilter(state, action: PayloadAction<number | null | undefined>) {
      state.price = action.payload ?? 0;
    },
  },
});

export const {
  setLocationFilter,
  setLanguageFilter,
  setSkillsFilter,
  setPriceFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
