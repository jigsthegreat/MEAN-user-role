import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/users/';

@Injectable({ providedIn: 'root' })
export class UserService {
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    return this.http.get(BACKEND_URL);
  }

  createUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    // const authData: AuthData = {
    //   email: email,
    //   password: password,
    //   firstname: firstname,
    //   lastname: lastname
    // };
    // this.http.post(BACKEND_URL + '/signup', authData).subscribe(
    //   response => {
    //     this.router.navigate(['/']);
    //   },
    //   error => {
    //     this.authStatusListener.next(false);
    //   }
    // );
  }

}
