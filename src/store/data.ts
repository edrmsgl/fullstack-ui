import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type AgeGroup = {
  id: number;
  name: string;
  description: string;
  picture: string;
  ageRange: string;
  students: number[];
  instructors: number[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

type Student = {
  id: number;
  name: string;
};

type Instructor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  ageGroup: string;
  picture: string;
};

type DataState = {
  ageGroups: AgeGroup[];
  students: Student[];
  instructors: Instructor[];
  loading: boolean;
  error: string | null;
};

const initialState: DataState = {
  ageGroups: [],
  students: [],
  instructors: [],
  loading: false,
  error: null,
};

export const fetchAllData = createAsyncThunk('data/fetchAll', async () => {
  const [ageGroups, students, instructors] = await Promise.all([
    axios.get('/api/age-groups'),
    axios.get('/api/students'),
    axios.get('/api/instructors'),
  ]);
  return {
    ageGroups: ageGroups.data,
    students: students.data,
    instructors: instructors.data,
  };
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.ageGroups = action.payload.ageGroups;
        state.students = action.payload.students;
        state.instructors = action.payload.instructors;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Hata';
      });
  },
});

export default dataSlice.reducer;