import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from 'src/app/models/table';

@Component({
    selector: 'app-start-menu',
    templateUrl: './start-menu.component.html',
    styleUrls: ['./start-menu.component.less']
})
export class StartMenuComponent implements OnInit {
    player: Player;
    tableName: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
    ]);

    readonly INVALID_TABLE_NAME = 'Invalid table name, try again.';
    readonly MIN_TABLE_NAME = 'Please enter at least 3 characters.';
    readonly MAX_TABLE_NAME = 'Please enter no more than 20 characters.';

    constructor(private _router: Router, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {}

    createTable(): void {
        if (!this.isFormControlValid(this.tableName)) {
            return;
        }
        // TODO: add table to websocket
        this._router.navigate(['table', this.tableName.value]);
    }

    openTablesBoard(): void {
        this._router.navigate(['tables']);
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
}
