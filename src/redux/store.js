import { configureStore } from '@reduxjs/toolkit'
import timeReducer from '../redux/timeSlice'

export default configureStore({
  reducer: {
    time: timeReducer,
  },
})