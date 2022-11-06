import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { PetitionsComponent } from './petitions/petitions.component';

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
        path: 'petitions',
        component: PetitionsComponent,
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
