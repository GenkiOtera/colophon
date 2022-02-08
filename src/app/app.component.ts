import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'colophon';
  
  opened:boolean = false;
  public toggleSidenav(){
    this.opened = !this.opened;
  }

  folders: Section[] = [
    { name: 'Photos', },
    { name: 'Recipes', },
    { name: 'Work', },
  ];
  notes: Section[] = [
    { name: 'Vacation Itinerary', },
    { name: 'Kitchen Remodel', },
  ];
}

export interface Section {
  name: string;
}
