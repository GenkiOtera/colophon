import { Component, Inject } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { selectedItem } from './model'

@Component({
  selector: 'encyclopedia-dialog',
  template:`
  <h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-contents class="dialog-container">
    <form [formGroup]="form">
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>しゅるい</mat-label>
        <mat-select formControlName="category">
            <mat-option *ngFor="let category of categories | keyvalue : originalOrder" [value]="category.key">
                {{ category.value }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" [hideRequiredMarker]="true">
        <mat-label>きせつ</mat-label>
        <mat-select formControlName="season">
            <mat-option *ngFor="let season of seasons | keyvalue : originalOrder" [value]="season.key">
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

  // Todo keyvalueのオブジェクトはfirebaseから取得するようにする
  categories: {[key:number]: string} = {
    0:"やさい",
    1:"はな",
    2:"き",
  };
  seasons: {[key:number]: string} = {
    0:"はるなつあきふゆ",
    1:"はる",
    2:"はるなつ",
    3:"はるなつあき",
    4:"なつ",
    5:"なつあき",
    6:"なつあきふゆ",
    7:"あき",
    8:"あきふゆ",
    9:"あきふゆはる",
    10:"ふゆ",
    11:"ふゆはる",
    12:"ふゆはるなつ",
    13:"はるあき",
    14:"なつふゆ",
  };
  days = new Array<number>(this.dayLength);
  counts = new Array<number>(this.countLength);

  form = new FormGroup({
    category: new FormControl(this.data.category, Validators.required),
    season: new FormControl(this.data.season, Validators.required),
    day: new FormControl(this.data.day, Validators.required),
    count: new FormControl(this.data.count, Validators.required),
  });

  constructor(
      public dialogRef: MatDialogRef<EncyclopediaDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data:selectedItem,
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
  };

  saveData(){
    // Todo firebaseサービスの保存メソッドを呼ぶ
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