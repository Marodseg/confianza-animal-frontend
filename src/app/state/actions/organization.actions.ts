import { createAction, props } from '@ngrx/store';
import { Organization, Petition } from '../../interfaces/interfaces';

export const LOAD_ORGANIZATION = createAction(
  '[Organization] Load Organization'
);
export const LOADED_ORGANIZATION = createAction(
  '[Organization] Loaded Organization',
  props<{ organization: Organization }>()
);

export const LOAD_PETITIONS = createAction('[Organization] Load Petitions');
export const LOADED_PETITIONS = createAction(
  '[Organization] Loaded Petitions',
  props<{ petitions: Petition[] }>()
);
