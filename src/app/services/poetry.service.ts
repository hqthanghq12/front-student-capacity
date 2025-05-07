import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {

  constructor(private http: HttpClient) { }

  // List test năng lực
  getAllPoetry(id : number,id_user : number): Observable<ResponsePayload> {
  return this.http.get<ResponsePayload>(`${environment.poetryListUrl}/${id}/${id_user}`);
}
}
