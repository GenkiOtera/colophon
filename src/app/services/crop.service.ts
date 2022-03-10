import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Crop } from '../models/crop.model'
import { DayCrop } from '../models/day-crop.model'
import { EncyclopediaService } from './encyclopedia.service';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  @ViewChild(MatTable)
  table?:MatTable<Crop>;
  crops = new MatTableDataSource<Crop>();
  // areaKey1つに対してDayCropの配列を紐づけ
  dayCrops: {[key:string]:DayCrop[]} = {};

  constructor(private db:AngularFireDatabase, public eService:EncyclopediaService) {
    db.object('crop').snapshotChanges().subscribe((val:any) => {
      this.createTableData(val);
      setTimeout(()=>{ this.table?.renderRows(); },10)
    })
  }

  save(param:any){
    this.db.list('crop').push(param);
  }
  update(key:string, param:any){
    this.db.list('crop').update(key, param);
  }
  delete(key:string, areaKey:string){
    this.db.list('crop/'+key).remove();
    // dayCropsから該当データを削除
    this.dayCrops[areaKey] = this.dayCrops[areaKey].filter(data => data.key !== key);
  }

  private createTableData(data:any):void{
    let obj = data.payload.val();
    if(!obj){
      this.crops.data = [];
      return;
    } 
    let keys = Object.keys(obj);
    let crops:Crop[] = [];
    keys.forEach(key => {
      // さくもつ画面用データ
      let crop:Crop = {
        key:key,
        nameKey:obj[key]['nameKey'],
        areaKey:obj[key]['areaKey'],
        year:obj[key]['year'],
        day:obj[key]['day'],
        quantity:obj[key]['quantity'],
        isWater:obj[key]['isWater'],
      }
      crops.push(crop);
      // ホーム画面用データ
      let dayCrop:DayCrop = {
        key:key,
        nameKey:obj[key]['nameKey'],
        count:0, //後ほど実装
        quantity:obj[key]['quantity'],
        dayLength:10, //ずかんの日にちプロパティ
        dayStart:obj[key]['day'], //（年×２８×４）＋obj[key]['day']をセット
        dayLast:10, //さくもつが消滅する日付をセット（任意の季節の最終日）
      }
      if(!this.dayCrops[obj[key]['areaKey']]){
        this.dayCrops[obj[key]['areaKey']] = [];
        this.dayCrops[obj[key]['areaKey']].push(dayCrop);
      }else{
        //データの存在チェック
        let existFlag = this.dayCrops[obj[key]['areaKey']].find(data => data.key == dayCrop.key);
        if(!existFlag) this.dayCrops[obj[key]['areaKey']].push(dayCrop);
      }
    });
    this.crops.data = crops;
    console.log('created dayCrop data');
    console.log(this.dayCrops);
  }
}
