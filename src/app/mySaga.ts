import authSaga from 'features/auth/authSaga';
import citySaga from 'features/city/citySaga';
import { counterSaga } from 'features/counter/counterSaga';
import dashbordSaga from 'features/dashbord/dashbordSaga';
import studentSaga from 'features/student/studentSaga';
import { all } from 'redux-saga/effects';

export function* mySaga() {
  yield all([counterSaga(), authSaga(), dashbordSaga(), studentSaga(), citySaga()]);
}
