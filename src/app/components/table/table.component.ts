import { WebsocketService } from './../../services/websocket.service';
import { Table } from 'src/app/models/table';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
    table: Table;

    constructor(private _ar: ActivatedRoute, private _wss: WebsocketService) {}

    ngOnInit(): void {
        const tableId = this._ar.snapshot.params.id;
    }
}
