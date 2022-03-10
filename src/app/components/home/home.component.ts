import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { AreasService } from '../../services/areas.service';
import { HomeService } from '../../services/home.service';
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
  ) { }

  ngOnInit(): void {
    this.testDataSource.filterPredicate = (data:Crop, filterValue:string) => {
      return data.year == parseInt(filterValue);
    }
    this.testDataSource.filter = '1';
  }
  // Compare Function's
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>):number => 0;
  valueAscOrder = (a: KeyValue<string,any>, b: KeyValue<string,any>): number => {
    return a.value['name'].localeCompare(b.value['name']);
  };
}

const CROP_TEST_DATA: Crop[] = [
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 0, day:1, areaKey:'areaKeyProp',quantity:0,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 0, day:2, areaKey:'areaKeyProp',quantity:10,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 0, day:3, areaKey:'areaKeyProp',quantity:20,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 1, day:1, areaKey:'areaKeyProp',quantity:30,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 1, day:2, areaKey:'areaKeyProp',quantity:40,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 1, day:3, areaKey:'areaKeyProp',quantity:50,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 2, day:1, areaKey:'areaKeyProp',quantity:60,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 2, day:2, areaKey:'areaKeyProp',quantity:70,isWater:true },
  {key: 'keyProp', nameKey: 'nameKeyProp', year: 2, day:3, areaKey:'areaKeyProp',quantity:80,isWater:true },
];