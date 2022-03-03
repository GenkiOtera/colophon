import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AreasService } from '../../services/areas.service'; 

@Component({
  selector: 'areas-dialog',
  template:`
  <h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-contents class="dialog-container">
    <form [formGroup]="form">
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>なまえ</mat-label>
        <input matInput formControlName="name" type="text">
        <mat-error *ngIf="form.invalid">にゅうりょくしてください</mat-error>
      </mat-form-field>
    </form>
  </div>
  <mat-dialog-actions>
    <button mat-button (click)="exit()">やめる</button>
    <button mat-button 
            (click)="saveData()"
            type="submit" 
            [disabled]="!form.valid">{{submitTitle}}</button>
  </mat-dialog-actions>
  `,
  styles:[`
    h1{
      font-size:1rem
    }
    .dialog-container{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    mat-form-field{
      width: 90%;
      align-self: center;
      margin-top: 6px;
      margin-bottom: 6px;
    }
  `]
})
export class AreasDialog {
  // 表示名
  title:string;
  submitTitle:string;

  form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    // category: new FormControl(this.data.param.category, Validators.required),
  });

  constructor(
      public dialogRef: MatDialogRef<AreasDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data:any,
      public service: AreasService,
    ) {
      if(data.isNew){
        this.title = "ついか"
        this.submitTitle = "ついか"
      }else{
        this.title = "へんしゅう"
        this.submitTitle = "こうしん"
      }
      this.form.valueChanges.subscribe(selectedValue  => {
        this.data.name = selectedValue;
      })
  };

  saveData(){
    // Todo firebaseサービスの保存メソッドを呼ぶ
    if(this.data.isNew){
      this.service.save(this.data.name);
    }else{
      this.service.update(this.data.key, this.data.name);
    }
    this.exit();
  }
  exit(){
    this.dialogRef.close();
  }
}