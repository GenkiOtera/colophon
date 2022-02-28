import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  areas: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.areas = db.object('areas').valueChanges();
  }
}
