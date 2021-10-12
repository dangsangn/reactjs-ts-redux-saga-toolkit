import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { citiesApi } from 'apis/citiesApi';
import { studentApi } from 'apis/studientApi';
import { City, ListResponse, Student } from 'models';
import { actionsDashbord, RankingByCity } from './dashbordSlide';

function* fetchDashbordStatistics() {
  try {
    const responseList: Array<ListResponse<Student>> = yield all([
      call(studentApi.getAll, { _page: 1, _limit: 5, gender: 'male' }),
      call(studentApi.getAll, { _page: 1, _limit: 5, gender: 'female' }),
      call(studentApi.getAll, { _page: 1, _limit: 5, mark_gte: 8 }),
      call(studentApi.getAll, { _page: 1, _limit: 5, mark_lte: 5 }),
    ]);
    const statistics = responseList.map((item) => item.pagination._totalRows);
    const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = [...statistics];
    yield put(
      actionsDashbord.setdashbordStatistics({
        maleCount,
        femaleCount,
        hightMarkCount,
        lowMarkCount,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
function* fetchHightMarkStudentList() {
  try {
    const res: ListResponse<Student> = yield call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      mark_gte: 8,
    });
    yield put(actionsDashbord.setHightMarkStudentList(res.data));
  } catch (error) {
    console.log(error);
  }
}
function* fetchLowMarkStudentList() {
  try {
    const res: ListResponse<Student> = yield call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      mark_lte: 5,
      _order: 'asc',
    });
    yield put(actionsDashbord.setLowMarkStudentList(res.data));
  } catch (error) {
    console.log(error);
  }
}
function* fetchRankingByCities() {
  try {
    const listCity: ListResponse<City> = yield call(citiesApi.getAll); //get list city data
    //get list student has mark high than 8 in list city
    const listData: Array<ListResponse<Student>> = yield all(
      listCity.data.map((item) =>
        call(studentApi.getAll, {
          _limit: 10,
          _page: 1,
          city: item.code,
          mark_gte: 8,
          _sort: 'mark',
          _order: 'desc',
        })
      )
    );
    //return data for raking RankingByCity
    const rankingByCitiesList: RankingByCity[] = listData.map((item, index) => {
      return {
        cityId: listCity.data[index].code,
        cityName: listCity.data[index].name,
        rankingList: item.data,
      };
    });
    yield put(actionsDashbord.setRankingByCities(rankingByCitiesList));
  } catch (error) {
    console.log(error);
  }
}
function* fetchDataSaga() {
  try {
    yield all([
      call(fetchDashbordStatistics),
      call(fetchHightMarkStudentList),
      call(fetchLowMarkStudentList),
      call(fetchRankingByCities),
    ]);
    yield put(actionsDashbord.fetchDataSuccess());
  } catch (error) {
    yield put(actionsDashbord.fetchDataError());
  }
}
export default function* dashbordSaga() {
  yield takeLatest(actionsDashbord.fetchData.type, fetchDataSaga);
}
