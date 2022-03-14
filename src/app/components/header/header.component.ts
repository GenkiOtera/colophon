import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { filter } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isAuth: boolean = true;
  public title: string = '';
  private titles: {[key: string]: string } = {
    // ルーティングの末端のパスに応じたタイトルを設定
    '/login': 'ログイン',
    '/home': 'ホーム',
    '/areas': 'ばしょ',
    '/crops': 'さくもつ',
    '/encyclopedia': 'ずかん',
  }

  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    public appComponent: AppComponent,
    public authService: AuthService,
  ) {
    this.afAuth.authState.subscribe(res => {
      this.isAuth = res ? false : true;
    });
    this.router.events
      .pipe(filter(f => f instanceof NavigationEnd))
      .subscribe((path: any) => {
        let endPath = path.url.substr(path.url.lastIndexOf('/'));
        this.title = this.titles[endPath]
      });
  }
  
  toggleSidenav(){
    this.appComponent.toggleSidenav();
  }
}
