import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
// import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import qs from 'qs';
import { Reservation } from '../reservations/reservation.model';

const BACKEND_URL_ROOMS = environment.apiUrl + '/rooms';
const BACKEND_URL_RESERVATIONS = environment.apiUrl + '/reservations';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient, private router: Router) {}

  getRooms(startDateTime?: number, endDateTime?: number, roomName?: string) {
    const querystring = {
      sdt: startDateTime,
      edt: endDateTime,
      q: roomName
    };
    return this.http.get(`${BACKEND_URL_ROOMS}?${qs.stringify(querystring)}`);
  }

  createReservation(reservation: Reservation) {
    console.log(reservation);
    return this.http
      .post('http://localhost:3000/api/reservations', reservation)
      .subscribe(
        response => {
          console.log(response);
          // if (response) {
          //   this.router.navigate(['/']);
          // }
        },
        error => {}
      );
  }
}
