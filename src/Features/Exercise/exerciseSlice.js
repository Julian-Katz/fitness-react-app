import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axiosURL';

const urlSingular = '/fitness/exercise/';
const urlPlural = '/fitness/exercises/';

export const loadAsync = createAsyncThunk(
  'exercise/loadAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(urlPlural);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
	}
);

export const addExerciseAsync = createAsyncThunk(
	'exercise/addExercise',
	async (exerciseData, { rejectWithValue }) => {
    try {
      const response = await axios.post(urlSingular, exerciseData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
	}
);

export const updateExerciseAsync = createAsyncThunk(
	'exercise/updateExercise',
  async (exercise, { rejectWithValue }) => {
    try {
      const response = await axios.put(urlSingular, exercise);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
	}
);

export const deleteExerciseAsync = createAsyncThunk(
	'exercise/deleteExercise',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(urlSingular + id);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
	}
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: [],
    error: null,
    status: null,
  },
  extraReducers: builder => {
    builder
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exercises = action.payload;
      })
      .addCase(addExerciseAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.exercises.push(action.payload);
      })
      .addCase(updateExerciseAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.exercises.findIndex(exercise => exercise._id === action.meta.arg._id)
        state.exercises[index] = action.meta.arg;
      })
      .addCase(deleteExerciseAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.exercises.findIndex(exercise => exercise._id === action.meta.arg)
        state.exercises.splice(index, 1);
      })
      .addMatcher(isAnyOf (
        loadAsync.rejected,
        addExerciseAsync.rejected,
        updateExerciseAsync.rejected,
        deleteExerciseAsync.rejected
        ), (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
  },
});


export default exerciseSlice.reducer;

export const selectExercises = state => state.exercise.exercises;
export const selectError = state => state.exercise.error;
