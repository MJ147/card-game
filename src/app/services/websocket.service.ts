import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    // socket: any;
    // readonly URL: string = 'ws://localhost:3000';
    // constructor() {
    //     this.socket = io(this.URL);
    // }
    // listen(eventName: string) {
    //     return new Observable((subscriber) => {
    //         this.socket.on(eventName, (data) => {
    //             subscriber.next(data);
    //         });
    //     });
    // }
    // emit(eventName: string, data: any) {
    //     this.socket.emit(eventName, data);
    // }
}