import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/roles/';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private http: HttpClient, private router: Router) {}

  getRoles() {
    return this.http.get(BACKEND_URL);
  }
}
