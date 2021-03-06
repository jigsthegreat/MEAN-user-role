import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './users/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { RoomComponent } from './rooms/room.component';
import { ReservationComponent } from './reservations/reservation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'reservations', component: ReservationComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoleGuard]
})
export class AppRoutingModule {}
