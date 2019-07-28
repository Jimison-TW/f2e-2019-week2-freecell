import { Card, eCardFlower } from './CardComponent';

interface IDropable {
    maxCards: number;
    saveCard(card: Card): boolean;
    removeCard(): Card;
}

export class SingleCardArea extends Phaser.GameObjects.Container implements IDropable {
    private cardArray: Card[] = [];
    public readonly maxCards = 1;

    public saveCard(card: Card): boolean {
        if (this.cardArray.length >= this.maxCards) return false;
        this.add(card);
        this.cardArray.push(card);
        card.setOrigin(0, 0);
        card.setPosition(-card.width / 2, -card.height / 2);
        return true;
    }

    public removeCard(): Card {
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
        card.setOrigin(0, 0);
        card.setPosition(-card.width / 2, -card.height / 2);
        this.nextNumber++;
        return true;
    }

    public removeCard(): Card {
        return this.cardArray.shift();
    }
}

export class DealCardArea extends Phaser.GameObjects.Container implements IDropable {
    private cardArray: Card[] = [];
    public readonly maxCards: number = 52;
    public nextNumber = 0;
    public nextFlower: string[] = [];

    public saveCardAtFirst(card: Card) {
        if (this.cardArray.length > 0) this.cardArray[this.cardArray.length - 1].disableInteractive();
        this.add(card);
        this.cardArray.push(card);
        card.setPosition(0, 50 * (this.cardArray.length - 1));
        this.setNextCardCondition(this.cardArray[this.cardArray.length - 1]);
    }

    public saveCard(card: Card): boolean {
        if (card.flower != this.nextFlower[0] && card.flower != this.nextFlower[1]) {
            console.log(1, this.nextNumber, this.nextFlower);
            return false;
        }
        if (card.number !== this.nextNumber) {
            console.log(2, this.nextNumber, this.nextFlower);
            return false;
        }
        if (this.cardArray.length > this.maxCards || this.nextNumber === 0) {
            console.log(3, this.nextNumber, this.nextFlower);
            return false;
        }
        if (this.cardArray.length > 0) this.cardArray[this.cardArray.length - 1].disableInteractive();
        this.add(card);
        this.cardArray.push(card);
        card.setPosition(0, 50 * (this.cardArray.length - 1));
        // let area = new Phaser.Geom.Rectangle(0, 0, card.width, card.height + (this.cardArray.length - 1) * 50);
        // this.setInteractive(area, Phaser.Geom.Rectangle.Contains);

        this.input.hitArea.setSize(160, 210 + (this.getCardCount() - 1) * 50);
        this.setNextCardCondition(this.cardArray[this.cardArray.length - 1]);
        return true;
    }

    public removeCard(): Card {
        let lastCard = this.cardArray.pop();
        if (this.cardArray.length > 0) {
            this.cardArray[this.cardArray.length - 1].setInteractive();
            this.setNextCardCondition(this.cardArray[this.cardArray.length - 1]);
        }
        return lastCard;
    }

    public getCardCount(): number {
        return this.cardArray.length;
    }

    private setNextCardCondition(lastCard: Card) {
        if (lastCard.flower === 'Club' || lastCard.flower === 'Spade') this.nextFlower = ['Diamond', 'Heart'];
        else this.nextFlower = ['Club', 'Spade'];
        this.nextNumber = lastCard.number - 1;
    }
}
