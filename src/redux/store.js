import { configureStore } from '@reduxjs/toolkit';
import isLoginReducer from './isLogin';

export const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
  },
});