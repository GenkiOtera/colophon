import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { CropService } from 'src/app/services/crop.service';
import { CropsDialog } from '../dialogs/crops.dialog';
import { Crop } from '../../models/crop.model';

import { AreasService } from 'src/app/services/areas.service';
import { EncyclopediaService } from 'src/app/services/encyclopedia.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-crops',
  templateUrl: 'crops.component.html',
  styleUrls: ['crops.component.css']
})
export class CropsComponent implements OnInit {

  columns: string[] = [
    'name',
    'calendar',
    'area',
    'quantity',
    'isWater',
    'menu',
  ];

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public service:CropService,
    public aService:AreasService,
    public eService:EncyclopediaService,
    public hService:HomeService,
    public dialog: MatDialog,
  ) { }
    
  ngOnInit(): void {
  }

  clickAddButton(){
    let data:Crop = this.createSelectedItem(true);
    this.openDialog(true, data);
  }
  clickEditButton(element:any){
    let data:Crop = this.createSelectedItem(false, element);
    this.openDialog(false, data);
  }
  clickDeleteButton(key:string):void{
    this.service.delete(key);
  }

  // Private Method's
  private createSelectedItem(isNew:boolean, param?:any):Crop{
    let item:Crop;
    if(isNew){
      item = {
        key: '',
        areaKey : '',
        day : this.hService.rawDay,
        isWater : true,
        nameKey : '',
        quantity : 1,
        year : this.hService.year,
      }
    }else{
      item = {
        key: param.key,
        areaKey : param.areaKey,
        day : param.day,
        isWater : param.isWater,
        nameKey : param.nameKey,
        quantity : param.quantity,
        year : param.year,
      }
    }
    return item;    
  }

  private openDialog(isNew: boolean, data:Crop){
    const dialogRef = this.dialog
    .open(CropsDialog, {
      maxWidth: '375px',
      width: '95vw',
      maxHeight: '480px',
      height: '80vh',
      data: {isNew:isNew, param:data},
    })
  }
}
