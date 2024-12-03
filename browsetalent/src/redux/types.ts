// src/redux/types.ts

import { Category } from "./slices/categoriesSlice";
import { Freelancer } from "./slices/freelauncerSlice";
export interface AppState {
  freelancers: {
    freelancers: Freelancer[];
    loading: boolean;
    error: string | null;
  };
  categories: {
    categories: Category[];
    loading: boolean;
    error: string | null;
  };
}
