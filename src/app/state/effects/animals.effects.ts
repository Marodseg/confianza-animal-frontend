import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap, tap } from 'rxjs';
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
import { UserService } from '../../../services/user/user.service';
import { AnimalService } from '../../../services/animals/animal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AnimalsEffects {
  loadDogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_DOGS),
      mergeMap(() =>
        this.userService.getDogs().pipe(
          map(dogs => {
            return dogs.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
          }),
          map(dogs => LOADED_DOGS({ dogs })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  addDog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADD_DOG),
      switchMap(action =>
        this.animalService.postDog(action.dog).pipe(
          catchError(() => EMPTY),
          map(dog => ADDED_DOG({ dog })),
          tap(data => {
            this.router.navigate(['/edit/dog/' + data.dog.id]);
          }),
          tap(() => {
            this.toastr.success('Se ha creado el animal correctamente', '', {
              timeOut: 4000,
            });
          })
        )
      )
    )
  );
  loadCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_CATS),
      mergeMap(() =>
        this.userService.getCats().pipe(
          map(cats => {
            return cats.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
          }),
          map(cats => LOADED_CATS({ cats })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  addCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADD_CAT),
      switchMap(action =>
        this.animalService.postCat(action.cat).pipe(
          catchError(() => EMPTY),
          map(cat => ADDED_CAT({ cat })),
          tap(data => {
            this.router.navigate(['/edit/cat/' + data.cat.id]);
          }),
          tap(() => {
            this.toastr.success('Se ha creado el animal correctamente', '', {
              timeOut: 4000,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private animalService: AnimalService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
