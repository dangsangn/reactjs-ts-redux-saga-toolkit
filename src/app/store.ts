import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import { mySaga } from './mySaga';
import authReducers from 'features/auth/authSlice';
import reducersDashbord from 'features/dashbord/dashbordSlide';
import studentReducer from 'features/student/studentSlice';
import cityRedecer from 'features/city/sitySlide';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducers,
    dashboard: reducersDashbord,
    student: studentReducer,
    city: cityRedecer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(mySaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
