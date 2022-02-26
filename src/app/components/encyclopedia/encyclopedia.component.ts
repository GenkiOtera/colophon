import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { selectedItem } from '../dialogs/encyclopedia/model';
import { EncyclopediaDialog } from '../dialogs/encyclopedia/encyclopedia.dialog';
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
  selectedSeason:string = Object.keys(this.seasons)[0];
  categories: {[key:number]: string} = {
    99:'すべて',
    0:'やさい',
    1:'はな',
    2:'き',
  }
  selectedCategory:string = Object.keys(this.categories)[3];
  // フィルター内の数値は該当しない季節の数値
  seasonFilter:string[] = [];
  springFilter:string[] = ['4','5','6','7','8','10','14'];
  summerFilter:string[] = ['1','7','8','9','10','11','13'];
  fallFilter:string[] =   ['1','2','4','10','11','12','14'];
  winterFilter:string[] = ['1','2','3','4','5','7','13'];
  categoryFilter:string = '0';
  
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>) => {
    return 0;
  }
  keyDescOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  isShowDialog: boolean = false;

  constructor(
    public service: EncyclopediaService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  changeSeasonFilter(){
    switch(this.selectedSeason){
      case '1':
        this.seasonFilter = this.springFilter;
        break;
      case '2':
        this.seasonFilter = this.summerFilter;
        break;
      case '3':
        this.seasonFilter = this.fallFilter;
        break;
      case '4':
        this.seasonFilter = this.winterFilter;
        break;
      default:
          this.seasonFilter = [];
    }
  }

  clickAddButton(): void {
    this.isShowDialog = true;
    const dialogRef = this.dialog
    .open(EncyclopediaDialog, {
      maxWidth: '250px',
      width: '80vw',
      maxHeight: '570px',
      height: '80vh',
      data: {isNew: true, name:'', param:this.setInitialData(1,1)},
    })
    .updatePosition({top: '20%'});
  }

  clickEditButton(){
  }

  private setInitialData(day:number, count:number, name?:string, category?:number, season?:number): selectedItem{
    let data:selectedItem = {
      name : name?name:'',
      category : category?category:null,
      season : season?season:null,
      day : day,
      count : count,
    }
    return data;
  }
}
