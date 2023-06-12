import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from './Features/Food/foodSlice'

export default configureStore({
  reducer: {
    foods: foodsReducer
  }
})