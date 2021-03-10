export interface Table {
    uuid: string;
    name: string;
    players: Player[];
    cards: Card[];
}

export interface Player {
    name: string;
}

export interface ForeignPlayer extends Player {
    numberOfcards: number;
}

export interface OwnPlayer extends Player {
    uuid: string;
    cards?: Card[];
}

export interface Card {
    uuid: string;
    rank: string;
    suit: string;
}
