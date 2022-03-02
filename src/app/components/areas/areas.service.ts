import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  areas: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.areas = db.object('area').valueChanges();
  }

  save(name:string){
    this.db.list('area').push(name);
  }

  update(key:string, name:string){
    this.db.list('area').update(key,name);
  }

  delete(key:string){
    this.db.list('area/'+key).remove();
  }
}
