import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { TweenLite, Expo, Back } from "gsap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isQABuild: boolean;
  title = 'Engagement Lab @ Emerson College';


  constructor(private _router: Router, private _titleSvc: Title) {

    this.isQABuild = environment.qa;
    this._titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);

   }
 
  ngOnInit() {
    
    if(this.isQABuild) {
      setTimeout(() => {

        TweenLite.fromTo(document.getElementById('qa-build'), .7, {autoAlpha:0, bottom:'-100%'}, {autoAlpha:1, bottom:0, ease:Expo.easeOut});
        TweenLite.fromTo(document.querySelector('#qa-build img'), .7, {autoAlpha:0, scale:0}, {autoAlpha:1, scale:1, delay:.7, ease:Back.easeOut});
        TweenLite.fromTo(document.querySelector('#qa-build #text'), .7, {autoAlpha:0, left:'-100%'}, {autoAlpha:1, left:0, delay:.9, ease:Back.easeOut});
        TweenLite.fromTo(document.getElementById('qa-build'), .7, {autoAlpha:1, bottom:0}, {autoAlpha:0, bottom:'-100%', display:'none', delay:4, ease:Expo.easeIn});
    
      }, 2000);
    }

    this._router.events.subscribe((evt) => {

      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      // Adjust logo size based on page
      if(evt.url === '/')
        document.getElementById('home').classList.add('lg');
      else
        document.getElementById('home').classList.remove('lg');

      if(evt.url.indexOf('/#') === 0)
        return;
      window.scrollTo(0, 0);

    });
  }
}
