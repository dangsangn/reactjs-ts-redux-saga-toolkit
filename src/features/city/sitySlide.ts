import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City } from 'models';

export interface CityState {
  loading: boolean;
  cityList: Array<City>;
}

const initialState: CityState = {
  cityList: [],
  loading: false,
};
const citySlide = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList: (state) => {
      state.loading = true;
    },
    fetchCityListSuccess: (state, action: PayloadAction<City[]>) => {
      state.loading = false;
      state.cityList = action.payload;
    },
    fetchCityListError: (state) => {
      state.loading = false;
    },
  },
});

export const cityActions = citySlide.actions;
//selector
export const cityList = (state: RootState) => state.city.cityList;
export const mapCityList = createSelector(cityList, (cityList) => {
  return cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {});
});

export const cityOptions = createSelector(cityList, (cityList) =>
  cityList.map((item) => ({ label: item.name, value: item.code }))
);

const cityRedecer = citySlide.reducer;
export default cityRedecer;
