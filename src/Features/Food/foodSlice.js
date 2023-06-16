import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axiosURL';

const url = '/fitness/food/';

export const loadAsync = createAsyncThunk(
  'food/loadAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
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

export const addFoodAsync = createAsyncThunk(
	'food/addFoodAsync',
	async (foodData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, foodData);
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

export const updateFoodAsync = createAsyncThunk(
	'food/updateFoodAsync',
  async (food, { rejectWithValue }) => {
    try {
      const response = await axios.put(url, food);
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

export const deleteFoodAsync = createAsyncThunk(
	'food/deleteFoodAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(url + id);
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

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foods: [],
    error: null,
    status: null,
  },
  extraReducers: builder => {
    builder
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foods = action.payload;
      })
      .addCase(addFoodAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.foods.push(action.payload);
      })
      .addCase(updateFoodAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.foods.findIndex(food => food._id === action.meta.arg._id)
        state.foods[index] = action.meta.arg;
      })
      .addCase(deleteFoodAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.foods.findIndex(food => food._id === action.meta.arg)
        state.foods.splice(index, 1);
      })
      .addMatcher(isAnyOf (
        loadAsync.rejected,
        addFoodAsync.rejected,
        updateFoodAsync.rejected,
        deleteFoodAsync.rejected
        ), (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
  },
});


export default foodSlice.reducer;

export const selectFoods = state => state.foods.foods;
export const selectError = state => state.foods.error;
