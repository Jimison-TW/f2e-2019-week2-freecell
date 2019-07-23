import { buildTargets } from '../constants';
import { DealCardModule } from '../component/DealCard';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainScene'
        });
    }

    init() {
        console.log('MainScene');
        //建立背景
        let bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'freecell_bg');
        for (let i = 0; i < 8; i++) {
            if (i < 4) {
                this.add.image(bg.width / 2 - 800 + 200 * i, 200, 'card_53');
            } else {
                this.add.image(bg.width / 2 - 800 + 200 * (i + 1), 200, 'card_' + (i + 50));
            }
        }
        this.add.image(100, bg.height - 100, 'icon_logo').setOrigin(0.5,0.5);
        this.add.sprite(1800, 850, 'icon_undo').setInteractive();
        this.add.sprite(1800, 950, 'icon_hint').setInteractive();
        this.add.sprite(1800, 1050, 'icon_restart').setInteractive();
        this.add
            .text(bg.width / 2, 160, 'Time', <Phaser.Types.GameObjects.Text.TextSyle>{
                fontSize: '60px',
                strokeThickness: 5
            })
            .setOrigin(0.5, 0.5);

        let cardArea = this.add.container(200, 350);
        DealCardModule.dealCard(this, cardArea);
    }

    create(): void {}
}
