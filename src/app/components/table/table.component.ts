import { Player, ForeignPlayer, OwnPlayer, Card } from './../../models/table';
import { WebsocketService } from './../../services/websocket.service';
import { Table } from 'src/app/models/table';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
    table: Table;

    constructor(private _ar: ActivatedRoute, private _wss: WebsocketService) {}

    ngOnInit(): void {
        this._wss.listen('table').subscribe((table) => {
            console.log(table);
            table.players = this.sortPlayers(table.players);
            this.table = table;
        });

        this._wss.emit('updateTable');
    }

    sortPlayers(players: Player[]): Player[] {
        console.log(players);

        const offset = players.findIndex(
            (player) => player.id === this._wss.playerId
        );

        console.log(offset);

        const arr = [...players.splice(players.length - offset), ...players];
        console.log(arr);
        return arr;
    }

    getPlayerCards(player: Player): Card[] | number {
        const cards = (player as OwnPlayer)?.cards;

        if (cards != null) {
            return cards;
        }

        const numberOfCards = (player as ForeignPlayer)?.numberOfcards;

        if (numberOfCards != null) {
            return numberOfCards;
        }

        return;
    }
}
