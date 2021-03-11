import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private _socket: Socket;
    private readonly _URL: string = 'ws://localhost:3000';
    private _uuid: string;

    constructor() {
        this._socket = io(this._URL);
        this._uuid = uuidv4();
        localStorage.setItem('uuid', this._uuid);
    }

    listen(eventName: string): Observable<any> {
        return new Observable((subscriber) => {
            this._socket.on(`${eventName}${this._uuid}`, (data: any) => {
                subscriber.next(data);
            });
        });
    }

    emit(eventName: string, data: any): void {
        console.log(eventName);

        this._socket.emit(eventName, { data, uuid: this._uuid });
    }
}
