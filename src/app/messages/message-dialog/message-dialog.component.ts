import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMessage } from '../models/message';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MessageDialogComponent>,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const result: IMessage = {
        name: this.form.controls['name'].value,
        message: this.form.controls['message'].value,
        created: Date.now(),
      };
      this.dialogRef.close(result);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
