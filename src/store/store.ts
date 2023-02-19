import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore } from 'redux';

import authSlice from './slices/auth/authSlice';

const reducers = {
  auth: authSlice,
};
const combinedReducer = combineReducers(reducers);

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction,
) => {
  return combinedReducer(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer: (state, action) => reducer(state, action),
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const store = createStore(combinedReducer, applyMiddleware(thunk));
