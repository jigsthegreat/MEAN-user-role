import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return !helper.isTokenExpired(token);
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; userId: string }>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(
        response => {
          if (response.token) {
            // this.authStatusListener.next(true);
            this.saveAuthData(response.token, response.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          // this.authStatusListener.next(false);
        }
      );
  }

  signup(
    email: string,
    password: string,
    name: string
  ) {
    const authData: AuthData = {
      email: email,
      password: password,
      name: name
    };
    this.http.post(BACKEND_URL + '/signup', authData).subscribe(
      response => {
        this.router.navigate(['/']);
      },
      error => {
        // this.authStatusListener.next(false);
      }
    );
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    // localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }
}
