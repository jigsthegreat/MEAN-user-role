import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from '../rooms/room.model';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  rooms: Room[];

  constructor(public roomService: RoomService) {}

  ngOnInit() {

    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      console.log(rooms);
      this.rooms = rooms;
    });
  }

  ngOnDestroy() {}
}
