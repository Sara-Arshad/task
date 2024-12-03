import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Freelancer {
  id: string | number;
  name: string;
  profilePicture: string;
  rating: number;
  reviews: number;
  skills: string[];
  location: string;
  language: string;
  hourlyRate: string;
  jobSuccess: number;
  trending: boolean;
  category: string;
  service: string;
}

interface FreelancerState {
  freelancers: Freelancer[];
  loading: boolean;
  error: string | null;
}

const initialState: FreelancerState = {
  freelancers: [],
  loading: false,
  error: null,
};

const freelancerSlice = createSlice({
  name: "freelancers",
  initialState,
  reducers: {
    setFreelancers(state, action: PayloadAction<Freelancer[]>) {
      state.freelancers = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setFreelancers, setLoading, setError } = freelancerSlice.actions;
export default freelancerSlice.reducer;
