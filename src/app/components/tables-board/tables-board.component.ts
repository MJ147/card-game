import { MatSnackBar } from '@angular/material/snack-bar';
import { Table } from './../../models/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
    selector: 'app-tables-board',
    templateUrl: './tables-board.component.html',
    styleUrls: ['./tables-board.component.less']
})
export class TablesBoardComponent implements OnInit {
    readonly ITN: string = 'Invalid table name, try again';
    tableName: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
    ]);
    tables: Table[];

    readonly INVALID_TABLE_NAME = 'Invalid table name, try again.';
    readonly MIN_TABLE_NAME = 'Please enter at least 3 characters.';
    readonly MAX_TABLE_NAME = 'Please enter no more than 20 characters.';
    readonly TABLE_NAME_ALREADY_EXISTS = 'Table name already exists';

    constructor(
        private _r: Router,
        private _msb: MatSnackBar,
        private _wss: WebsocketService
    ) {}

    ngOnInit(): void {
        this._wss.listen('allTables').subscribe((tables: Table[]) => {
            if (tables.length === 0) {
                return;
            }
            console.log(tables);

            this.tables = tables;
        });

        this._wss.listen('tableId').subscribe((id) => {
            if (id == null) {
                return;
            }

            this._r.navigate(['table', this.tableName.value]);
        });

        this._wss.listen('tableId').subscribe((id) => {
            if (id == null) {
                this._msb.open(this.TABLE_NAME_ALREADY_EXISTS, null, {
                    duration: 2000
                });
                return;
            }

            this._r.navigate(['table', this.tableName.value]);
        });

        this.getAllTables();
    }

    getAllTables(): void {
        this._wss.emit('getAllTables', this.tableName.value);
    }

    joinTable(table: Table): void {
        console.log(table);

        this._wss.emit('joinTable', table.id);
    }

    createTable(): void {
        if (!this.isFormControlValid(this.tableName)) {
            return;
        }
        this._wss.emit('createTable', this.tableName.value);
    }

    isFormControlValid(formControl: FormControl): boolean {
        if (formControl.valid) {
            return true;
        }

        formControl.markAsTouched();

        let message = this.INVALID_TABLE_NAME;

        if (formControl.hasError('maxlength')) {
            message = this.MIN_TABLE_NAME;
        }

        if (formControl.hasError('minlength')) {
            message = this.MIN_TABLE_NAME;
        }

        this._msb.open(message, null, { duration: 2000 });

        return false;
    }
}
