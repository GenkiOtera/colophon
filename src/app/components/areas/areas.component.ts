import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas',
  templateUrl: 'areas.component.html',
  styleUrls: ['areas.component.css']
})
export class AreasComponent implements OnInit {

  areas = [
    'きた１'
    , 'きた２'
    , 'みなみ１'
    , 'みなみ２'
    , 'みなみ３'
    , 'ちゅうおう１'
    , 'ちゅうおう２'
    , 'ひがし１'
    , 'にし１'
    , 'にし２'
    ,'きた１'
    , 'きた２'
    , 'みなみ１'
    , 'みなみ２'
    , 'みなみ３'
    , 'ちゅうおう１'
    , 'ちゅうおう２'
    , 'ひがし１'
    // , 'にし１'
    // , 'にし２'
    // ,'きた１'
    // , 'きた２'
    // , 'みなみ１'
    // , 'みなみ２'
    // , 'みなみ３'
    // , 'ちゅうおう１'
    // , 'ちゅうおう２'
    // , 'ひがし１'
    // , 'にし１'
    // , 'にし２'
  ]

  constructor() { }

  ngOnInit(): void {
  }
  openDialog(){

  }
}
