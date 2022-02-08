import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'colophon';
  opened:boolean = false;
  menus: {[key: string]: string } = {
    'home': 'ホーム',
    'areas': 'ばしょ',
    'crops': 'さくもつ',
    'encyclopedia': 'ずかん',
  };

  constructor(
    private router: Router,
  ){}

  ngOnInit(){}

  public toggleSidenav(){
    this.opened = !this.opened;
  }

  jump(name: string){
    this.router.navigate([`/${name}`]);
    this.opened = !this.opened;
  }
}
