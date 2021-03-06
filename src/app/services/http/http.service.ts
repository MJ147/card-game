import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player, Table } from '../../models/table';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	readonly baseUrl: string = 'http://localhost:8080/';

	readonly ERROR_CREATING_TABLE: string = 'Error creating table, please try again.';
	readonly ERROR_CREATING_PLAYER: string = 'Error creating player, please try again.';
	private message: string;
	constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}

	createTable(tableName: string, playerId: string): Observable<number> {
		return this._http
			.post<number>(this.baseUrl + 'table/', null, { params: { tableName, playerId } })
			.pipe(
				catchError((err) => {
					this.message = err.error.errorMsg;
					if (!err?.error?.errorMsg) {
						this.message = this.ERROR_CREATING_TABLE;
					}
					this._snackBar.open(this.message, null, { duration: 1000 });
					return throwError(`${err.error.errorCode} ${err.error.errorMsg}`);
				}),
			);
	}

	getTable(tableId: string): Observable<Table> {
		return this._http.get<Table>(this.baseUrl + 'table', { params: { tableId } });
	}

	getAllTables(): Observable<Table[]> {
		return this._http.get<Table[]>(this.baseUrl + 'table/all');
	}

	createPlayer(player: Player): Observable<number> {
		return this._http.post<number>(this.baseUrl + 'player/', player).pipe(
			catchError((err) => {
				this.message = err.error.errorMsg;
				if (!err?.error?.errorMsg) {
					this.message = this.ERROR_CREATING_PLAYER;
				}
				this._snackBar.open(this.message, null, { duration: 1000 });
				return throwError(`${err.error.errorCode} ${err.error.errorMsg}`);
			}),
		);
	}

	updatePlayer(player: Player): Observable<number> {
		return this._http.patch<number>(this.baseUrl + 'player/', player).pipe(
			catchError((err) => {
				return throwError(err.error.errorMsg);
			}),
		);
	}

	addPlayer(tableId: string, playerId: string): Observable<Player> {
		return this._http
			.patch<Player>(this.baseUrl + 'table/add-player', null, { params: { tableId, playerId } })
			.pipe(
				catchError((err) => {
					return throwError(err.error.errorMsg);
				}),
			);
	}
}
