import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    state: stateReducer,
  },
});
