import * as CardComponent from './component/CardComponent';
import { SingleCardArea, CardHomeArea, DealCardArea, IDropable } from './component/DropArea';

export module MissionDataKeeper {
    let initialCardInfo: CardComponent.CardInfo[];
    export function saveInitCardInfo(cardInfos: CardComponent.CardInfo[]) {
        initialCardInfo = cardInfos;
    }

    export function getInitCardInfo(): CardComponent.CardInfo[] {
        return initialCardInfo;
    }

    let singles: SingleCardArea[] = [];
    export function saveSingleCardArea(container: SingleCardArea) {
        singles.push(container);
        container.index = singles.length - 1;
    }

    export function getSingleByIndex(index: number): SingleCardArea {
        return singles[index];
    }

    export function getSingleContainers(): SingleCardArea[] {
        return singles;
    }

    let cardHomes: CardHomeArea[] = [];
    export function saveCardHomeArea(container: CardHomeArea) {
        cardHomes.push(container);
        container.index = cardHomes.length - 1;
    }

    export function getHomeByIndex(index: number): CardHomeArea {
        return cardHomes[index];
    }

    export function getHomeContainers(): CardHomeArea[] {
        return cardHomes;
    }

    let dealContainers: DealCardArea[] = [];
    export function saveDealCardArea(container: DealCardArea) {
        dealContainers.push(container);
        container.index = dealContainers.length - 1;
    }

    export function getDealByIndex(index: number): DealCardArea {
        return dealContainers[index];
    }

    export function getDealContainers(): DealCardArea[] {
        return dealContainers;
    }

    let lastPos: Phaser.Math.Vector2;
    let dropCard: CardComponent.Card;
    let dragContainer: IDropable;
    let dropContainer: IDropable;
    export function setLastPos(pos: Phaser.Math.Vector2) {
        lastPos = pos;
    }

    export function getLastPos(): Phaser.Math.Vector2 {
        return lastPos;
    }

    export function setDropCard(card: CardComponent.Card) {
        dropCard = card;
    }

    export function getDropCard(): CardComponent.Card {
        return dropCard;
    }

    export function setDragContainer(container: IDropable) {
        dragContainer = container;
    }

    export function getDragContainer(): IDropable {
        return dragContainer;
    }

    export function setDropContainer(container: IDropable) {
        dropContainer = container;
    }

    export function getDropContainer(): IDropable {
        return dropContainer;
    }

    export function clearDragDropData() {
        dropCard = undefined;
        dragContainer = undefined;
        dropContainer = undefined;
    }
}
