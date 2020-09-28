import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  linePlotly(params: Object): Observable<any>{
    return this.http.post<any>(this.baseUrl+"/harmonics", params , httpOptions)
  }
 
}