import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { Room } from '../rooms/room.model';
import { User } from '../users/user.model';
import { Reservation } from '../reservations/reservation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private selectedRoomName = '';
  form: FormGroup;
  myControl = new FormControl();
  availableRooms: Room[] = [];
  options: Room[];
  filteredOptions: Observable<Room[]>;
  minEndDate: any;

  constructor(public bookingService: BookingService) {}

  ngOnInit() {
    this.form = new FormGroup({
      roomName: new FormControl(null, {}),
      startDateTime: new FormControl(null, { validators: [Validators.required] }),
      endDateTime: new FormControl(null, { validators: [Validators.required] }),
    });

    this.bookingService.getRooms().subscribe((rooms: Room[]) => {
      console.log(rooms);
      this.options = rooms;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  private _filter(value: string): Room[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSearch() {
    if (this.form.invalid) {
      return;
    }
    this.bookingService.getRooms(
      this.form.get('startDateTime').value.valueOf(),
      this.form.get('endDateTime').value.valueOf(),
      this.selectedRoomName
    ).subscribe((rooms: any) => {
      console.log(rooms);
      this.availableRooms = rooms.availableRooms;
      console.log(this.availableRooms);
    });
  }

  chooseStartDateTime(event) {
    this.minEndDate = event.value;
  }

  getRoomName(name) {
    this.selectedRoomName = name;
  }

  onBook(room: any) {
    // const user: User = {

    // }
    const reservation: Reservation = {
      room: room._id,
      requestedBy: '5b39d2aa1d27ae16dc92f38f',
      // requestedBy:
      startDateTime: this.form.get('startDateTime').value,
      endDateTime: this.form.get('endDateTime').value
    };
    console.log('OOOYY');
    this.bookingService.createReservation(reservation);
  }

  ngOnDestroy() {}
}
