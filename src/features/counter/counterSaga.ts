import { delay, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';
function* handleIncreate(action: PayloadAction<number>) {
  yield delay(1000);
  yield put(incrementSagaSuccess(action.payload));
}

export function* counterSaga() {
  yield takeEvery(incrementSaga.toString(), handleIncreate);
}
