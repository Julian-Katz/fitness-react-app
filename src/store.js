import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from './Features/Food/foodSlice'
import authReducer from './Features/Auth/authSlice'

export default configureStore({
  reducer: {
    foods: foodsReducer,
    auth: authReducer
  }
})
