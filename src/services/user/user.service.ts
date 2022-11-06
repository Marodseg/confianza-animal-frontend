import { Injectable } from '@angular/core';
import { catchError, map, Observable, share, shareReplay, take } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Organization,
  Register,
  RegisterResponse,
} from '../../app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserProfile(): Observable<Organization> {
    return this.http.get<Organization>(environment.userProfile).pipe(
      take(1),
      map(
        data => {
          return data;
        },
        catchError(error => {
          return error;
        })
      ),
      shareReplay()
    );
  }

  public register(register: Register): Observable<RegisterResponse> {
    const body = {
      name: register.name,
      email: register.email,
      password: register.password,
      phone: register.phone,
      zone: register.zone,
    };
    return this.http
      .post<RegisterResponse>(environment.userRegister, body)
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

  public uploadPhoto(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>(environment.userUploadPhoto, formData).pipe(
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
}
