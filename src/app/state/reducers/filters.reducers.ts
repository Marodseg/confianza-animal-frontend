import { FiltersState } from '../../interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import {
  LOAD_CAT_RAZES,
  LOAD_DOG_RAZES,
  LOAD_PROVINCES,
  LOADED_CAT_RAZES,
  LOADED_DOG_RAZES,
  LOADED_PROVINCES,
} from '../actions/filters.actions';

export const initialFiltersState: FiltersState = {
  provinces: [],
  dogRazes: [],
  catRazes: [],
};

export const filtersReducer = createReducer(
  initialFiltersState,
  on(LOAD_PROVINCES, state => {
    return { ...state };
  }),
  on(LOADED_PROVINCES, (state, { provinces }) => {
    return { ...state, provinces };
  }),
  on(LOAD_DOG_RAZES, state => {
    return { ...state };
  }),
  on(LOADED_DOG_RAZES, (state, { dogRazes }) => {
    return { ...state, dogRazes };
  }),
  on(LOAD_CAT_RAZES, state => {
    return { ...state };
  }),
  on(LOADED_CAT_RAZES, (state, { catRazes }) => {
    return { ...state, catRazes };
  })
);
