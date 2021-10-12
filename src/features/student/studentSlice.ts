import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: boolean;
  listStudent: Student[];
  filters: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  listStudent: [],
  filters: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  },
};

const studentSlide = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchListStudent: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchListStudentSuccess: (state, action: PayloadAction<ListResponse<Student>>) => {
      state.loading = false;
      state.listStudent = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchListStudentFailed: (state) => {
      state.loading = false;
    },
    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filters = action.payload;
    },
    setKeySearchDebouce: (state, action: PayloadAction<ListParams>) => {
      state.filters = action.payload;
    },
  },
});

export const studentActions = studentSlide.actions;
export const filtersStudent = (state: any) => state.student.filters;
const studentReducer = studentSlide.reducer;
export default studentReducer;
