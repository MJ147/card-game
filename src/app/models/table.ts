export interface Table {
    id: number;
    name: string;
    deck: Card[];
    players: Player[];
    cards: Card[]; // cards on table
}

export interface Player {
    id: number;
    name: string;
    cards?: Card[];
}

export interface Card {
    id: number;
    rank: string;
    suit: string;
}
