import { CatsState, DogsState } from '../../interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import {
  ADD_CAT,
  ADD_DOG,
  ADDED_CAT,
  ADDED_DOG,
  LOAD_CATS,
  LOAD_DOGS,
  LOADED_CATS,
  LOADED_DOGS,
} from '../actions/animals.actions';

export const initialDogState: DogsState = { dogs: [], loading: false };
export const initialCatState: CatsState = { cats: [], loading: false };

export const dogsReducer = createReducer(
  initialDogState,
  on(LOAD_DOGS, state => {
    return { ...state, loading: true };
  }),
  on(LOADED_DOGS, (state, { dogs }) => {
    return { ...state, dogs, loading: false };
  }),
  on(ADD_DOG, state => {
    return { ...state, loading: true };
  }),
  on(ADDED_DOG, (state, { dog }) => {
    return { ...state, dogs: [...state.dogs, dog], loading: false };
  })
  // on(EDIT_DOG, state => {
  //   return { ...state, loading: true };
  // }),
  // on(EDITED_DOG, (state, { dog }) => {
  //     return { ...state, dogs: [...state.dogs, dog], loading: false };
  // })
);

export const catsReducer = createReducer(
  initialCatState,
  on(LOAD_CATS, state => {
    return { ...state, loading: true };
  }),
  on(LOADED_CATS, (state, { cats }) => {
    return { ...state, cats, loading: false };
  }),
  on(ADD_CAT, state => {
    return { ...state, loading: true };
  }),
  on(ADDED_CAT, (state, { cat }) => {
    return { ...state, cats: [...state.cats, cat], loading: false };
  })
);
