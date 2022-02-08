import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
  ) {
    this.router.events
      .pipe(filter(f => f instanceof NavigationEnd))
      .subscribe((path: any) => {
        let endPath = path.url.substr(path.url.lastIndexOf('/'));
        this.title = this.titles[endPath]
      });
  }
  
  ngOnInit(): void {
  }
  toggleSidenav(){
  }
}
