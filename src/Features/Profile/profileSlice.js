import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from '../../axiosURL';

const urlSingular = '/fitness/profile/';
const urlPlural = '/fitness/profiles/';

export const loadAsync = createAsyncThunk(
  'profile/loadAsync',
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

export const addProfileAsync = createAsyncThunk(
	'profile/addProfileAsync',
	async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.post(urlSingular, profileData);
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

export const updateProfileAsync = createAsyncThunk(
	'profile/updateProfileAsync',
  async (profile, { rejectWithValue }) => {
    try {
      const response = await axios.put(urlSingular, profile);
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

export const deleteProfileAsync = createAsyncThunk(
	'profile/deleteProfileAsync',
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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profiles: [],
    error: null,
    status: null,
    activeProfile: null
  },
  reducers: {
    setActiveProfile: (state, action) => {
      const profile = state.profiles.find(profile => profile._id === action.payload)
      state.activeProfile = profile;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(addProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles.push(action.payload);
        if (!state.activeProfile) {
          state.activeProfile = state.profiles[0];
        }
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.profiles.findIndex(profile => profile._id === action.meta.arg._id)
        state.profiles[index] = action.meta.arg;
      })
      .addCase(deleteProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.profiles.findIndex(profile => profile._id === action.meta.arg)
        state.profiles.splice(index, 1);
      })
      .addMatcher(isAnyOf (
        loadAsync.rejected,
        addProfileAsync.rejected,
        updateProfileAsync.rejected,
        deleteProfileAsync.rejected
        ), (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
  },
});


export default profileSlice.reducer;

export const selectProfiles = state => state.profile.profiles;
export const selectActiveProfile = state => state.profile.activeProfile;
export const selectError = state => state.profile.error;
