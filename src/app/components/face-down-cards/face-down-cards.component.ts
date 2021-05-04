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
    handOfCards: Card[];

    ngOnInit(): void {}

    @Input() set cards(cards: Card[]) {
        this.handOfCards = cards;
    }
}
