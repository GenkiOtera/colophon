import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'encyclopedia-dialog',
  template:`
    <!-- <div class="dialog-container" *ngIf="isShowDialog"> -->
    <div class="dialog-container">
      <div mat-dialog-content>
          <p>What's your favorite animal?</p>
          <mat-form-field appearance="fill">
            <mat-label>きせつ</mat-label>
            <input matInput type="number">
            <!-- <input matInput [(ngModel)]="data.animal"> -->
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>ひにち</mat-label>
            <input matInput type="number">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>かいすう</mat-label>
            <input matInput type="number">
          </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <!-- <button mat-button (click)="onNoClick()">No Thanks</button>
        <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button> -->
      </div>
    </div>
  `,
})
export class EncyclopediaDialog {

  constructor(public dialogRef: MatDialogRef<EncyclopediaDialog>) { }

}
