import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class SemeterService {

  
  constructor(private http: HttpClient) { }

  // List test năng lực
  getAllSemeter(codeCampus : number): Observable<ResponsePayload> {
  return this.http.get<ResponsePayload>(`${environment.semeterListUrl}/${codeCampus}`);
}
}
