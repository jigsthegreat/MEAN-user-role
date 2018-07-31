import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, NgForm, FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { BookingService } from './booking.service';
import { Room } from '../rooms/room.model';

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
    // console.log(this.form.get('roomName').value);
    // console.log(this.form.get('startDateTime'));
    // console.log(this.form.get('endDateTime').value.valueOf());
  }

  chooseStartDateTime(event) {
    this.minEndDate = event.value;
  }

  getRoomName(name) {
    this.selectedRoomName = name;
  }

  ngOnDestroy() {}
}
