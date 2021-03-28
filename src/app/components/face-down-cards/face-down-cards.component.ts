import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Card } from 'src/app/models/table';

@Component({
    selector: 'app-face-down-cards',
    templateUrl: './face-down-cards.component.html',
    styleUrls: ['./face-down-cards.component.less']
})
export class FaceDownCardsComponent implements OnInit {
    @HostBinding('style') style: SafeStyle;
    @Input() set numberOfCards(numberOfCards: number) {
        this.ownCards = Array(numberOfCards).fill(null);
        console.log(1, this.ownCards);
    }
    @Input() set cards(cards: Card[]) {
        console.log(2, cards);
        this.ownCards = cards;
        console.log(2, this.ownCards);
    }
    @Input() playerName: string;
    @Input() cardOverlap: number = 1;
    @Input() maxCardsSpace: number = 500;
    @Input() set rotation(rotation: number) {
        this.style = this._sanitizer.bypassSecurityTrustStyle(
            `display: block; transform-origin: bottom right; transform: rotate(${rotation}deg) translate(-${
                this.cardsSpaceWidth > this.maxCardsSpace
                    ? this.maxCardsSpace / 2
                    : this.cardsSpaceWidth / 2
            }px);`
        );
    }
    ownCards: Card[];
    cardWidth: number = 200;

    constructor(
        private _element: ElementRef,
        private _sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        // this.maxCardsSpace = this.rotation === 90 ? this._element.nativeElement.clientHeight : this._element.nativeElement.clientWidth;
        if (this.cardsSpaceWidth > this.maxCardsSpace) {
            this.adjustCardOverlap();
        }
    }

    getMoveFromLeft(idx: number): string {
        return `${idx * this.cardOverlap}px`;
    }

    get cardsSpaceWidth(): number {
        return this.cardWidth + (this.ownCards.length - 1) * this.cardOverlap;
    }

    adjustCardOverlap(): void {
        const outSideCardSpace = this.cardsSpaceWidth - this.maxCardsSpace;
        const cardMoveCorrection =
            outSideCardSpace / (this.ownCards.length - 1);
        this.cardOverlap = this.cardOverlap - cardMoveCorrection;
    }

    getdirection(): string {
        if (this.rotation !== 0) {
            return 'left';
        }
        return 'top';
    }
}
