import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ForeignPlayerCardsComponent } from './components/foreign-player-cards/foreign-player-cards.component';
import { PlayerCardsComponent } from './components/player-cards/player-cards.component';
import { DeckComponent } from './components/deck/deck.component';
import { ShowCardsComponent } from './components/show-cards/show-cards.component';
import { FaceDownCardsComponent } from './components/face-down-cards/face-down-cards.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablesBoardComponent } from './components/tables-board/tables-board.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        ForeignPlayerCardsComponent,
        PlayerCardsComponent,
        DeckComponent,
        ShowCardsComponent,
        FaceDownCardsComponent,
        TablesBoardComponent,
        StartMenuComponent,
        CreatePlayerComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
