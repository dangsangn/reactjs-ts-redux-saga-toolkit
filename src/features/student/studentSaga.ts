import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { studentApi } from 'apis/studientApi';
import { ListParams, ListResponse, Student } from 'models';
import { studentActions } from './studentSlice';

function* fetchListUserSaga({ payload }: ListParams) {
  try {
    const res: ListResponse<Student> = yield call(studentApi.getAll, payload);
    yield put(studentActions.fetchListStudentSuccess(res));
  } catch (error) {
    console.log(error);
    yield put(studentActions.fetchListStudentFailed());
  }
}

function* setKeySearchDebouceSaga({ payload }: ListParams) {
  yield put(studentActions.setFilter({ ...payload }));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchListStudent.toString(), fetchListUserSaga);
  yield debounce(500, studentActions.setKeySearchDebouce.toString(), setKeySearchDebouceSaga);
}
