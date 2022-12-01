import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { PetitionsComponent } from './petitions/petitions.component';
import { DogProfileComponent } from './dog-profile/dog-profile.component';
import { CatProfileComponent } from './cat-profile/cat-profile.component';
import { NewAnimalComponent } from './new-animal/new-animal.component';
import { DogViewComponent } from './dog-view/dog-view.component';
import { CatViewComponent } from './cat-view/cat-view.component';

export const APP_ROUTES = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'animals',
        component: AnimalsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dogs',
        component: DogViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cats',
        component: CatViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'petitions',
        component: PetitionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/dog/:id',
        component: DogProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/cat/:id',
        component: CatProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new/animal',
        component: NewAnimalComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'restore-password',
    component: RestorePasswordComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
