import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class EncyclopediaService {
  
  contents: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.contents = db.object('encyclopedia').valueChanges();
  }
}
