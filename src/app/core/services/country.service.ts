import { Injectable, inject } from '@angular/core';
import {HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  env=environment;
  http=inject(HttpClient);

  getCountries():Observable<Country[]>{
    let me=this;
    return me.http.get<Country[]>(`${me.env.apiUrl}`);
  }
}
