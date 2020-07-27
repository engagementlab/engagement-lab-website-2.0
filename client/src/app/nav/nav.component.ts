import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { DataService } from '../utils/data.service';

import { environment } from '../../environments/environment';

interface Link {
    url?: string;
    href?: string;
    label: string;
    enabled?: boolean;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    public navLinks: Link[] = [
        { url: '', label: 'Home' },
        { url: 'studios', label: 'Studios', enabled: false },
        { url: 'masters', label: 'Graduate Program', enabled: false },
        { url: 'research', label: 'Research', enabled: true },
        { url: 'people', label: 'People', enabled: false },
        { url: 'about', label: 'About', enabled: false },
    ];

    public navSubLinks: Link[] = [
        { url: 'resources', label: 'Resources' },
        { url: 'events', label: 'Events Calendar', enabled: true },
        {
            href: 'https://medium.com/engagement-lab-emerson-college',
            label: 'Lab Blog',
            enabled: true,
        },
        { url: 'contact', label: 'Partner With Us' },
        { url: 'contact', label: 'Contact Us' },
        // TODO: in CMS?
        {
            href:
                'https://giving.emerson.edu/give-now?fid=h0ZJD8gm3R4%3d&fdesc=i%2bI0v73Km%2bQCb1p7mjPYeYE68k%2f8URMG',
            label: 'Donate',
            enabled: true,
        },
        { url: 'jobs', label: 'Jobs' },
    ];

    public searchResults: any;

    public searchEnabled: boolean;

    public logoSm: boolean;

    private wasLoading = false;

    private currentUrl: string;

    @ViewChild('nav') nav: ElementRef;

    @ViewChild('searchField') searchField: ElementRef;

    @ViewChild('menuLinks') menuLinks: ElementRef;

    @ViewChild('home') homeLogo: ElementRef;

    @ViewChild('menu') menu: ElementRef;

    @ViewChild('menuBtn') menuBtn: ElementRef;

    @ViewChild('menuOpen') menuBtnOpen: ElementRef;

    @ViewChild('menuClose') menuBtnClose: ElementRef;

    constructor(private _router: Router, private dataSvc: DataService) {
        // Get nav route when nav ends
        this._router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(e => {
                this.currentUrl = this._router.url;

                // Adjust logo size based on page
                this.logoSm = this.currentUrl !== '/';
            });

        _router.events
            .pipe(filter(e => e instanceof NavigationStart))
            .subscribe(e => {
                // Close menu when nav starts
                if (this.menuBtn.nativeElement.classList.contains('isOpen')) {
                    this.openCloseNav();
                }
            });

        this.dataSvc.isLoading.subscribe(value => {
            this.wasLoading = value;
        });

        this.searchEnabled = environment.searchEnabled;
    }

    openCloseNav(): void {
        this.menuBtn.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.add('wasOpened');
    }

    // Is passed route active?
    itemActive(route: string) {
        return `/${route}` == this.currentUrl;
    }

    // If on home when logo clicked, just close menu
    logoClick() {
        if (this.currentUrl === '/') this.openCloseNav();
    }

    searchFocus() {
        this.searchField.nativeElement.className = 'focus';
    }

    searchBlur() {
        this.searchField.nativeElement.className = '';
    }

    async searchTyping(value: string) {
        if (value.length < 3) return;

        this.searchResults = await this.dataSvc.getSet('search', value);
    }
}
