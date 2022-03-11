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

  constructor(
    private db:AngularFireDatabase,
    public eService:EncyclopediaService,
  ) {
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
    // dayCropsの該当データも更新
    let index = this.dayCrops[param.areaKey].findIndex(data => data.key == key);
    this.dayCrops[param.areaKey][index] = {
      key:key,
      name:this.eService.cropNames[param.nameKey],
      count:param.count,
      quantity:param.quantity,
      dayLength:this.eService.cropDays[param.nameKey],
      dayStart:param.day,
    }
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
        count:obj[key]['count'],
        isWater:obj[key]['isWater'],
      }
      crops.push(crop);
      // ホーム画面用データ
      let nameKey = obj[key]['nameKey'];
      let dayCrop:DayCrop = {
        key      : key,
        name     : this.eService.cropNames[nameKey],
        count    : obj[key]['count'],
        quantity : obj[key]['quantity'],
        dayLength: this.eService.cropDays[nameKey], //ずかんの日にちプロパティ,
        dayStart : (obj[key]['year'] * 28 * 4) + obj[key]['day'], //（年×２８×４）＋obj[key]['day']をセット;
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
  }

  private createDayCrop(key:string,obj:any):DayCrop{
    let data:DayCrop = {
      key:key,
      name:obj[key]['nameKey'],
      count:0, //後ほど実装
      quantity:obj[key]['quantity'],
      dayLength:10, //ずかんの日にちプロパティ
      dayStart:obj[key]['day'], //（年×２８×４）＋obj[key]['day']をセット
    }
    return data;
  }
}
