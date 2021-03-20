export interface Table {
    id: string;
    name: string;
    players: Player[];
    deck: number;
    cards: Card[];
}

export interface Player {
    id: string;
    name: string;
}

export interface ForeignPlayer extends Player {
    numberOfcards: number;
}

export interface OwnPlayer extends Player {
    cards?: Card[];
}

export interface Card {
    id: string;
    rank: string;
    suit: string;
}
