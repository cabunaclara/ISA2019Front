import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) { }

  login(data: string): any {
    console.log('login');
    return this.http.post('api/auth/login', data, {headers: this.headers}).pipe(
      map((res: any) => {
        console.log(res);
        if (res) {
          const decoded = jwt_decode(res);
          const decodedRole = decoded['role'];
          localStorage.setItem('currentUser', JSON.stringify({
            'token' : res,
            'role' : decodedRole
          }));
          return true;
        }
        return false;
      }),
      catchError( err => {
        if (err.status === 400) {
          return throwError('Invalid login.');
        }
        return throwError('Server error occured during login.');
      }));

    }

    getCurrentUser() {
      if (localStorage.currentUser) {
        return JSON.parse(localStorage.currentUser);
      }
      return undefined;
    }

    getToken(): String {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser && currentUser.token;
      return token ? token : '';
    }

    getCurrentUserInfo(): Observable<User> {
      return this.http.post<User>('api/api/getInfo', {headers: this.headers}).pipe(
        catchError( err => {
            console.log(err.error);
            return throwError('Error.');
        }));
    }

}
