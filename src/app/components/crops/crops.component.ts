import { Component, OnInit, ViewChild } from '@angular/core';

import { CropService } from 'src/app/services/crop.service';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(public service:CropService) { }
    
  ngOnInit(): void {
  }
  openDialog(){
  }
}
