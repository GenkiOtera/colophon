import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { selectedItem } from '../../models/areas.selectedItem.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  areas: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.areas = db.object('area').valueChanges();
  }

  save(param:selectedItem){
    this.db.list('area').push(param);
  }

  update(key:string, param:selectedItem){
    this.db.list('area').update(key,param);
  }

  delete(key:string){
    this.db.list('area/'+key).remove();
  }
}
