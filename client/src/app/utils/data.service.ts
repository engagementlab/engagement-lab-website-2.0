import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';

import * as _ from 'underscore';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class DataService {

  public isLoading: Subject<boolean> = new Subject<boolean>();
  public serverProblem: Subject<boolean> = new Subject<boolean>();

  public previousUrl: string;
  public currentUrl: string;

  private baseUrl: string;

  constructor(private http: HttpClient, private _router: Router) { 

  	this.baseUrl = 'http://localhost:3000';

    _router.events.subscribe(event => {
      
      this.currentUrl = this._router.url;
      // Track prior url
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
      
    }); 
  }
	
  public getDataForUrl(urlParam: string, search: boolean = false): Observable<any> {

      if(!search)
        this.isLoading.next(true);

      this.serverProblem.next(false);

      let url = this.baseUrl; 
      url += '/api/';
      url += urlParam;
      
      return this.http.get(url)
      .map((res:any)=> {
        
        // Catch no data as problem on backend
        if(res === null) {
          // this.serverProblem.next(true);
          this._router.navigateByUrl('/error');
          return;
        }

        if(!search)        
          this.isLoading.next(false);
        
        return res.data;
      })
      .catch((error:any) => { 
          this.isLoading.next(false);
          return throwError(error);
      });

  }
  
}
