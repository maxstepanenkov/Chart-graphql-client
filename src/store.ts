import { combineReducers, configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleSware from 'redux-saga'
import salesReducer from './sales/SalesSlice';
import salesData from './sagas';

const rootReducer = combineReducers({
  sales: salesReducer
})
const sagaMiddleware = createSagaMiddleSware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware) 
});
sagaMiddleware.run(salesData);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;