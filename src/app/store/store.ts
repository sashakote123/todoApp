import { combineReducers, configureStore } from '@reduxjs/toolkit';

import currentTaskSlice from './currentTaskSlice';
import currentFilterSlice from './currentFilterScile';
import authUserClice from './authUserClice';

const rootReducer = combineReducers({
  currentTaskId: currentTaskSlice,
  currentFilter: currentFilterSlice,
  authUser: authUserClice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
