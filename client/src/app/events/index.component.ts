import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class EventIndexComponent implements OnInit {

  public events: any[];
  public pastEvents: any[];

  // @ViewChildren('projectList') projectList: QueryList<any>;

  constructor(private _dataSvc: DataService) { 
  
    this._dataSvc.getDataForUrl('events/get/').subscribe(response => {
      
      this.groupDates(response);

    });
    
  }
  
  ngOnInit() {
  }
  
  groupDates(returnedEvents: any[]) {
    
    _.each(returnedEvents, (event) => {      
      event.future = new Date(event.date).getTime() > new Date().getTime();
    });

    this.events = _.where(returnedEvents, {future: true});
    this.pastEvents = _.where(returnedEvents, {future: false});
    
  }

}