import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { CropService } from 'src/app/services/crop.service';
import { CropsDialog } from '../dialogs/crops.dialog';
import { Crop } from '../../models/crop.model';

import { AreasService } from 'src/app/services/areas.service';
import { ConfirmDialog } from '../dialogs/confirm.dialog';
import { EncyclopediaService } from 'src/app/services/encyclopedia.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-crops',
  templateUrl: 'crops.component.html',
  styleUrls: ['crops.component.css']
})
export class CropsComponent {

  columns: string[] = [
    'name',
    'calendar',
    'area',
    'quantity',
    'count',
    'isWater',
    'menu',
  ];

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public service:CropService,
    public aService:AreasService,
    public eService:EncyclopediaService,
    public hService:HomeService,
    public dialog:MatDialog,
  ) { }
  
  clickAddButton(){
    let data:Crop = this.createSelectedItem(true);
    this.openDialog(true, data);
  }
  clickEditButton(element:any){
    let data:Crop = this.createSelectedItem(false, element);
    this.openDialog(false, data);
  }
  clickDeleteButton(element:any):void{
    const confirmDialogRef = this.dialog
    .open(ConfirmDialog, {
      data: {name:this.eService.getName(element.nameKey), action:'さくじょ'},
    })
    confirmDialogRef.afterClosed().subscribe(res => {
      if(res) this.service.delete(element.key, element.areaKey);
    })
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
        count : 1,
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
        count : param.count,
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
