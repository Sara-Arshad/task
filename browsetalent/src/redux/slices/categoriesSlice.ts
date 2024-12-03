import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string | number;
  name: string;
  image: string;
  price: string;
  service: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError } = categorySlice.actions;
export default categorySlice.reducer;
