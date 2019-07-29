import * as CardComponent from './CardComponent';
import { DealCardArea } from './DropArea';

export module DealCardModule {
    export function dealCard(scene: Phaser.Scene, container: DealCardArea[], infos: CardComponent.CardInfo[]) {
        let rowIndex = -1;
        for (let i = 0; i < infos.length; i++) {
            let columnIndex = i % 8;
            if (columnIndex === 0) rowIndex++;
            let card = new CardComponent.Card(scene, infos[i])
                .setPosition(0, 0)
                .setTexture(infos[i].cTexture)
                .setOrigin(0, 0);
            card.setInteractive();
            card.on('drag', function(pointer, dragX, dragY) {
                card.x = dragX;
                card.y = dragY;
            });
            container[columnIndex].saveCardAtFirst(card);
        }

        for (let c of container) {
            let area = new Phaser.Geom.Rectangle(0, 0, 160, 210 + (c.getCardCount() - 1) * 50);
            c.setInteractive(area, Phaser.Geom.Rectangle.Contains);
            c.input.dropZone = true;
        }
    }

    export function createCardTexture() {
        let cardTextures: CardComponent.CardInfo[] = [];
        for (let i = 1; i < 53; i++) {
            let n = i % 13;
            if (n === 0) n = 13;
            let f = Math.ceil(i / 13) - 1;
            let flower = CardComponent.eCardFlower[f];
            if (i < 10) {
                cardTextures.push({ index: i, number: n, flower: flower, cTexture: 'card_0' + i });
            } else {
                cardTextures.push({ index: i, number: n, flower: flower, cTexture: 'card_' + i });
            }
        }
        for (let i = 0; i < 52; i++) {
            let tmp = cardTextures[i];
            let random = Math.floor(Math.random() * 52);
            cardTextures[i] = cardTextures[random];
            cardTextures[random] = tmp;
        }

        return cardTextures;
    }
}
