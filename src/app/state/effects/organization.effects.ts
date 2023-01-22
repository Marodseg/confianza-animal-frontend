import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../services/user/user.service';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import {
  LOAD_ORGANIZATION,
  LOAD_PETITIONS,
  LOADED_ORGANIZATION,
  LOADED_PETITIONS,
} from '../actions/organization.actions';

@Injectable()
export class OrganizationEffects {
  loadOrganization$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_ORGANIZATION),
      mergeMap(() =>
        this.userService.getUserProfile().pipe(
          map(organization => LOADED_ORGANIZATION({ organization })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  loadPetitions$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_PETITIONS),
      mergeMap(() =>
        this.userService.getPetitions().pipe(
          map(petitions => LOADED_PETITIONS({ petitions })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private action$: Actions, private userService: UserService) {}
}
