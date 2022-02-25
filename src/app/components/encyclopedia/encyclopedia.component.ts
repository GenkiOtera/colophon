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
  selectedSeason = this.seasons[0];
  
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

  clickAddButton(): void {
    this.isShowDialog = true;
    const dialogRef = this.dialog
    .open(EncyclopediaDialog, {
      maxWidth: '230px',
      width: '80vw',
      maxHeight: '480px',
      height: '60vh',
      data: this.setInitialData(true,null,null,1,1),
    })
    .updatePosition({top: '20%'});
  }

  clickEditButton(){
  }

  private setInitialData(isNew:boolean, category:number|null, season:number|null, day:number, count:number): selectedItem{
    let data:selectedItem = {
      isNew : isNew,
      category : category,
      season : season,
      day : day,
      count : count,
    }
    return data;
  }
}
