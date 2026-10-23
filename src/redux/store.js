import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../redux/contact/contactSlice'

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    // ... other reducers
  },
});