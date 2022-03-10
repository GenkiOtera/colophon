import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AreasService } from '../../services/areas.service';
import { AreasDialog } from '../dialogs/areas.dialog';
import { ConfirmDialog } from '../dialogs/confirm.dialog';

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

  clickAddButton(): void {
    this.openDialog(true, null, '');
  }
  clickEditButton(key:string, name:string){
    this.openDialog(false, key, name);
  }
  clickDeleteButton(key:string, name:string): void {
    const confirmDialogRef = this.dialog
    .open(ConfirmDialog, {
      data: {name:name, action:'さくじょ'},
    });
    confirmDialogRef.afterClosed().subscribe(res => {
      if(res) this.service.delete(key);
    });
  }

  private openDialog(isNew:boolean, key:string|null, name:string){
    const dialogRef = this.dialog
    .open(AreasDialog, {
      data: {isNew:isNew, key:key, name:name},
    })
  }

  // Compare Function's
  originalOrder = (a: KeyValue<any,any>, b: KeyValue<any,any>):number => 0;
  valueAscOrder = (a: KeyValue<string,any>, b: KeyValue<string,any>): number => {
    return a.value['name'].localeCompare(b.value['name']);
  };
}
