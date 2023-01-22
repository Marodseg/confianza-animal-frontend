import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  LoginResponse,
  RestorePasswordResponse,
} from '../../app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenName = 'access_token';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    public cookieService: CookieService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  public getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<string | undefined> {
    const body = new HttpParams()
      .set('username', credentials.email) // As oauth2 expects username and password as form data
      .set('password', credentials.password);

    return this.http.post<LoginResponse>(environment.userLogin, body).pipe(
      map(
        data => {
          localStorage.setItem('access_token', data.token);
          this.toastr.success('Has iniciado sesión correctamente');
          return data.token;
        },
        catchError(error => {
          this.toastr.error(error.error.detail, '', { timeOut: 4000 });
          return error;
        })
      )
    );
  }

  restorePassword(email: string): Observable<RestorePasswordResponse> {
    const body = {};
    const params = new HttpParams().set('email', email);

    return this.http
      .post<RestorePasswordResponse>(environment.userRestorePassword, body, {
        params: params,
      })
      .pipe(
        map(
          data => {
            return data;
          },
          catchError(error => {
            return error;
          })
        )
      );
  }

  public loggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return false;
      }
    }
    return localStorage.getItem(this.tokenName) !== null;
  }

  /**
   * Remove the token from local storage and redirects the user to login page
   */
  public logout(logoutButton: boolean = false): void {
    this.cookieService.delete(this.tokenName);
    localStorage.removeItem(this.tokenName);
    this.route.navigate(['/login']);
    if (logoutButton) {
      this.toastr.info('Has cerrado la sesión');
    } else {
      this.toastr.info('Inicie sesión para continuar');
    }
  }
}
