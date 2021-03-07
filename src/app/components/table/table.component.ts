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

    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        const tableId = this._activatedRoute.snapshot.params.id;
        this.setTable(tableId);
    }

    setTable(tableId: number): void {}
}
