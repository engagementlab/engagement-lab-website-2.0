(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{qebg:function(e,n,t){"use strict";t.r(n),t.d(n,"ResourcesModule",(function(){return p}));var o=t("iInd"),r=t("mrSG"),c=t("8Y7J"),a=t("Gqku"),i=t("SVse"),s=t("z304");function l(e,n){if(1&e&&c.Mb(0,"cdn-image",15),2&e){const e=c.bc().$implicit;c.ic("cloudinaryId",e.image.public_id),c.jc("alt","Thumbnail image for '",e.name,"' tool or resource"),c.hc("responsive",!0)}}function u(e,n){1&e&&(c.ac(),c.Qb(0,"svg",16),c.Mb(1,"path",17),c.Mb(2,"path",18),c.Pb())}function m(e,n){1&e&&(c.ac(),c.Qb(0,"svg",19),c.Qb(1,"g",20),c.Qb(2,"g"),c.Mb(3,"path",21),c.Mb(4,"path",22),c.Pb(),c.Pb(),c.Pb())}function g(e,n){if(1&e&&(c.Qb(0,"div",5,6),c.Qb(2,"a",7),c.uc(3,l,1,3,"cdn-image",8),c.Qb(4,"h4",9),c.Qb(5,"span"),c.vc(6),c.Pb(),c.uc(7,u,3,0,"svg",10),c.uc(8,m,5,0,"svg",11),c.Pb(),c.Qb(9,"h4",12),c.vc(10),c.Pb(),c.Qb(11,"p"),c.vc(12),c.Pb(),c.Qb(13,"h4",13),c.vc(14,"Date Created"),c.Pb(),c.Qb(15,"p",14),c.vc(16),c.cc(17,"date"),c.Pb(),c.Pb(),c.Pb()),2&e){const e=n.$implicit;c.xb(2),c.ic("href",e.url||e.file.url,c.qc),c.xb(1),c.hc("ngIf",void 0!==e.image),c.xb(3),c.wc(e.name),c.xb(1),c.hc("ngIf",e.file.url),c.xb(1),c.hc("ngIf",e.url&&e.url.length>0),c.xb(2),c.wc(e.project),c.xb(2),c.wc(e.summary),c.xb(4),c.wc(c.ec(17,8,e.date,"mediumDate"))}}function d(e,n){if(1&e&&(c.Qb(0,"section",3),c.uc(1,g,18,11,"div",4),c.Pb()),2&e){const e=c.bc();c.xb(1),c.hc("ngForOf",e.content)}}const f=[{path:"",component:(()=>{class e{constructor(e){this.dataSvc=e}ngOnInit(){return Object(r.b)(this,void 0,void 0,(function*(){const e=yield this.dataSvc.getSet("tools","\n        {\n          \n          allTools {\n            name\n            project\n            summary\n            url\n            date\n            file {\n              url\n            }\n            image {\n              public_id\n            }\n          }\n        }\n    ");this.content=e.allTools}))}}return e.\u0275fac=function(n){return new(n||e)(c.Lb(a.a))},e.\u0275cmp=c.Fb({type:e,selectors:[["app-resources"]],decls:6,vars:1,consts:[["id","intro",1,"column","is-8","is-11-mobile"],[1,"blurb"],["id","resources","class","columns is-multiline is-mobile is-centered",4,"ngIf"],["id","resources",1,"columns","is-multiline","is-mobile","is-centered"],["class","resource column is-3-tablet is-11-mobile",4,"ngFor","ngForOf"],[1,"resource","column","is-3-tablet","is-11-mobile"],["resourceList",""],[3,"href"],["cloudinaryPrefix","/",3,"cloudinaryId","responsive","alt",4,"ngIf"],[1,"name","no-margin"],["viewBox","0 0 29 29","width","29","height","29",4,"ngIf"],["viewBox","0 0 26 26","width","26","height","26",4,"ngIf"],[1,"uppercase","no-margin"],[1,"uppercase"],[1,"no-margin"],["cloudinaryPrefix","/",3,"cloudinaryId","responsive","alt"],["viewBox","0 0 29 29","width","29","height","29"],["d","M 23.819 13.462 L 22.359 11.998 L 15.536 18.821 L 15.536 0 L 13.464 0 L 13.464 18.821 L 6.639 11.996 L 5.183 13.46 L 14.5 22.786 Z",1,"dl-arrow"],["d","M 0 26.929 L 29 26.929 L 29 29 L 0 29 Z"],["viewBox","0 0 26 26","width","26","height","26"],["transform","matrix(0.091574, 0, 0, 0.091574, 0, 0)"],["d","M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374   c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13   c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5   C283.922,7.851,276.071,0,266.422,0z",1,"url-arrow"],["d","M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137   c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"]],template:function(e,n){1&e&&(c.Qb(0,"section",0),c.Qb(1,"h2"),c.vc(2,"Resources & Tools"),c.Pb(),c.Qb(3,"h3",1),c.vc(4," Many of our research projects result in tools, games, workshops, or processes that are free to use. Please browse our resources and use them for your projects. We ask only that you provide appropriate credit. "),c.Pb(),c.Pb(),c.uc(5,d,2,1,"section",2)),2&e&&(c.xb(5),c.hc("ngIf",n.content))},directives:[i.k,i.j,s.a],pipes:[i.d],styles:['@import url("https://fonts.googleapis.com/css?family=Overpass:400,600,900");@font-face{font-family:LunchtypeRegular;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-regular-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Regular.ttf) format("truetype")}@font-face{font-family:LunchtypeMedium;src:url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff2) format("woff2"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943334/homepage-2.0/fonts/lunchtype22-medium-webfont.woff) format("woff"),url(https://res.cloudinary.com/engagement-lab-home/raw/upload/v1543943478/homepage-2.0/fonts/Lunchtype22-Medium.ttf) format("truetype")}.small[_ngcontent-%COMP%]{font-size:small}.large[_ngcontent-%COMP%]{font-size:large}.xx-large[_ngcontent-%COMP%]{font-size:xx-large}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.center[_ngcontent-%COMP%]{text-align:center}.hidden[_ngcontent-%COMP%]{display:none}@media (min-width:64em){.hidden-desktop[_ngcontent-%COMP%]{display:none}}@media (min-width:48em){.hidden-tablet-plus[_ngcontent-%COMP%]{display:none}}@media (max-width:47.99em){.hidden-mobile[_ngcontent-%COMP%]{display:none}}@media (min-width:26.5625em){.hidden-not-mobile[_ngcontent-%COMP%]{display:none}}.no-margin[_ngcontent-%COMP%]{margin:0}.no-pad[_ngcontent-%COMP%]{padding:0}.resource[_ngcontent-%COMP%]     img{max-height:330px}.resource[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-size:1.7em}.resource[_ngcontent-%COMP%]   .uppercase[_ngcontent-%COMP%]{font-weight:900}.resource[_ngcontent-%COMP%]   .dl-arrow[_ngcontent-%COMP%], .resource[_ngcontent-%COMP%]   .url-arrow[_ngcontent-%COMP%]{transition:transform .2s ease-in-out}.resource[_ngcontent-%COMP%]   .url-arrow[_ngcontent-%COMP%]{transform:translate(-40%,40%)}.resource[_ngcontent-%COMP%]:hover   .dl-arrow[_ngcontent-%COMP%]{transform:translateY(13%)}.resource[_ngcontent-%COMP%]:hover   .url-arrow[_ngcontent-%COMP%]{transform:translate(0)}']}),e})()}];let p=(()=>{class e{}return e.\u0275mod=c.Jb({type:e}),e.\u0275inj=c.Ib({factory:function(n){return new(n||e)},imports:[[o.g.forChild(f)],o.g]}),e})()}}]);