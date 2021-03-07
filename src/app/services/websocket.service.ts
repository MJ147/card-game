import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private _socket: any;
    private readonly _URL: string = 'ws://localhost:3000';

    constructor() {
        this._socket = io(this._URL);
    }

    listen(eventName: string) {
        return new Observable((subscriber) => {
            this._socket.on(eventName, (data) => {
                subscriber.next(data);
            });
        });
    }

    emit(eventName: string, data: any) {
        this._socket.emit(eventName, data);
    }
}
