import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectDogs = (state: AppState) => state.dogs;
export const selectCats = (state: AppState) => state.cats;
export const loadingDogs = (state: AppState) => state.dogs.loading;
export const loadingCats = (state: AppState) => state.cats.loading;

// DOGS AND CATS LOADING
export const selectDogsLoading = createSelector(
  loadingDogs,
  loading => loading
);
export const selectCatsLoading = createSelector(
  loadingCats,
  loading => loading
);

// DOGS AND CATS ITEMS
export const selectDogsItems = createSelector(selectDogs, dogs => dogs.dogs);

export const selectCatsItems = createSelector(selectCats, cats => cats.cats);
