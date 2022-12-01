import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, first, map, Observable, shareReplay } from 'rxjs';
import {
  Cat,
  CatUpdateIn,
  Dog,
  DogUpdateIn,
} from '../../app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor(private http: HttpClient) {}

  public getDog(id: string): Observable<Dog> {
    return this.http.get<Dog>(environment.getDog + '/' + id).pipe(
      first(),
      map(
        data => {
          data.gender == 'male'
            ? (data.gender = 'Macho')
            : (data.gender = 'Hembra');
          data.size == 'mini'
            ? (data.size = 'Mini')
            : data.size == 'small'
            ? (data.size = 'Pequeño')
            : data.size == 'medium'
            ? (data.size = 'Mediano')
            : data.size == 'big'
            ? (data.size = 'Grande')
            : (data.size = 'Gigante');
          data.activity_level == 'low'
            ? (data.activity_level = 'Baja')
            : data.activity_level == 'medium'
            ? (data.activity_level = 'Media')
            : (data.activity_level = 'Alta');
          data.healthy ? (data.healthy = 'Si') : (data.healthy = 'No');
          data.neutered ? (data.neutered = 'Si') : (data.neutered = 'No');
          data.vaccinated ? (data.vaccinated = 'Si') : (data.vaccinated = 'No');
          data.wormed ? (data.wormed = 'Si') : (data.wormed = 'No');
          data.microchip ? (data.microchip = 'Si') : (data.microchip = 'No');
          data.is_urgent ? (data.is_urgent = 'Si') : (data.is_urgent = 'No');

          return data;
        },
        catchError(error => {
          return error;
        })
      ),
      shareReplay()
    );
  }

  public getCat(id: string): Observable<Cat> {
    return this.http.get<Cat>(environment.getCat + '/' + id).pipe(
      first(),
      map(
        data => {
          data.gender == 'male'
            ? (data.gender = 'Macho')
            : (data.gender = 'Hembra');
          data.size == 'mini'
            ? (data.size = 'Mini')
            : data.size == 'small'
            ? (data.size = 'Pequeño')
            : data.size == 'medium'
            ? (data.size = 'Mediano')
            : data.size == 'big'
            ? (data.size = 'Grande')
            : (data.size = 'Gigante');
          data.activity_level == 'low'
            ? (data.activity_level = 'Baja')
            : data.activity_level == 'medium'
            ? (data.activity_level = 'Media')
            : (data.activity_level = 'Alta');
          data.healthy ? (data.healthy = 'Si') : (data.healthy = 'No');
          data.neutered ? (data.neutered = 'Si') : (data.neutered = 'No');
          data.vaccinated ? (data.vaccinated = 'Si') : (data.vaccinated = 'No');
          data.wormed ? (data.wormed = 'Si') : (data.wormed = 'No');
          data.microchip ? (data.microchip = 'Si') : (data.microchip = 'No');
          data.is_urgent ? (data.is_urgent = 'Si') : (data.is_urgent = 'No');

          return data;
        },
        catchError(error => {
          return error;
        })
      ),
      shareReplay()
    );
  }

  public editDog(dog: DogUpdateIn, id: string): Observable<Dog> {
    let body = {};
    if (dog.name) {
      body = {
        ...body,
        name: dog.name,
      };
    }
    if (dog.age) {
      body = {
        ...body,
        age: dog.age,
      };
    }
    if (dog.gender) {
      body = {
        ...body,
        gender: dog.gender,
      };
    }
    if (dog.weight) {
      body = {
        ...body,
        weight: dog.weight,
      };
    }
    if (dog.size) {
      body = {
        ...body,
        size: dog.size,
      };
    }
    if (dog.raze) {
      body = {
        ...body,
        raze: dog.raze,
      };
    }
    if (dog.description) {
      body = {
        ...body,
        description: dog.description,
      };
    }
    if (dog.neutered != undefined) {
      body = {
        ...body,
        neutered: dog.neutered,
      };
    }
    if (dog.vaccinated != undefined) {
      body = {
        ...body,
        vaccinated: dog.vaccinated,
      };
    }
    if (dog.healthy != undefined) {
      body = {
        ...body,
        healthy: dog.healthy,
      };
    }
    if (dog.activity_level) {
      body = {
        ...body,
        activity_level: dog.activity_level,
      };
    }
    if (dog.birth_date) {
      body = {
        ...body,
        birth_date: new Date(dog.birth_date),
      };
    }
    if (dog.wormed != undefined) {
      body = {
        ...body,
        wormed: dog.wormed,
      };
    }
    if (dog.microchip != undefined) {
      body = {
        ...body,
        microchip: dog.microchip,
      };
    }
    if (dog.is_urgent != undefined) {
      body = {
        ...body,
        is_urgent: dog.is_urgent,
      };
    }

    return this.http.put<Dog>(environment.editDog + '/' + id, body).pipe(
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

  public editCat(cat: CatUpdateIn, id: string): Observable<Cat> {
    let body = {};
    if (cat.name) {
      body = {
        ...body,
        name: cat.name,
      };
    }
    if (cat.age) {
      body = {
        ...body,
        age: cat.age,
      };
    }
    if (cat.gender) {
      body = {
        ...body,
        gender: cat.gender,
      };
    }
    if (cat.weight) {
      body = {
        ...body,
        weight: cat.weight,
      };
    }
    if (cat.size) {
      body = {
        ...body,
        size: cat.size,
      };
    }
    if (cat.raze) {
      body = {
        ...body,
        raze: cat.raze,
      };
    }
    if (cat.description) {
      body = {
        ...body,
        description: cat.description,
      };
    }
    if (cat.neutered != undefined) {
      body = {
        ...body,
        neutered: cat.neutered,
      };
    }
    if (cat.vaccinated != undefined) {
      body = {
        ...body,
        vaccinated: cat.vaccinated,
      };
    }
    if (cat.healthy != undefined) {
      body = {
        ...body,
        healthy: cat.healthy,
      };
    }
    if (cat.activity_level) {
      body = {
        ...body,
        activity_level: cat.activity_level,
      };
    }
    if (cat.birth_date) {
      body = {
        ...body,
        birth_date: new Date(cat.birth_date),
      };
    }
    if (cat.wormed != undefined) {
      body = {
        ...body,
        wormed: cat.wormed,
      };
    }
    if (cat.microchip != undefined) {
      body = {
        ...body,
        microchip: cat.microchip,
      };
    }
    if (cat.is_urgent != undefined) {
      body = {
        ...body,
        is_urgent: cat.is_urgent,
      };
    }

    return this.http.put<Cat>(environment.editCat + '/' + id, body).pipe(
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

  public deleteDogPhoto(id: string, photo: string): Observable<any> {
    return this.http
      .delete(environment.deleteDogPhoto + '/' + id + '/photo', {
        params: { photo_url: photo },
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

  public deleteCatPhoto(id: string, photo: string): Observable<any> {
    return this.http
      .delete(environment.deleteCatPhoto + '/' + id + '/photo', {
        params: { photo_url: photo },
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

  public postDog(dog: any): Observable<Dog> {
    const body = {
      name: dog.name,
      age: dog.age,
      gender: dog.gender == 'Macho' ? 'male' : 'female',
      weight: dog.weight,
      size:
        dog.size == 'Mini'
          ? 'mini'
          : dog.size == 'Pequeño'
          ? 'small'
          : dog.size == 'Mediano'
          ? 'medium'
          : dog.size == 'Grande'
          ? 'big'
          : 'very big',
      neutered: dog.neutered == 'Si',
      description: dog.description,
      healthy: dog.healthy == 'Si',
      wormed: dog.wormed == 'Si',
      vaccinated: dog.vaccinated == 'Si',
      birth_date: dog.birth_date ? new Date(dog.birth_date) : null,
      activity_level:
        dog.activity_level == 'Baja'
          ? 'low'
          : dog.activity_level == 'Media'
          ? 'medium'
          : 'high',
      microchip: dog.microchip == 'Si',
      is_urgent: dog.is_urgent == 'Si',
      raze: dog.raze,
    };

    return this.http.post<Dog>(environment.createDog, body).pipe(
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

  public postCat(cat: any): Observable<Cat> {
    const body = {
      name: cat.name,
      age: cat.age,
      gender: cat.gender == 'Macho' ? 'male' : 'female',
      weight: cat.weight,
      size:
        cat.size == 'Mini'
          ? 'mini'
          : cat.size == 'Pequeño'
          ? 'small'
          : cat.size == 'Mediano'
          ? 'medium'
          : cat.size == 'Grande'
          ? 'big'
          : 'very big',
      neutered: cat.neutered == 'Si',
      description: cat.description,
      healthy: cat.healthy == 'Si',
      wormed: cat.wormed == 'Si',
      vaccinated: cat.vaccinated == 'Si',
      birth_date: cat.birth_date ? new Date(cat.birth_date) : null,
      activity_level:
        cat.activity_level == 'Baja'
          ? 'low'
          : cat.activity_level == 'Media'
          ? 'medium'
          : 'high',
      microchip: cat.microchip == 'Si',
      is_urgent: cat.is_urgent == 'Si',
      raze: cat.raze,
    };

    return this.http.post<Cat>(environment.createCat, body).pipe(
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

  public deleteCat(id: string): Observable<any> {
    return this.http.delete(environment.deleteCat + '/' + id).pipe(
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

  public deleteDog(id: string): Observable<any> {
    return this.http.delete(environment.deleteDog + '/' + id).pipe(
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
