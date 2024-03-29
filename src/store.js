import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from './Features/Food/foodSlice'
import authReducer from './Features/Auth/authSlice'
import profileReducer from './Features/Profile/profileSlice'
import exerciseReducer from './Features/Exercise/exerciseSlice'
import dayReducer from './Features/Day/daySlice'

export default configureStore({
  reducer: {
    foods: foodsReducer,
    auth: authReducer,
    profile: profileReducer,
    exercise: exerciseReducer,
    day: dayReducer,
  }
})
