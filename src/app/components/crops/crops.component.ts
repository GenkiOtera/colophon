import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

import { CropService } from 'src/app/services/crop.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crops',
  templateUrl: 'crops.component.html',
  styleUrls: ['crops.component.css']
})
export class CropsComponent implements OnInit {

  columns: string[] = [
    'nameKey',
    'year',
    'day',
    'areaKey',
    'quantity',
    'isWater',
  ];
  crops = new MatTableDataSource<any>();

  constructor(public service:CropService) { }
    
  ngOnInit(): void {
  }
  openDialog(){
  }

  // Compare Function's
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>):number => 0;
  valueAscOrder = (a: KeyValue<string,any>, b: KeyValue<string,any>): number => {
    return a.value['nameKey'].localeCompare(b.value['nameKey']);
  };
}
