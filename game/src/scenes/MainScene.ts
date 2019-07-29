import { buildTargets } from '../constants';
import { DealCardModule } from '../component/DealCardModule';
import { SingleCardArea, CardHomeArea, DealCardArea } from '../component/DropArea';
import { Card, CardInfo } from '../component/CardComponent';
import { Timer } from '../component/Timer';
import { MissionDataKeeper } from '../MissionDataKeeper';

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
                MissionDataKeeper.saveSingleCardArea(dropArea);
            } else {
                let homeArea = this.add.image(bg.width / 2 - 800 + 200 * (i + 1), 200, 'card_' + (i + 50));
                let dropArea = new CardHomeArea(this, i - 4)
                    .setPosition(bg.width / 2 - 800 + 200 * (i + 1), 200)
                    .setSize(homeArea.width, homeArea.height)
                    .setInteractive();
                this.add.existing(dropArea);
                dropArea.input.dropZone = true;
                MissionDataKeeper.saveCardHomeArea(dropArea);
            }
        }
        this.add.image(100, bg.height - 100, 'icon_logo').setOrigin(0.5, 0.5);

        this.add
            .text(bg.width / 2, 160, 'Time', <Phaser.Types.GameObjects.Text.TextSyle>{
                fontSize: '60px',
                strokeThickness: 5
            })
            .setOrigin(0.5, 0.5);
        Timer.createTimerText(this, bg.width / 2, 230);

        for (let i = 0; i < 8; i++) {
            let cardArea = new DealCardArea(this, i * 190 + 200, 350);
            this.add.existing(cardArea);
            this.dealCardContainers.push(cardArea);
            MissionDataKeeper.saveDealCardArea(cardArea);
        }

        let infos: CardInfo[] = DealCardModule.createCardTexture();
        DealCardModule.dealCard(this, this.dealCardContainers, infos);
        MissionDataKeeper.saveInitCardInfo(infos);

        let lastContainer: DealCardArea = null;
        this.input.on(
            'dragstart',
            function(pointer, gameObject) {
                console.log('dragstart');
                if (gameObject instanceof Card) {
                    let pos = new Phaser.Math.Vector2(gameObject.x, gameObject.y);
                    gameObject.currentPos = pos;
                    lastContainer = <DealCardArea>gameObject.parentContainer;
                    MissionDataKeeper.setLastPos(pos);
                    MissionDataKeeper.setDragContainer(lastContainer);
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
                    MissionDataKeeper.clearDragDropData();
                }
                MissionDataKeeper.setDropCard(card);
                MissionDataKeeper.setDropContainer(dropZone);
            },
            this
        );

        let undo = this.add.sprite(1800, 850, 'icon_undo').setInteractive();
        undo.on('pointerdown', pointer => {
            console.log('undo click');
            let lastPos = MissionDataKeeper.getLastPos();
            let card = MissionDataKeeper.getDropCard();
            let drag = MissionDataKeeper.getDragContainer();
            let drop = MissionDataKeeper.getDropContainer();
            if (card === undefined || drag === undefined || drop === undefined) return;
            console.log(drag, drop, card);
            card.setPosition(lastPos.x, lastPos.y);
            drag.saveCard(card);
            drop.removeCard();
        });
        let hint = this.add.sprite(1800, 950, 'icon_hint').setInteractive();
        hint.on('pointerdown', () => {
            console.log('hint click');
        });
        let restart = this.add.sprite(1800, 1050, 'icon_restart').setInteractive();
        restart.on('pointerdown', () => {
            console.log('restart click');
            let singles = MissionDataKeeper.getSingleContainers();
            for (let item of singles) {
                item.reset();
            }
            let homes = MissionDataKeeper.getHomeContainers();
            for (let item of homes) {
                item.reset();
            }
            let deals = MissionDataKeeper.getDealContainers();
            for (let item of deals) {
                item.reset();
            }

            let cardInfos = MissionDataKeeper.getInitCardInfo();
            DealCardModule.dealCard(this, deals, cardInfos);

            Timer.resetTimer();
        });
    }

    create(): void {}
}
