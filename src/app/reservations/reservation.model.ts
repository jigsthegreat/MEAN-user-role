import { Room } from '../rooms/room.model';

export interface Reservation {
  _id?: string;
  approvalStatus?: string;
  room: Room;
  requestedBy: string;
  startDateTime: string;
  endDateTime: string;
  createdAt?: string;
}
