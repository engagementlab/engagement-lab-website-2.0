import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'cdn-image',
  templateUrl: './cdn-image.component.html',
  styleUrls: ['./cdn-image.component.scss']
})
export class CdnImageComponent implements OnInit {

	@Input() cloudinaryId: string;
	@Input() cloudinaryPrefix: string;
	@Input() alt: string;
  @Input() height: number;
	@Input() width: number;
  @Input() quality: number;
	@Input() autoFormat: boolean = false;

  public widthCss: SafeStyle;
  public imgId: string;

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    this.imgId = (this.cloudinaryPrefix ? this.cloudinaryPrefix : 'homepage-2.0/') + this.cloudinaryId;

    if(this.width)
      this.widthCss = this._sanitizer.bypassSecurityTrustStyle('max-width:' + this.width+'px');

      console.log(this.autoFormat)

  }

}
