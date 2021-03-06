import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
	table: Table;

	constructor(private _http: HttpService, private _activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		const tableId = this._activatedRoute.snapshot.params.id;
		this.setTable(tableId);
	}

	setTable(tableId: number): void {
		this._http.getTable(tableId.toString()).subscribe(() => {});
	}
}
