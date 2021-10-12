import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';

export interface DashbordStatistics {
  maleCount: number;
  femaleCount: number;
  hightMarkCount: number;
  lowMarkCount: number;
}
export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashbordSate {
  loading: boolean;
  dashbordStatistics: DashbordStatistics;
  hightMarkStudentList: Student[];
  lowMarkStudentList: Student[];
  rankingByCities: RankingByCity[];
}

const initialState: DashbordSate = {
  loading: false,
  dashbordStatistics: {
    maleCount: 0,
    femaleCount: 0,
    hightMarkCount: 0,
    lowMarkCount: 0,
  },
  hightMarkStudentList: [],
  lowMarkStudentList: [],
  rankingByCities: [],
};

const dashboardSlide = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state) => {
      state.loading = false;
    },
    fetchDataError: (state) => {
      state.loading = false;
    },
    setdashbordStatistics: (state, action: PayloadAction<DashbordStatistics>) => {
      state.dashbordStatistics = action.payload;
    },
    setHightMarkStudentList: (state, action: PayloadAction<Student[]>) => {
      state.hightMarkStudentList = action.payload;
    },
    setLowMarkStudentList: (state, action: PayloadAction<Student[]>) => {
      state.lowMarkStudentList = action.payload;
    },
    setRankingByCities: (state, action: PayloadAction<RankingByCity[]>) => {
      state.rankingByCities = action.payload;
    },
  },
});

export const actionsDashbord = dashboardSlide.actions;
const reducersDashbord = dashboardSlide.reducer;

export default reducersDashbord;
