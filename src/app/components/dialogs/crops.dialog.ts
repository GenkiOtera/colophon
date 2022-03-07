import { Component, Inject } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CropService } from '../../services/crop.service'; 
import { AreasService } from 'src/app/services/areas.service';
import { EncyclopediaService } from 'src/app/services/encyclopedia.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'crop-dialog',
  template:`
  <h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-contents class="dialog-container">
    <form [formGroup]="form">
      <mat-form-field class="keys-form-field" appearance="fill" [hideRequiredMarker]="true">
        <mat-label>なまえ</mat-label>
        <mat-select formControlName="nameKey">
            <mat-option *ngFor="let cropName of eService.cropNames | keyvalue" [value]="cropName.key">
                {{ cropName.value }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
      </mat-form-field>
      <div class="calendar-container">
        <mat-form-field class="calendar-form-field" appearance="fill" [hideRequiredMarker]="true">
          <mat-label>ねん</mat-label>
          <mat-select formControlName="year">
              <mat-option *ngFor="let num of years" [value]="num">{{ num }}</mat-option>
          </mat-select>
          <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
        </mat-form-field>
        <mat-form-field class="calendar-form-field" appearance="fill" [hideRequiredMarker]="true">
          <mat-label>きせつ</mat-label>
          <mat-select formControlName="season">
              <mat-option *ngFor="let season of seasons | keyvalue" [value]="season.key">
                  {{ season.value }}
              </mat-option>
          </mat-select>
          <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
        </mat-form-field>
        <mat-form-field class="calendar-form-field" appearance="fill" [hideRequiredMarker]="true">
          <mat-label>ひにち</mat-label>
          <mat-select formControlName="day">
              <mat-option *ngFor="let num of days" [value]="num">{{ num }}</mat-option>
          </mat-select>
          <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
        </mat-form-field>
      </div>
      <mat-form-field class="keys-form-field" appearance="fill" [hideRequiredMarker]="true">
        <mat-label>ばしょ</mat-label>
        <mat-select formControlName="areaKey">
            <mat-option *ngFor="let areaName of aService.areaNames | keyvalue" [value]="areaName.key">
                {{ areaName.value }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
      </mat-form-field>
      <div class="option-container">
        <mat-form-field class="quantity-form-field" appearance="fill" [hideRequiredMarker]="true">
          <mat-label>こすう</mat-label>
          <mat-select formControlName="quantity">
              <mat-option *ngFor="let num of quantities" [value]="num">{{ num }}</mat-option>
          </mat-select>
          <mat-error *ngIf="form.invalid">せんたくしてください</mat-error>
        </mat-form-field>
        <div class="isWater-container">
          <mat-label>みず</mat-label>
          <mat-slide-toggle formControlName="isWater">{{ isWaterStatus }}</mat-slide-toggle>
        </div>
      </div>
    </form>
  </div>
  <mat-dialog-actions align="end">
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
    .keys-form-field{
      width:320px
    }
    .calendar-container{
      display: flex;
      flex-direction: row;
    }
    .option-container{
      display: flex;
      flex-direction: row;
    }
    .isWater-container{
      display: flex;
      flex-direction: column;
      padding-top:5px;
    }
    .calendar-form-field{
      width: 100px;
      margin-right: 10px;
    }
    .quantity-form-field{
      width: 100px;
      margin-right: 30px;
    }
    mat-slide-toggle{
      margin-top:5px;
    }
    mat-form-field{
      width: 90%;
      align-self: center;
      margin-top: 6px;
      margin-bottom: 6px;
    }
  `]
})
export class CropsDialog {
  // 表示名
  title:string;
  submitTitle:string;

  // 最大値
  yearLength = 99;
  dayLength = 28;
  quantityLength = 99;

  years = new Array<number>(this.yearLength);
  seasons: {[key:string]: string} = {
    0:'はる',
    1:'なつ',
    2:'あき',
    3:'ふゆ',
  }
  days = new Array<number>(this.dayLength);
  quantities = new Array<number>(this.quantityLength);

  isWaterStatus:string = this.data.param.isWater ? 'ON' : 'OFF';

  form = new FormGroup({
    key : new FormControl(this.data.param.key),
    nameKey: new FormControl(this.data.param.nameKey, Validators.required),
    year: new FormControl(this.data.param.year, Validators.required),
    season: new FormControl(this.hService.getSeasonNum(this.data.param.day).toString(), Validators.required),
    day: new FormControl(this.hService.getDay(this.data.param.day), Validators.required),
    areaKey: new FormControl(this.data.param.areaKey, Validators.required),
    quantity: new FormControl(this.data.param.quantity, Validators.required),
    isWater: new FormControl(this.data.param.isWater),
  });

  constructor(
      public dialogRef: MatDialogRef<CropsDialog>,
      @Inject(MAT_DIALOG_DATA)
      public data:any,
      public service: CropService,
      public aService: AreasService,
      public eService: EncyclopediaService,
      public hService: HomeService,
    ) {
      if(data.isNew){
        this.title = "ついか"
        this.submitTitle = "ついか"
      }else{
        this.title = "へんしゅう"
        this.submitTitle = "こうしん"
      }
      // 選択肢となる数値をセット
      for(let i = 0; i < this.yearLength; i++){this.years[i] = i + 1;};
      for(let i = 0; i < this.dayLength; i++){this.days[i] = i + 1;};
      for(let i = 0; i < this.quantityLength; i++){this.quantities[i] = i + 1;};

      this.form.valueChanges.subscribe(selectedValue  => {
        this.data.param = selectedValue;
        this.isWaterStatus = this.data.param.isWater ? 'ON' : 'OFF';
      })
  };

  saveData(){
    if(this.data.isNew){
      this.service.save(this.createParam());
    }else{
      this.service.update(this.data.param.key, this.createParam());
    }
    this.exit();
  }
  exit(){
    this.dialogRef.close();
  }

  private createParam(){
    return {
      nameKey : this.data.param.nameKey,
      year : this.data.param.year,
      day : this.hService.getRawDay(parseInt(this.data.param.season), this.data.param.day),
      areaKey : this.data.param.areaKey,
      quantity : this.data.param.quantity,
      isWater : this.data.param.isWater,
    }
  }
}