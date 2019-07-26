import { Card, eCardFlower } from './CardComponent';

interface IDropable {
    maxCards: number;
    saveCard(card: Card): boolean;
    getCard(): Card;
}

export class SingleCardArea extends Phaser.GameObjects.Container implements IDropable {
    private cardArray: Card[] = [];
    public readonly maxCards = 1;

    public saveCard(card: Card): boolean {
        if (this.cardArray.length >= this.maxCards) return false;
        this.add(card);
        this.cardArray.push(card);
        card.setOrigin(0.5, 0.5);
        card.setPosition(0, 0);
        return true;
    }

    public getCard(): Card {
        return this.cardArray.shift();
    }
}

export class CardHomeArea extends Phaser.GameObjects.Container implements IDropable {
    private cardArray: Card[] = [];
    public readonly maxCards: number = 13;
    public readonly acceptFlower: string = undefined;
    public nextNumber = 1;

    constructor(scene: Phaser.Scene, flower: number) {
        super(scene);
        this.acceptFlower = eCardFlower[flower];
    }

    public saveCard(card: Card): boolean {
        if (this.cardArray.length >= this.maxCards || card.flower !== this.acceptFlower || card.number !== this.nextNumber) return false;
        this.add(card);
        this.cardArray.push(card);
        card.setOrigin(0.5, 0.5);
        card.setPosition(0, 0);
        this.nextNumber++;
        return true;
    }

    public getCard(): Card {
        return this.cardArray.shift();
    }
}

export class DealCardArea extends Phaser.GameObjects.Container implements IDropable {
    private cardArray: Card[] = [];
    public readonly maxCards: number = 52;
    public nextNumber = 0;

    public saveCard(card: Card): boolean {
        if (this.cardArray.length >= this.maxCards) return false;
        this.add(card);
        this.cardArray.push(card);
        card.setPosition(0, 50 * (this.cardArray.length-1));
        this.nextNumber = card.number+1;
        return true;
    }

    public getCard(): Card {
        return this.cardArray.shift();
    }
}
