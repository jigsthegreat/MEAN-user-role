import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../reservations/reservation.model';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, OnDestroy {
  reservations: Reservation[];

  constructor(public reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      console.log(reservations);
      this.reservations = reservations;
    });
  }

  getStatus(status) {
    let statusName = '';
    if (status === 0) {
      statusName = 'Pending for Approval';
    } else if (status === 1) {
      statusName = 'Denied';
    } else {
      statusName = 'Approved';
    }
    return statusName;
  }

  ngOnDestroy() {}
}
