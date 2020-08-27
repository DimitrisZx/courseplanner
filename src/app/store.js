import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '../features/store/stateSlice';

export default configureStore({
  reducer: {
    state: stateReducer,
  },
});
