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
  MatProgressSpinnerModule
} from '@angular/material';

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
    MatProgressSpinnerModule
  ]
})

export class AppMaterialModule {}
