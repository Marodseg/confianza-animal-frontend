import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectOrganizationItems } from '../state/selectors/organization.selectors';
import { LOAD_CATS, LOAD_DOGS } from '../state/actions/animals.actions';
import {
  LOAD_CAT_RAZES,
  LOAD_DOG_RAZES,
  LOAD_PROVINCES,
} from '../state/actions/filters.actions';
import {
  LOAD_ORGANIZATION,
  LOAD_PETITIONS,
} from '../state/actions/organization.actions';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  organization$ = this.store.select(selectOrganizationItems);

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(LOAD_DOGS());
    this.store.dispatch(LOAD_CATS());
    this.store.dispatch(LOAD_DOG_RAZES());
    this.store.dispatch(LOAD_CAT_RAZES());
    this.store.dispatch(LOAD_ORGANIZATION());
    this.store.dispatch(LOAD_PETITIONS());
  }
}
