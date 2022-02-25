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

  save(name:string, param:selectedItem){
    this.db.list('encyclopedia').push(param);
  }
}
