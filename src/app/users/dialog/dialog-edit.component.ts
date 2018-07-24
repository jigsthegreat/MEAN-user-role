import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../user.model';
import { Inject, Component } from '@angular/core';

@Component({
  templateUrl: './dialog-edit.component.html'
})
export class DialogEditComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onButtonClicked(value): void {
    this.dialogRef.close(value);
  }
}
