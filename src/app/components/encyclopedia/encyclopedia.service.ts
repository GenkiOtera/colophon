import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class EncyclopediaService {
  
  crops: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.crops = db.object('encyclopedia').valueChanges();
  }
}
