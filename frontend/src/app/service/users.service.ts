import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  createUser(newUser: any): Observable<any> {
    const userData = {
      name: newUser.name,
      lastName: newUser.lastName,
      username: newUser.username,
      password: newUser.password,
      repeatPassword: newUser.repeatPassword,
      email: newUser.email
    };

    return this.http.post('http://localhost:3001/auth/register', userData);
  }

  loginUser(credentials: any): Observable<any> {
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };

    return this.http.post('http://localhost:3001/auth/login', loginData);
  }

}
