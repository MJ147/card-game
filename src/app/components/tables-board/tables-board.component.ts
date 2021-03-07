import { MatSnackBar } from '@angular/material/snack-bar';
import { Table } from './../../models/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

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

    constructor(private _router: Router, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.getAllTables();
    }

    getAllTables(): void {
        // this._http.getAllTables().subscribe((tables) => {
        //     this.tables = tables;
        //     console.log(tables);
        // });
    }
    joinTable(table: Table): void {
        // this._http
        //     .addPlayer(table.id.toString(), localStorage.getItem('playerId'))
        //     .subscribe(() => {
        //         this._router.navigate(['table', table.id]);
        //     });
    }

    createTable(): void {
        if (!this.isFormControlValid(this.tableName)) {
            return;
        }
        // this._http
        //     .createTable(this.tableName.value, this.playerIdFromLocalStorage)
        //     .subscribe((tableId) => {
        //         this._router.navigate(['table', tableId]);
        //     });
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

        this._snackBar.open(message, null, { duration: 2000 });

        return false;
    }

    // TODO: change temporary solution with local storage to BEARER
    get playerIdFromLocalStorage(): string {
        return localStorage.getItem('playerId');
    }
}
