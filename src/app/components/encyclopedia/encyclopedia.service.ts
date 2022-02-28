import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

import { selectedItem } from '../dialogs/encyclopedia/model';

@Injectable({
  providedIn: 'root'
})
export class EncyclopediaService {
  
  categories: Observable<any>;
  seasons: Observable<any>;
  crops: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.categories = db.object('category').valueChanges();
    this.seasons = db.object('きせつ').valueChanges();
    this.crops = db.object('encyclopedia').valueChanges();
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
}
