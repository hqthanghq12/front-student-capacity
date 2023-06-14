import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class PlaytopicServiceService {


  constructor(private http: HttpClient) { }

  // List test năng lực
  getAllTopics(id_user : number,id_poetry : number,id_campus :number,id_subject : number): Observable<ResponsePayload> {
  return this.http.get<ResponsePayload>(`${environment.playTopicUrl}/${id_user}/${id_poetry}/${id_campus}/${id_subject}`);
}
}
