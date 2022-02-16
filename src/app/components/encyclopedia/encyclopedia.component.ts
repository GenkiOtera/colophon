import { Component, OnInit } from '@angular/core';
import { EncyclopediaService } from './encyclopedia.service';

@Component({
  selector: 'app-encyclopedia',
  templateUrl: 'encyclopedia.component.html',
  styleUrls: ['encyclopedia.component.css'],
})
export class EncyclopediaComponent implements OnInit {

  seasons: {[key:number]: string} = {
    0:'すべて',
    1:'はる',
    2:'なつ',
    3:'あき',
    4:'ふゆ',
  }
  selectedSeason = this.seasons[0];
  local = {
      "じゃがいも":{
          "category":"vegetable",
          "season":"12",
          "day":6,
          "count":1
      },
      "チューリップ":{
          "category":"flower",
          "season":"1",
          "day":10,
          "count":1
      },
      "さつまいも":{
          "category":"vegetable",
          "season":"7",
          "day":6,
          "count":1
      }
  }

  constructor(public service: EncyclopediaService) {}

  ngOnInit(): void {
  }

}
