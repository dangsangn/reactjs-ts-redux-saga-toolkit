import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import { authActions, LoginPayload } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import history from 'utils/history';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    sessionStorage.setItem('access_token', 'fake-token');
    yield put(authActions.loginSuccess({ name: payload.username, id: 1 }));
    history.push('/admin/dashbord');
  } catch (error) {
    yield put(authActions.logginFailure('login failed'));
  }
}

function* handleLogout() {
  yield delay(500);
  sessionStorage.removeItem('access_token');
  yield put(authActions.logout());
  history.push('/login');
}

function* watchLoginFlow() {
  while (true) {
    const isLogin = Boolean(sessionStorage.getItem('access_token'));
    if (!isLogin) {
      const actions: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, actions.payload);
    }
    yield take(authActions.logout.type);
    //here use call is blocking to wait handle logout, if use fork is none blocking will run loop
    yield call(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
