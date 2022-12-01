import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { APP_ROUTES } from './app/app-routes';
import { AuthService } from './services/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(APP_ROUTES, {
        preloadingStrategy: QuicklinkStrategy,
      }),
      HttpClientModule,
      BrowserModule,
      QuicklinkModule,
      FontAwesomeModule,
      NgbModule,
      ToastrModule.forRoot({
        preventDuplicates: true,
        positionClass: 'toast-bottom-center',
      }),
      StoreModule.forRoot({}),
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
