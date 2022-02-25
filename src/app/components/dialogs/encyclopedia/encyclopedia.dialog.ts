import { Component, Inject } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EncyclopediaService } from '../../encyclopedia/encyclopedia.service'; 
import { selectedItem } from './model'

@Component({
  selector: 'encyclopedia-dialog',
  template:`
  <h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-contents class="dialog-container">
    <form [formGroup]="form">
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>なまえ</mat-label>
        <input matInput formControlName="name" type="text" (change)="onSelect($event)">
        <mat-error *ngIf="form.invalid">にゅうりょくしてください</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>しゅるい</mat-label>
        <mat-select formControlName="category" (selectionChange)="onSelect($event)">
            <mat-option *ngFor="let category of service.categories | async | keyvalue : originalOrder" [value]="category.key">
                {{ category.value }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>きせつ</mat-label>
        <mat-select formControlName="season">
            <mat-option *ngFor="let season of service.seasons | async | keyvalue : originalOrder" [value]="season.key">
                {{ season.value }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>ひにち</mat-label>
        <mat-select formControlName="day">
            <mat-option *ngFor="let num of days" [value]="num">{{ num }}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>かいすう</mat-label>
        <mat-select formControlName="count">
            <mat-option *ngFor="let num of counts" [value]="num">{{ num }}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
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
export class EncyclopediaDialog {
  // 表示名
  title:string;
  submitTitle:string;

  // 最大値
  dayLength = 20;
  countLength = 5;

  days = new Array<number>(this.dayLength);
  counts = new Array<number>(this.countLength);

  form = new FormGroup({
    name: new FormControl(this.data.param.name, Validators.required),
    category: new FormControl(this.data.param.category, Validators.required),
    season: new FormControl(this.data.param.season, Validators.required),
    day: new FormControl(this.data.param.day, Validators.required),
    count: new FormControl(this.data.param.count, Validators.required),
  });

  constructor(
      public dialogRef: MatDialogRef<EncyclopediaDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data:any,
      public service: EncyclopediaService,
    ) {
      if(data.isNew){
        this.title = "ついか"
        this.submitTitle = "ついか"
      }else{
        this.title = "へんしゅう"
        this.submitTitle = "こうしん"
      }
      // 選択肢となる数値をセット
      for(let i = 0; i < this.dayLength; i++){this.days[i] = i + 1;};
      for(let i = 0; i < this.countLength; i++){this.counts[i] = i + 1;};

      this.form.valueChanges.subscribe(selectedValue  => {
        console.log(selectedValue);
        this.data.param = selectedValue;
      })
  };

  onSelect(item:any){
    this.data.param.season = item.season;
  }
  saveData(){
    // Todo firebaseサービスの保存メソッドを呼ぶ
    if(this.data.isNew){
      this.service.save(this.data.name, this.data.param)
    }
    this.exit();
  }
  exit(){
    this.dialogRef.close();
  }

  // keyvalueパイプ用の並び順メソッド
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>) => {
    return 0;
  }
}