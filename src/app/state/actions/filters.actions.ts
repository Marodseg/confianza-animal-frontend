import { createAction, props } from '@ngrx/store';

export const LOAD_PROVINCES = createAction('[Provinces] Load Provinces');
export const LOADED_PROVINCES = createAction(
  '[Provinces] Loaded Provinces',
  props<{ provinces: string[] }>()
);

export const LOAD_DOG_RAZES = createAction('[Dog Razes] Load Dog Razes');
export const LOADED_DOG_RAZES = createAction(
  '[Dog Razes] Loaded Dog Razes',
  props<{ dogRazes: string[] }>()
);

export const LOAD_CAT_RAZES = createAction('[Cat Razes] Load Cat Razes');
export const LOADED_CAT_RAZES = createAction(
  '[Cat Razes] Loaded Cat Razes',
  props<{ catRazes: string[] }>()
);
