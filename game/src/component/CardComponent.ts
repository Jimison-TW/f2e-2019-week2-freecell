import { GameObjects } from 'phaser';

export enum eCardFlower {
    Steak,
    Tomato,
    Vegetable,
    Bread
}

export interface CardInfo {
    index: number;
    number: number;
    flower: string;
    cTexture: string;
}

export class Card extends GameObjects.Image implements CardInfo {
    public readonly index: number = undefined;
    public readonly number: number = undefined;
    public readonly flower: string = undefined;
    public readonly cTexture: string = undefined;

    constructor(scene: Phaser.Scene, info: CardInfo) {
        super(scene, 0, 0, info.cTexture);
        this.index = info.index;
        this.number = info.number;
        this.flower = info.flower;
        this.cTexture = info.cTexture;
        this.setInteractive();
        scene.input.setDraggable(this);
    }

    private _currentPos: Phaser.Math.Vector2;
    public set currentPos(pos: Phaser.Math.Vector2) {
        this._currentPos = pos;
    }

    public get currentPos(): Phaser.Math.Vector2 {
        return this._currentPos;
    }
}
