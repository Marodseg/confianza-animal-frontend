import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(public http: HttpClient) {}

  public getProvinces(): Observable<string[]> {
    return this.http.get<string[]>(environment.provinces).pipe(
      map(data => {
        data.sort();
        return data;
      })
    );
  }

  public getDogRazes(): Observable<string[]> {
    return this.http.get<string[]>(environment.dogRazes).pipe(
      map(data => {
        data.sort();
        data.splice(data.indexOf('Desconocida'), 1);
        data.push('Desconocida');
        return data;
      })
    );
  }

  public getCatRazes(): Observable<string[]> {
    return this.http.get<string[]>(environment.catRazes).pipe(
      map(data => {
        data.sort();
        data.splice(data.indexOf('Desconocida'), 1);
        data.push('Desconocida');
        return data;
      })
    );
  }
}
