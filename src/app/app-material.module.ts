import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatListModule
} from '@angular/material';

import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    MatListModule
  ]
})

export class AppMaterialModule {}
