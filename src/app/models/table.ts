export interface Table {
    id: string;
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
    id: string;
    cards?: Card[];
}

export interface Card {
    id: string;
    rank: string;
    suit: string;
}
