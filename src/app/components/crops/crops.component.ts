import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

import { CropService } from 'src/app/services/crop.service';
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
    'nameKey',
    'calendar',
    'areaKey',
    'quantity',
    'isWater',
  ];

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public service:CropService,
    public aService:AreasService,
    public eService:EncyclopediaService,
    public hService:HomeService,
  ) { }
    
  ngOnInit(): void {
  }
  openDialog(){
  }
}
