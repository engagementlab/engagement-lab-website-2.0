import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'underscore';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
    public currentPerson: any;

    public people: any[];

    private gettingPerson: boolean;

    constructor(
        private dataSvc: DataService,
        private route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) {
        this.route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params['key']);
        });
    }

    async ngOnInit() {
        // Pre-load person?
        const key = this.route.snapshot.paramMap.get('key');
        if (key) {
            this.getPerson(key);
            // TODO: load all other only on modal close
            // return;
        }

        const query = `   
            {
                allPeople {
                    name {
                        first
                        last
                    }
                    key
                    title
                    image {
                        public_id
                    }
                    cohortYear {
                        label
                    }
                    alumni
                    category
                    onLeave
                }
            }
        `;

        const response = await this.dataSvc.getSet('team', query);
        this.people = response['allPeople'];
    }

    async getPerson(key) {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        const query = `   
        {
            getPerson(key: "${key}") {
                name {
                    first
                    last
                }
                key
                title
                image {
                    public_id
                }
                bio { 
                    html
                }
                cohortYear {
                    label
                }
                alumni
                category
                relatedLinks
                contact
                onLeave
                projects {
                    image {
                        public_id
                    }
                    name
                    key
                    __typename
                }
                mdProjects {
                    thumb {
                        public_id
                    }
                    name
                    key
                    __typename
                }
            }
        }`;
        const response = await this.dataSvc.getSetWithKey('team', key, query);
        this.currentPerson = response['getPerson'];
    }

    closePerson() {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('people');
    }
}
