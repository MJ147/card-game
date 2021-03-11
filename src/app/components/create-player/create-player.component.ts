import { WebsocketService } from './../../services/websocket.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-player',
    templateUrl: './create-player.component.html',
    styleUrls: ['./create-player.component.less']
})
export class CreatePlayerComponent implements OnInit {
    playerName: FormControl = new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.required
    ]);

    readonly INVALID_PLAYER_NAME = 'Invalid player name, try again.';
    readonly MIN_PLAYER_NAME = 'Please enter at least 3 characters.';
    readonly MAX_PLAYER_NAME = 'Please enter no more than 20 characters.';
    readonly PLAYER_NAME_ALREADY_EXISTS = 'Player name already exists';

    constructor(
        private _r: Router,
        private _msb: MatSnackBar,
        private _wss: WebsocketService
    ) {}

    ngOnInit(): void {
        this._wss.listen('playerId').subscribe((id) => {
            if (id == null) {
                this._msb.open(this.PLAYER_NAME_ALREADY_EXISTS, null, {
                    duration: 2000
                });
                return;
            }

            this._r.navigate(['menu']);
        });
    }

    createPlayer(): void {
        if (!this.isFormControlValid(this.playerName)) {
            return;
        }

        this._wss.emit('createPlayer', this.playerName.value);
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

        this._msb.open(message, null, { duration: 2000 });

        return false;
    }
}
