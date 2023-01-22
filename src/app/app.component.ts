import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Store } from '@ngrx/store';
import { LOAD_CATS, LOAD_DOGS } from './state/actions/animals.actions';
import {
  LOAD_CAT_RAZES,
  LOAD_DOG_RAZES,
  LOAD_PROVINCES,
} from './state/actions/filters.actions';
import { AppState } from './state/app.state';
import {
  LOAD_ORGANIZATION,
  LOAD_PETITIONS,
} from './state/actions/organization.actions';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, LoginComponent],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(LOAD_PROVINCES());
  }
}
