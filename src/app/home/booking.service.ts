import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
// import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import qs from 'qs';

const BACKEND_URL = environment.apiUrl + '/rooms';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getRooms(startDateTime?: number, endDateTime?: number, roomName?: string) {
    const querystring = {
      sdt: startDateTime,
      edt: endDateTime,
      q: roomName
    };
    return this.http.get(`${BACKEND_URL}?${qs.stringify(querystring)}`);
  }

}
