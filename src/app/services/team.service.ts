import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  // Thêm team
  addTeam(data: any): Observable<ResponsePayload> {
    const headers = new HttpHeaders();
    return this.http.post<ResponsePayload>(`${environment.teamListUrl}/add-team`, data, {
      headers: headers
    });
  }

  // Lấy ra chi tiết đội thi
  getTeamDetail(team_id: any): Observable<ResponsePayload> {
    return this.http.get<ResponsePayload>(`${environment.teamListUrl}/${team_id}`);
  }

  // Search members
  searchMembers(contest_id: number, data: Object): Observable<ResponsePayload> {
    return this.http.post<ResponsePayload>(`${environment.teamListUrl}/user-team-search/${contest_id}`, data);
  }

  // thêm thành viên vào mảng
  addMemberJoinTeam(contest_id: number, team_id: number, data: any): Observable<ResponsePayload> {
    return this.http.post<ResponsePayload>(`${environment.teamListUrl}/add-user-team-contest/${contest_id}/${team_id}`, data);
  }
}
