import { Injectable, Inject, PLATFORM_ID, Optional, Injector } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

import * as _ from 'underscore';
// import * as path from 'path';
import * as sqlite3 from 'sqlite3';

@Injectable()
export class DataService {

  public isLoading: Subject<boolean> = new Subject<boolean>();
  public serverProblem: Subject<boolean> = new Subject<boolean>();

  public previousUrl: string;
  public currentUrl: string;

  private devUrl: string;
  private db: any;
  
  private STATE_KEY = makeStateKey<any>('content');

  constructor(
    @Inject(PLATFORM_ID) private platformId, 
    private _transferState: TransferState,
    private http: HttpClient, 
    private _router: Router) {

      // console.log('__dirname',__dirname)
    // this.db = new sqlite3.Database(path.join(__dirname, '../../../' ,'engagement-lab.db'));

  	this.devUrl = '//localhost:3000';

    _router.events.subscribe(event => {

      this.currentUrl = this._router.url;
      // Track prior url
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }

    });
  }

  public getSet(page: string, param: string = null, search: boolean = false): Observable<any> {

    if(!search)
      this.isLoading.next(true);

    // If universal build, cache express content data in transferstate
    if (isPlatformServer(this.platformId)) {
      return new Observable(sub => {
        // db.all("SELECT * FROM homepage", (err, rows) => {
        // let content = this._request['content'];

        sub.next({})
      });

    }
    else {

      console.log('CLIENT')
      if(environment.universal) {        
       return new Observable(sub => {
          let result = this._transferState.get(this.STATE_KEY, null);
          sub.next(result);
          this.isLoading.next(false);
        });
      }

      this.serverProblem.next(false);

      let url = `${this.devUrl}/api/${page}/get/`;
      if(param) url = url+param;
     
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

}
