import { Room } from '../rooms/room.model';
import { User } from '../users/user.model';

export interface Reservation {
  _id?: string;
  approvalStatus?: string;
  room: Room;
  // requestedBy: User;
  requestedBy: string;
  startDateTime: string;
  endDateTime: string;
  createdAt?: string;
}
