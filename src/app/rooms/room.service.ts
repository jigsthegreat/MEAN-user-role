import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL_ROOMS = environment.apiUrl + '/rooms';

@Injectable({ providedIn: 'root' })
export class RoomService {
  constructor(private http: HttpClient, private router: Router) {}

  getRooms() {
    return this.http.get(`${BACKEND_URL_ROOMS}/all`);
  }

}
