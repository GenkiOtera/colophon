import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { selectedItem } from '../models/encyclopedia.selectedItem.model';

@Injectable({
  providedIn: 'root'
})
export class EncyclopediaService {
  
  categories: Observable<any>;
  seasons: Observable<any>;
  crops: Observable<any>;
  cropNames:{[key:string]:string} = {};

  constructor(private db: AngularFireDatabase) {
    this.categories = db.object('category').valueChanges();
    this.seasons = db.object('きせつ').valueChanges();
    this.crops = db.object('encyclopedia').valueChanges();
    db.object('encyclopedia').snapshotChanges().subscribe((crops:any) => {
      let obj = crops.payload.val();
      let keys = Object.keys(obj);
      keys.forEach(key => {
        let crop:{[key:string]:string} = {
          key:key,
          name:obj[key]['name'],
        }
        this.cropNames[key] = obj[key]['name'];
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

  getName(key:string){
    return this.cropNames[key] ? this.cropNames[key] : '-';
  }
}
