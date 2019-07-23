import { Bootloader } from './Bootloader';
import { MainScene } from './scenes/MainScene';

export const CONFIG: any = {
    title: 'Free Cell',
    version: '0.0.1',
    type: Phaser.AUTO,
    backgroundColor: '#22a6b3',
    scale: {
        parent: 'phaser_container',
        width: 1920,
        height: 1150,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    render: {
        pixelArt: false,
    },
    scene: [
        Bootloader,
        MainScene
    ]
};
