import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private http: HttpClient) { }

  list():Observable<ResponsePayload>{
    return this.http.get<ResponsePayload>(environment.sponsorListUrl);
  }
}
