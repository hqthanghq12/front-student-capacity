import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePayload } from '../models/response-payload';
import { User } from '../models/user';
import { Router } from '@angular/router';


interface LoginValues {
    email: string;
    password: string;
    remember: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private userSubject: BehaviorSubject<User>;
    private jwtToken: BehaviorSubject<string>;
    public user: Observable<User | null>;
    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.jwtToken = new BehaviorSubject<string>(localStorage.getItem('auth_token') || "");
        this.user = this.userSubject.asObservable();
    }

    login(data: LoginValues) {
        return this.http.post<ResponsePayload>(environment.login, data)
            .pipe(map((response: any) => {
                if (response.status == true) {
                    let dataUser = response.payload!.user;
                    if (dataUser.avatar == null) {
                        dataUser.avatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                    }
                    localStorage.setItem("user", JSON.stringify(response.payload!.user));
                    localStorage.setItem("avatar", JSON.stringify(dataUser.avatar));
                    localStorage.setItem('auth_token', response.payload!.token);
                    localStorage.setItem('token_type', JSON.stringify(response.payload!.token_type));
                    this.userSubject.next(response.payload.user);
                    this.jwtToken.next(response.payload.token);
                }
                return {
                    status: response.status,
                    payload: response.payload
                }
            }));
    }

}
