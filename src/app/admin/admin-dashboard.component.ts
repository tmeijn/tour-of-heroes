import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    template: `
            <p>Dashboard</p>
            <p>Session ID: {{ sessionId | async }}</p>
            <a id="anchor"></a>
            <p>Token: {{ token | async }}</p>
        `,
    styles: [``]
})
export class AdminDashboardComponent implements OnInit {

    sessionId: Observable<string>;
    token: Observable<string>;

    constructor(private _route: ActivatedRoute) { }

    ngOnInit() { 
        this.sessionId = this._route.queryParams.map(
            params => params['session_id'] || 'none'
        );

        this.token = this._route.fragment.map(
            fragment => fragment || 'none'
        );


    }
}