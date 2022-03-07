import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  template:`
    <h1 mat-dialog-title>かくにん</h1>
    <div mat-dialog-content>
      <p>{{data.name}} しますか？</p>
    </div>
    <mat-dialog-actions>
      <button mat-button (click)="exit(false)">やめる</button>
      <button mat-button (click)="exit(true)">はい</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data:any,
  ) { };
  
  exit(res:boolean){
    this.dialogRef.close(res);
  }
}