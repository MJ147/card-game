import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from 'src/app/models/table';
import { WebsocketService } from 'src/app/services/websocket.service';

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
    readonly TABLE_NAME_ALREADY_EXISTS = 'Table name already exists';

    constructor(
        private _r: Router,
        private _msb: MatSnackBar,
        private _wss: WebsocketService
    ) {}

    ngOnInit(): void {
        this._wss.listen('tableId').subscribe((id) => {
            if (id == null) {
                this._msb.open(this.TABLE_NAME_ALREADY_EXISTS, null, {
                    duration: 2000
                });
                return;
            }

            this._r.navigate(['table', this.tableName.value]);
        });
    }

    createTable(): void {
        if (!this.isFormControlValid(this.tableName)) {
            return;
        }

        this._wss.emit('createTable', this.tableName.value);
    }

    openTablesBoard(): void {
        this._r.navigate(['tables']);
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
