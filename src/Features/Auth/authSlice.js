import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosURL';

export const signInAsync = createAsyncThunk(
  'auth/SignInAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signin', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
});

export const signUpAsync = createAsyncThunk(
	'auth/SignUpAsync',
	async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup', data);
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

export const signOutAsync = createAsyncThunk(
	'auth/SignOutAsync',
	async (data) => {
		const response = await axios.post('/logout', data);
		return response.data;
	}
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
      authenticated: false,
      error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.authenticated = true;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.authenticated = false;
        state.error = action.payload
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.authenticated = true;
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.authenticated = false;
        state.error = action.payload;
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.authenticated = false;
        state.error = null;
      })
  },
});


export default authSlice.reducer;

export const selectAuthenticated = state => state.auth.authenticated;
export const selectError = state => state.auth.error;
