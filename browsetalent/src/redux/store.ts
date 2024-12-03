// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import freelancerReducer from "./slices/freelauncerSlice";
import categoryReducer from "./slices/categoriesSlice";
import filterSlice from "./slices/filterSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    freelancers: freelancerReducer,
    categories: categoryReducer,
    filters: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
