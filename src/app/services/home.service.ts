import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';

import { DayCrop } from '../models/day-crop.model';
import { CropService } from './crop.service';
import { EncyclopediaService } from './encyclopedia.service';

const maxSeason:number = 4;
const maxDay:number = 28;
const lastDay = maxSeason * maxDay;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  rawDay:number = 0;
  year:number = 0;
  season:string = '';
  day:number = 0;
  fullDay:number = 0;

  constructor(
    private db:AngularFireDatabase,
    public cService:CropService,
    public eService:EncyclopediaService,
  ) {
    // 年の値をセット
    let yearRef:AngularFireObject<number> = db.object('now/year');
    yearRef.snapshotChanges().subscribe(res => {
      let year = res.payload.val() ? res.payload.val() : 0;
      this.year = year ? year : 0;
      this.fullDay = this.calcDay(this.year, this.rawDay);
    })
    // 季節と日付の値をセット
    let dayRef:AngularFireObject<number> = db.object('now/day');
    dayRef.snapshotChanges().subscribe(res => {
      let rawDay = res.payload.val();
      this.rawDay = rawDay ? rawDay : 0;
      this.season = this.getSeason(this.rawDay);
      this.day = this.getDay(this.rawDay);
      this.fullDay = this.calcDay(this.year, this.rawDay);
    });
  }

  public advanceDay(){
    if(this.rawDay >= lastDay){
      this.update(++this.year, 1);
    }else{
      this.update(this.year, ++this.rawDay);
    }
  }
  public backDay(){
    if(this.rawDay <= 1 && this.year <= 0){
      return;
    }else if(this.rawDay <= 1){
      this.update(--this.year, lastDay);
    }else{
      this.update(this.year, --this.rawDay);
    }
  }
  public advanceSeason(){
    if(this.rawDay > (maxDay*3)){
      this.update(++this.year, this.rawDay-(maxDay*3));
    }else{
      this.update(this.year, this.rawDay + maxDay);
    }
  }
  public backSeason(){
    if(this.rawDay <= maxDay && this.year <= 0){
      this.update(0,1);
    }else if(this.rawDay <= maxDay){
        this.update(--this.year, (maxDay*3)+this.rawDay);
    }else{
      this.update(this.year, this.rawDay - maxDay);
    }
  }

  public getSeasonNum(rawDay:number):number{
    let seasonNum = rawDay ? Math.floor((rawDay-1)/maxDay) : 0;
    return seasonNum;
  }

  public getRawDay(seasonNum:number, day:number){
    return (seasonNum * maxDay) + day;
  }

  public getSeason(rawDay:number):string{
    let dividedDay = rawDay ? Math.floor((rawDay-1)/maxDay) : 0;
    switch(dividedDay){
      case 0:
        return 'はる';
      case 1:
        return 'なつ';
      case 2:
        return 'あき';
      case 3:
        return 'ふゆ';
      default:
        return '';
    }
  }
  public getDay(rawDay:number):number{
    // 1季節の日数で割った余りを現在日付としてセット
    let day = rawDay ? rawDay % maxDay : 0;
    day = day == 0 ? maxDay : day;
    return day;
  }

  public getTableData(areaKey:string):MatTableDataSource<DayCrop>{
    let tableData = new MatTableDataSource<DayCrop>(this.cService.dayCrops[areaKey]);
    return tableData;
  }
  public getStatus(dayCrop:DayCrop):number{
    console.log('now day : ' + this.fullDay);

    let result:number;

    // if(dayCrop.count <= 0){
    // テスト用条件式
    if(dayCrop.quantity == 10){
      result = -1;
    }else if(dayCrop.dayStart > this.fullDay){
      result = -2;
    }else{
      let dif = dayCrop.dayLast - this.fullDay;
      result = dif <= 0 ? 0 : dif;
    }

    return result;
  }
  private update(year:number, day:number){
    this.db.object('now').update({year:year,day:day});
  }
  private calcDay(year:number, rawDay:number):number{
    return (year * maxSeason * maxDay) + rawDay;
  }
}
