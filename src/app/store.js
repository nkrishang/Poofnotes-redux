import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import inputReducer from '../features/input/inputSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    input: inputReducer
  },
});
