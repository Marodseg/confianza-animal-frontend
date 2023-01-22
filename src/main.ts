import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_ROUTES } from './app/app-routes';
import { AuthService } from './services/auth/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/authconfig.interceptor';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserService } from './services/user/user.service';
import { FilterService } from './services/filter/filter.service';
import { StoreModule } from '@ngrx/store';
import { AnimalService } from './services/animals/animal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './app/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AnimalsEffects } from './app/state/effects/animals.effects';
import { FiltersEffects } from './app/state/effects/filters.effects';
import { OrganizationEffects } from './app/state/effects/organization.effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(APP_ROUTES, {
        preloadingStrategy: PreloadAllModules,
      }),
      HttpClientModule,
      BrowserModule,
      NgbModule,
      ToastrModule.forRoot({
        preventDuplicates: true,
        positionClass: 'toast-bottom-center',
      }),
      StoreModule.forRoot(ROOT_REDUCERS),
      EffectsModule.forRoot([
        AnimalsEffects,
        FiltersEffects,
        OrganizationEffects,
      ]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
      }),
    ]),
    provideAnimations(),
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    AuthGuardService,
    CookieService,
    ToastrService,
    UserService,
    FilterService,
    AnimalService,
  ],
}).catch(err => console.error(err));
