import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  crops:Observable<any>;

  constructor(private db:AngularFireDatabase) {
    this.crops = db.object('crop').valueChanges();
  }
}
