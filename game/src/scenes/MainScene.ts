import { buildTargets } from '../constants';
import { DealCardModule } from '../component/DealCardModule';
import { SingleCardArea, CardHomeArea, DealCardArea } from '../component/DropArea';
import { Card, eCardFlower } from '../component/CardComponent';
import { Timer } from '../component/Timer';

export class MainScene extends Phaser.Scene {
    private dealCardContainers: DealCardArea[] = [];

    constructor() {
        super({
            key: 'MainScene'
        });
    }

    init() {
        //建立背景
        let bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'freecell_bg').setInteractive();
        bg.input.dropZone = true;
        for (let i = 0; i < 8; i++) {
            if (i < 4) {
                let singleBg = this.add.image(bg.width / 2 - 800 + 200 * i, 200, 'card_53');
                let dropArea = new SingleCardArea(this, bg.width / 2 - 800 + 200 * i, 200).setSize(singleBg.width, singleBg.height).setInteractive();
                this.add.existing(dropArea);
                dropArea.input.dropZone = true;
            } else {
                let homeArea = this.add.image(bg.width / 2 - 800 + 200 * (i + 1), 200, 'card_' + (i + 50));
                let dropArea = new CardHomeArea(this, i - 4)
                    .setPosition(bg.width / 2 - 800 + 200 * (i + 1), 200)
                    .setSize(homeArea.width, homeArea.height)
                    .setInteractive();
                this.add.existing(dropArea);
                dropArea.input.dropZone = true;
            }
        }
        this.add.image(100, bg.height - 100, 'icon_logo').setOrigin(0.5, 0.5);
        let undo = this.add.sprite(1800, 850, 'icon_undo').setInteractive();
        undo.on('pointerdown', pointer => {
            console.log('undo click');
        });
        let hint = this.add.sprite(1800, 950, 'icon_hint').setInteractive();
        hint.on('pointdown', () => {
            console.log('hint click');
        });
        let restart = this.add.sprite(1800, 1050, 'icon_restart').setInteractive();
        restart.on('pointdown', () => {
            console.log('restart click');
        });
        this.add
            .text(bg.width / 2, 160, 'Time', <Phaser.Types.GameObjects.Text.TextSyle>{
                fontSize: '60px',
                strokeThickness: 5
            })
            .setOrigin(0.5, 0.5);
        Timer.createTimerText(this,bg.width / 2, 230)

        for (let i = 0; i < 8; i++) {
            let cardArea = new DealCardArea(this, i * 190 + 200, 350);
            this.add.existing(cardArea);
            this.dealCardContainers.push(cardArea);
        }
        DealCardModule.dealCard(this, this.dealCardContainers);

        let lastContainer: DealCardArea = null;
        this.input.on(
            'dragstart',
            function(pointer, gameObject) {
                console.log('dragstart');
                if (gameObject instanceof Card) {
                    let pos = new Phaser.Math.Vector2(gameObject.x, gameObject.y);
                    gameObject.currentPos = pos;
                    lastContainer = <DealCardArea>gameObject.parentContainer;
                }
                this.children.bringToTop(gameObject);
            },
            this
        );
        this.input.on(
            'drop',
            function(pointer, gameObject, dropZone) {
                let card = gameObject as Card;
                if (dropZone instanceof SingleCardArea) {
                    console.log('SingleCardArea');
                    let result = dropZone.saveCard(card);
                    if (!result) {
                        card.setPosition(card.currentPos.x, card.currentPos.y);
                    } else {
                        console.log(1);
                        lastContainer.removeCard();
                    }
                    dropZone.bringToTop(gameObject);
                } else if (dropZone instanceof CardHomeArea) {
                    console.log('CardHomeArea');
                    let result = dropZone.saveCard(card);
                    if (!result) {
                        card.setPosition(card.currentPos.x, card.currentPos.y);
                    } else {
                        console.log(2);
                        lastContainer.removeCard();
                    }
                    dropZone.bringToTop(gameObject);
                } else if (dropZone instanceof DealCardArea) {
                    console.log('DealCardArea');
                    let result = dropZone.saveCard(card);
                    if (!result) {
                        card.setPosition(card.currentPos.x, card.currentPos.y);
                    } else {
                        console.log(3);
                        lastContainer.removeCard();
                    }
                    dropZone.bringToTop(gameObject);
                } else {
                    card.setPosition(card.currentPos.x, card.currentPos.y);
                }
            },
            this
        );
    }

    create(): void {}
}
