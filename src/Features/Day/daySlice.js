import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axiosURL';

const urlSingular = '/fitness/day/';
const urlPlural = '/fitness/days/';

export const loadAsync = createAsyncThunk(
  'day/loadAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(urlPlural + id);
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

export const addDayAsync = createAsyncThunk(
	'day/addDay',
	async (dayData, { rejectWithValue }) => {
    try {
      const response = await axios.post(urlSingular, dayData);
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

export const updateDayAsync = createAsyncThunk(
	'day/updateDay',
  async (day, { rejectWithValue }) => {
    try {
      const response = await axios.put(urlSingular, day);
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

export const deleteDayAsync = createAsyncThunk(
	'day/deleteDay',
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

const daySlice = createSlice({
  name: 'day',
  initialState: {
    days: [],
    error: null,
    status: null,
  },
  extraReducers: builder => {
    builder
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.days = action.payload;
      })
      .addCase(addDayAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        console.log(action.payload);
        state.days.push(action.payload);
      })
      .addCase(updateDayAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        console.log(action);
        const index = state.days.findIndex(day => day._id === action.payload._id)
        state.days[index] = action.payload;
      })
      .addCase(deleteDayAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        const index = state.days.findIndex(day => day._id === action.meta.arg)
        state.days.splice(index, 1);
      })
      .addMatcher(isAnyOf (
        loadAsync.rejected,
        addDayAsync.rejected,
        updateDayAsync.rejected,
        deleteDayAsync.rejected
        ), (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
  },
});


export default daySlice.reducer;

export const selectDay = state => state.day.days;
export const selectError = state => state.day.error;
