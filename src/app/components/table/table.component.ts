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
            table.players = this.sortPlayers(table.players);
            this.table = table;
            console.log(table);
        });

        this._wss.emit('updateTable');
    }

    sortPlayers(players: Player[]): Player[] {
        while (players.length < 4) {
            players.push(null);
        }

        const offset =
            4 - players.findIndex((player) => player.id === this._wss.playerId);
        const arr = [...players.splice(players.length - offset), ...players];
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
