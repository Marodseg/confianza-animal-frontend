import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectProvinces = (state: AppState) => state.filters.provinces;
export const selectProvincesItems = createSelector(
  selectProvinces,
  provinces => provinces
);
export const selectDogRazes = (state: AppState) => state.filters.dogRazes;
export const selectDogRazesItems = createSelector(
  selectDogRazes,
  dogRazes => dogRazes
);

export const selectCatRazes = (state: AppState) => state.filters.catRazes;
export const selectCatRazesItems = createSelector(
  selectCatRazes,
  catRazes => catRazes
);
