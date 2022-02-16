import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
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
  
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>) => {
    return 0;
  }
  keyDescOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  constructor(public service: EncyclopediaService) {}

  ngOnInit(): void {
  }

}
