export module DealCardModule {
    export function dealCard(scene: Phaser.Scene, container: Phaser.GameObjects.Container) {
        let textures = createCardTexture();
        let rowIndex = -1;
        for (let i = 0; i < textures.length; i++) {
            let columnIndex = i % 8;
            if (columnIndex === 0) rowIndex++;
            let sp = scene.add.sprite(columnIndex * 190, 50 * rowIndex, textures[i]).setOrigin(0, 0);
            container.add(sp);
        }
    }

    function createCardTexture(): string[] {
        let cardTextures: string[] = [];
        for (let i = 1; i < 53; i++) {
            if (i < 10) {
                cardTextures.push('card_0' + i);
            } else {
                cardTextures.push('card_' + i);
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
