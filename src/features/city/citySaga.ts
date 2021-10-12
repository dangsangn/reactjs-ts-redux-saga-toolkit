import { citiesApi } from 'apis/citiesApi';
import { City, ListResponse } from 'models';
import { takeLatest, call, put } from 'redux-saga/effects';
import { cityActions } from './sitySlide';

function* fetchCityListSaga() {
  try {
    const res: ListResponse<City> = yield call(citiesApi.getAll);
    yield put(cityActions.fetchCityListSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(cityActions.fetchCityListError());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityListSaga);
}
