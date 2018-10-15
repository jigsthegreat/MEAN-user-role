import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from './app-material.module';
import { DialogEditComponent } from './users/dialog/dialog-edit.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';
import { RoomComponent } from './rooms/room.component';
import { ReservationComponent } from './reservations/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    HomeComponent,
    DialogEditComponent,
    RoomComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppMaterialModule,
    JwtModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogEditComponent]
})
export class AppModule {}
