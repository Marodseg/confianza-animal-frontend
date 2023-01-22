import {
  CatsState,
  DogsState,
  FiltersState,
  OrganizationState,
} from '../interfaces/interfaces';
import { ActionReducerMap } from '@ngrx/store';
import { catsReducer, dogsReducer } from './reducers/animals.reducers';
import { filtersReducer } from './reducers/filters.reducers';
import { organizationReducer } from './reducers/organization.reducers';

export interface AppState {
  dogs: DogsState;
  cats: CatsState;
  filters: FiltersState;
  organization: OrganizationState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  dogs: dogsReducer,
  cats: catsReducer,
  filters: filtersReducer,
  organization: organizationReducer,
};
