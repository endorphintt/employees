import employees from '../features/employees/employeesSlice';
import { ListenerMiddleWare } from './../middleware/auth';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice'
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    employees
  },
  middleware: (getDefaultMiddleWare ) => getDefaultMiddleWare().concat(api.middleware).prepend(ListenerMiddleWare.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
