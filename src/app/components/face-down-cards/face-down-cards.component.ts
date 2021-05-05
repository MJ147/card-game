import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/table';

@Component({
    selector: 'app-face-down-cards',
    templateUrl: './face-down-cards.component.html',
    styleUrls: ['./face-down-cards.component.less']
})
export class FaceDownCardsComponent implements OnInit {
    readonly CARD_HEIGHT: number = 210;
    readonly CARD_WIDTH: number = 140;
    readonly CARD_OFFSET: number = 40;
    marginX: string;

    handOfCards: Card[];

    @Input() set cards(cards: Card[]) {
        this.handOfCards = cards;
    }

    @Input() cardOffset: number;

    ngOnInit(): void {
        this.setMarginX();
    }

    setMarginX(): void {
        const offset = this.cardOffset ?? this.CARD_OFFSET;
        const marginValue = (this.CARD_WIDTH - offset) / 2;
        this.marginX = `-${marginValue}px`;
    }
}
