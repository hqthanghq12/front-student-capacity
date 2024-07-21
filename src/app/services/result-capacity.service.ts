import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';
@Injectable({
  providedIn: 'root'
})
export class ResultCapacityService {

  constructor(private http: HttpClient) { }

  // List test năng lực
  ResultExam(id_user : number,id_exam : number): Observable<ResponsePayload> {
  return this.http.get<ResponsePayload>(`${environment.checkExam}/${id_user}/${id_exam}`);
}
}
