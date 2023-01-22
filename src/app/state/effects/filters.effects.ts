import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FilterService } from '../../../services/filter/filter.service';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import {
  LOAD_CAT_RAZES,
  LOAD_DOG_RAZES,
  LOAD_PROVINCES,
  LOADED_CAT_RAZES,
  LOADED_DOG_RAZES,
  LOADED_PROVINCES,
} from '../actions/filters.actions';

@Injectable()
export class FiltersEffects {
  loadProvinces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_PROVINCES),
      mergeMap(() =>
        this.filterService.getProvinces().pipe(
          map(provinces => LOADED_PROVINCES({ provinces })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  loadDogRazes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_DOG_RAZES),
      mergeMap(() =>
        this.filterService.getDogRazes().pipe(
          map(dogRazes => LOADED_DOG_RAZES({ dogRazes })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  loadCatRazes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_CAT_RAZES),
      mergeMap(() =>
        this.filterService.getCatRazes().pipe(
          map(catRazes => LOADED_CAT_RAZES({ catRazes })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private filterService: FilterService
  ) {}
}
