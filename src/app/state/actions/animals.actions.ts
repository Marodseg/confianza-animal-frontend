import { createAction, props } from '@ngrx/store';
import { Cat, Dog, DogUpdateIn } from '../../interfaces/interfaces';

export const LOAD_DOGS = createAction('[Animals] Load Dogs');
export const LOADED_DOGS = createAction(
  '[Animals] Loaded Dogs',
  props<{ dogs: Dog[] }>()
);

export const LOAD_CATS = createAction('[Animals] Load Cats');
export const LOADED_CATS = createAction(
  '[Animals] Loaded Cats',
  props<{ cats: Cat[] }>()
);

export const ADD_DOG = createAction('[Animals] Add Dog', props<{ dog: {} }>());
export const ADDED_DOG = createAction(
  '[Animals] Added Dog',
  props<{ dog: Dog }>()
);

export const ADD_CAT = createAction('[Animals] Add Cat', props<{ cat: {} }>());
export const ADDED_CAT = createAction(
  '[Animals] Added Cat',
  props<{ cat: Cat }>()
);

// export const EDIT_DOG = createAction('[Animals] Edit Dog', props<{ dog: DogUpdateIn }>());
// export const EDITED_DOG = createAction(
//     '[Animals] Edited Dog',
//     props<{ dog: Dog }>()
// );
