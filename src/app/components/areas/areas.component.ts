import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AreasService } from './areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: 'areas.component.html',
  styleUrls: ['areas.component.css']
})
export class AreasComponent implements OnInit {

  constructor(
    public service: AreasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  openDialog(){

  }

  // Compare Function's
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>):number => 0;
}
