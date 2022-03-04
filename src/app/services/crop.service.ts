import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';

import { Crop } from '../models/crop.model'

@Injectable({
  providedIn: 'root'
})
export class CropService {

  crops = new MatTableDataSource<Crop>();

  constructor(private db:AngularFireDatabase) {
    db.object('crop').snapshotChanges().subscribe((val:any) => {
      this.createTableData(val);
    })
  }

  private createTableData(data:any):void{
    let obj = data.payload.val();
    let keys = Object.keys(obj);
    let crops:Crop[] = [];
    keys.forEach(key => {
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
    });
    this.crops = new MatTableDataSource(crops);
  }
}
