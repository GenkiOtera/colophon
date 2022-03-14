import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { HomeService } from '../../services/home.service';
import { AreasService } from '../../services/areas.service';
import { CropService } from '../../services/crop.service';
import { Crop } from '../../models/crop.model'

@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['nameKey', 'quantity', 'year', 'day'];
  testDisplayedColumns: string[] = ['nameKey', 'fullDay', 'quantity', 'count'];
  testDataSource = new MatTableDataSource<Crop>(CROP_TEST_DATA);

  constructor(
    public service:HomeService,
    public aService:AreasService,
    public cService:CropService,
  ) {
    this.service.observableNow.subscribe((res:any) => {
      this.service.year = res['year'] ? res['year'] : 0;
      this.service.rawDay = res['day'] ? res['day'] : 0;
      this.service.season = this.service.getSeason(this.service.rawDay);
      this.service.day = this.service.getDay(this.service.rawDay);
      this.service.fullDay = this.service.calcDay(this.service.year, this.service.rawDay);
    })
  }
  
  ngOnInit(): void {
    this.testDataSource.filterPredicate = (data:Crop, filterValue:string) => {
      return data.year == parseInt(filterValue);
    }
    this.testDataSource.filter = '1';
  }

  getCropLength(areaKey:string):number{
    let result:number;
    if(this.cService.dayCrops[areaKey] == undefined){
      result = 0;
    }else{
      result = this.cService.dayCrops[areaKey].length;
    }
    return result;
  }
  // Compare Function's
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>):number => 0;
  valueAscOrder = (a: KeyValue<string,any>, b: KeyValue<string,any>): number => {
    return a.value['name'].localeCompare(b.value['name']);
  };
}

const CROP_TEST_DATA: Crop[] = [
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 0, day:1, areaKey:'areaKeyProp', count:1,quantity:0,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 0, day:2, areaKey:'areaKeyProp', count:1,quantity:10,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 0, day:3, areaKey:'areaKeyProp', count:1,quantity:20,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 1, day:1, areaKey:'areaKeyProp', count:1,quantity:30,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 1, day:2, areaKey:'areaKeyProp', count:1,quantity:40,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 1, day:3, areaKey:'areaKeyProp', count:1,quantity:50,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 2, day:1, areaKey:'areaKeyProp', count:1,quantity:60,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 2, day:2, areaKey:'areaKeyProp', count:1,quantity:70,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 2, day:3, areaKey:'areaKeyProp', count:1,quantity:80,isWater:true },
];