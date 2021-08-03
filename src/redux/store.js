import { configureStore } from '@reduxjs/toolkit'
import searchStringReducer from './searchString'
import isCategoryReducer from './isCategory'

export const store = configureStore({
  reducer: {
    searchString: searchStringReducer,
    isCategory: isCategoryReducer,
  },
});