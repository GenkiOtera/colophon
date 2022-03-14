import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: User | null;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  // リダイレクト版ログイン
  login(email:string, password: string):Promise<firebase.auth.UserCredential | void>{
    return this.afAuth.signInWithEmailAndPassword(email, password).catch(error => console.error(error));
  }
  logOut():Promise<void>{
    return this.afAuth.signOut();
  }
  signInWithGoogleByRedirect(): Promise<void> {
    return this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

  getRedirectResult(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.getRedirectResult();
  }

  // ポップアップ版ログイン
  oAuthProviderPopup(provider: any){
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['/main']);
        })
      }).catch((error) =>{
        window.alert(error)
      })
  }

  signInWithGoogleByPopup(){
    return this.oAuthProviderPopup(new GoogleAuthProvider())
      .then((res) => {
        console.log('Successfully logged in')
      }).catch((error) => {
        console.log(error)
      });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['auth']);
    })
  }
}