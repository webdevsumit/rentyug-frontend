import { configureStore } from '@reduxjs/toolkit'
import searchStringReducer from './searchString'

export const store = configureStore({
  reducer: {
    searchString: searchStringReducer,
  },
});