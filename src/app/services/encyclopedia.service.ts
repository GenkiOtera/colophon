import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

import { selectedItem } from '../models/encyclopedia.selectedItem.model';

@Injectable({
  providedIn: 'root'
})
export class EncyclopediaService {
  
  categories: Observable<any>;
  seasons: Observable<any>;
  seasonNames:{[key:string]:string} = {};
  crops: Observable<any>;
  cropNames:{[key:string]:string} = {};
  cropCounts:{[key:string]:number} = {};
  cropDays:{[key:string]:number} = {};

  constructor(private db: AngularFireDatabase) {
    this.categories = db.object('category').valueChanges();

    let seasonRef:AngularFireObject<any> = db.object('きせつ');
    this.seasons = seasonRef.valueChanges();
    seasonRef.snapshotChanges().subscribe((season:any) => {
      this.seasonNames = season.payload.val();
    })

    let cropRef:AngularFireObject<any> = db.object('encyclopedia');
    this.crops = cropRef.valueChanges();
    cropRef.snapshotChanges().subscribe((crops:any) => {
      let obj = crops.payload.val();
      if(!obj){
        this.cropNames = {};
        this.cropCounts = {};
        this.cropDays = {};
        return;
      }
      let keys = Object.keys(obj);
      keys.forEach(key => {
        this.cropNames[key] = obj[key]['name'];
        this.cropCounts[key] = obj[key]['count'];
        this.cropDays[key] = obj[key]['day'];
      })
    });
  }

  save(param:selectedItem){
    this.db.list('encyclopedia').push(param);
  }

  update(key:string, param:selectedItem){
    this.db.list('encyclopedia').update(key,param);
  }

  delete(key:string){
    this.db.list('encyclopedia/'+key).remove();
  }

  getSeason(id:string){
    return this.seasonNames[id] ? this.seasonNames[id] : '-';
  }
  getName(key:string){
    return this.cropNames[key] ? this.cropNames[key] : '-';
  }
  getCrop(key:string){
    let cropRef;
    this.crops.subscribe((crop:any) => {
      cropRef = crop[key]
    })
  }
}
