import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class EncyclopediaService {
  
  categories: Observable<any>;
  seasons: Observable<any>;
  crops: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.categories = db.object('category').valueChanges();
    this.seasons = db.object('きせつ').valueChanges();
    this.crops = db.object('encyclopedia').valueChanges();
  }
}
