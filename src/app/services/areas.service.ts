import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  areas: Observable<any>;
  areaNames:{[key:string]:string} = {};

  constructor(private db: AngularFireDatabase) {
    let areaRef:AngularFireObject<any> = db.object('area');
    this.areas = areaRef.valueChanges();
    areaRef.snapshotChanges().subscribe(
      (area:any) => {
        let obj = area.payload.val();
        let keys = Object.keys(obj);
        keys.forEach(key => {
          this.areaNames[key] = obj[key]['name'];
        })
      }
    )
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

  getName(key:string){
    return this.areaNames[key] ? this.areaNames[key] : '-';
  }
}
