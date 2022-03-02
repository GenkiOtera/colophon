import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  rawDay:number | null = null;
  year:number | null = null;
  season:string = '';
  day:number | null = null;

  constructor(private db:AngularFireDatabase) {
    // 年の値をセット
    let yearRef:AngularFireObject<number> = db.object('now/year');
    yearRef.snapshotChanges().subscribe(res => {
      this.year = res.payload.val();
    })
    // 季節と日付の値をセット
    let dayRef:AngularFireObject<number> = db.object('now/day');
    dayRef.snapshotChanges().subscribe(res => {
      this.rawDay = res.payload.val();
      // きせつを算出
      let dividedDay = this.rawDay ? Math.floor((this.rawDay-1)/28) : 0;
      switch(dividedDay){
        case 0:
          this.season = 'はる';
          break;
        case 1:
          this.season = 'なつ';
          break;
        case 2:
          this.season = 'あき';
          break;
        case 3:
          this.season = 'ふゆ';
          break;
        default:
          this.season = '';
      }
      // 1季節28日なので28で割った余りを現在日付としてセット
      this.day = this.rawDay ? this.rawDay % 28 : null;
      this.day = this.day == 0 ? 28 : this.day;
    });
  }

  update(year:string, day:string){
    this.db.object('now').update({year:year,day:day});
  }
}
