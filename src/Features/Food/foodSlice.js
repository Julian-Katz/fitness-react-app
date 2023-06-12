import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosURL';

export const loadAsync = createAsyncThunk('food/loadAsync',
  async () => {
  const response = await axios.get('/fitness/food/');
  return response.data;
});

export const addFoodAsync = createAsyncThunk(
	'food/addFoodAsync',
	async (foodData) => {
		const response = await axios.post('/fitness/food/', foodData);
		return response.data;
	}
);

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foods: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    add: (state, action) => {
        state.foods.push(action.payload);
    },
    remove: (state, action) => {
        state.foods = state.foods.filter(food => food._id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
     .addCase(loadAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foods = action.payload;
      })
      .addCase(loadAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     .addCase(addFoodAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(addFoodAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addFoodAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { add, remove } = foodSlice.actions;


export default foodSlice.reducer;

export const selectFoods = state => state.foods.foods;