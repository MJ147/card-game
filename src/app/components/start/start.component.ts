import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from 'src/app/models/table';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
    playerName: FormControl = new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.required
    ]);

    readonly INVALID_PLAYER_NAME = 'Invalid player name, try again.';
    readonly MIN_PLAYER_NAME = 'Please enter at least 3 characters.';
    readonly MAX_PLAYER_NAME = 'Please enter no more than 20 characters.';

    constructor(private _router: Router, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.setPlayerNameInLocalStorage('');
    }

    createPlayer(): void {
        if (!this.isFormControlValid(this.playerName)) {
            return;
        }

        const player: Player = {
            name: this.playerName.value
        };

        //TODO add player to websocket
        this.setPlayerNameInLocalStorage(player.name);
        this._router.navigate(['menu']);
    }

    isFormControlValid(formControl: FormControl): boolean {
        if (formControl.valid) {
            return true;
        }

        formControl.markAsTouched();
        let message = this.INVALID_PLAYER_NAME;

        if (formControl.hasError('maxlength')) {
            message = this.MIN_PLAYER_NAME;
        }

        if (formControl.hasError('minlength')) {
            message = this.MIN_PLAYER_NAME;
        }

        this._snackBar.open(message, null, { duration: 2000 });

        return false;
    }

    setPlayerNameInLocalStorage(playerName: string): void {
        localStorage.setItem('playerName', playerName);
    }
}
