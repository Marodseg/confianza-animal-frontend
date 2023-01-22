import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, take } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  AppUser,
  Cat,
  Dog,
  Organization,
  OrganizationUpdate,
  Petition,
  Register,
  RegisterResponse,
} from '../../app/interfaces/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  public uploadAnimalPhotos(
    images: File[],
    id: string,
    isDog: boolean = true
  ): Observable<any> {
    const formData = new FormData();
    const url = isDog
      ? environment.dogUploadPhotos
      : environment.catUploadPhotos;

    for (let i = 0; i < images.length; i++) {
      formData.append('photos', images[i]);
    }

    return this.http.post<any>(url + '/' + id + '/photos', formData).pipe(
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

  public updateUser(user: OrganizationUpdate): Observable<Organization> {
    let body = {};
    if (user.phone) {
      body = {
        ...body,
        phone: user.phone,
      };
    }
    if (user.zone) {
      body = {
        ...body,
        zone: user.zone,
      };
    }

    return this.http.put<Organization>(environment.userUpdate, body).pipe(
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

  public getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(environment.userDogs).pipe(
      map(
        data => {
          data.map(dog => {
            if (dog.gender === 'male') {
              dog.gender = 'Macho';
            } else {
              dog.gender = 'Hembra';
            }
          });
          return data;
        },
        catchError(error => {
          return error;
        })
      )
    );
  }

  public getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(environment.userCats).pipe(
      map(
        data => {
          data.map(cat => {
            if (cat.gender === 'male') {
              cat.gender = 'Macho';
            } else {
              cat.gender = 'Hembra';
            }
          });
          return data;
        },
        catchError(error => {
          return error;
        })
      )
    );
  }

  public getPetitions(): Observable<Petition[]> {
    return this.http.get<Petition[]>(environment.petitions).pipe(
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

  public getAppUserById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(environment.appUser).pipe(
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

  public rejectPetition(id: string, message: string): Observable<any> {
    const params = new HttpParams().set('message', message);
    return this.http
      .delete<any>(environment.statusPetition + '/' + id + '/organization', {
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

  public acceptPetition(
    id: string,
    message: string,
    home_type_bool: boolean,
    free_time_bool: boolean,
    previous_experience_bool: boolean,
    frequency_travel_bool: boolean,
    kids_bool: boolean,
    other_animals_bool: boolean
  ): Observable<any> {
    const params = new HttpParams()
      .set('message', message)
      .set('home_type_bool', home_type_bool)
      .set('free_time_bool', free_time_bool)
      .set('previous_experience_bool', previous_experience_bool)
      .set('frequency_travel_bool', frequency_travel_bool)
      .set('kids_bool', kids_bool)
      .set('other_animals_bool', other_animals_bool);

    return this.http
      .post<any>(
        environment.statusPetition + '/' + id + '/organization',
        {},
        { params: params }
      )
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

  public rejectDocumentation(id: string, message: string): Observable<any> {
    const params = new HttpParams().set('message', message);
    return this.http
      .post<any>(
        environment.statusPetition + '/' + id + '/organization/documentation',
        {},
        { params: params }
      )
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

  public updatePetition(id: string, message: string): Observable<any> {
    const params = new HttpParams().set('message', message);
    return this.http
      .post<any>(environment.petitions + '/' + id, {}, { params: params })
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

  public rejectInformation(
    id: string,
    message: string,
    home_type_bool: boolean,
    free_time_bool: boolean,
    previous_experience_bool: boolean,
    frequency_travel_bool: boolean,
    kids_bool: boolean,
    other_animals_bool: boolean
  ): Observable<any> {
    let params = new HttpParams();
    params = params.set('message', message);
    params = params.set('home_type_bool', home_type_bool);
    params = params.set('free_time_bool', free_time_bool);
    params = params.set('previous_experience_bool', previous_experience_bool);
    params = params.set('frequency_travel_bool', frequency_travel_bool);
    params = params.set('kids_bool', kids_bool);
    params = params.set('other_animals_bool', other_animals_bool);

    return this.http
      .post<any>(
        environment.statusPetition + '/' + id + '/organization/information',
        {},
        { params: params }
      )
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
}
