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

  menuIndex: {[key: number]: string } = {
    1: 'ホーム',
    2: 'ばしょ',
    3: 'さくもつ',
    4: 'ずかん',
  };
  menuPathIndex: {[key: number]: string } = {
    1: 'home',
    2: 'areas',
    3: 'crops',
    4: 'encyclopedia',
  };  

  constructor(
    private router: Router,
  ){}

  ngOnInit(){}

  public toggleSidenav(){
    this.opened = !this.opened;
  }

  jump(key: string){
    this.router.navigate([`/${this.menuPathIndex[parseInt(key)]}`]);
    this.opened = !this.opened;
  }
}
