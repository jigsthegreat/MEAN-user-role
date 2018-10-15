import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL_RESERVATIONS = environment.apiUrl + '/reservations';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient, private router: Router) {}

  getReservations() {
    return this.http.get(`${BACKEND_URL_RESERVATIONS}`);
  }

}
