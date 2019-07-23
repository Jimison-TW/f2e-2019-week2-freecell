export class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Bootloader'
        });
        console.log('Scene Bootloader');
    }

    preload(): void {
        this.load.setPath('assets/card');
        this.load.image('card_01'); 
        this.load.image('card_02');        
        this.load.image('card_03'); 
        this.load.image('card_04');        
        this.load.image('card_05');        
        this.load.image('card_06');        
        this.load.image('card_07');        
        this.load.image('card_08');        
        this.load.image('card_09');        
        this.load.image('card_10');        
        this.load.image('card_11');        
        this.load.image('card_12');        
        this.load.image('card_13');        
        this.load.image('card_14');        
        this.load.image('card_15');        
        this.load.image('card_16');        
        this.load.image('card_17');        
        this.load.image('card_18');        
        this.load.image('card_19');        
        this.load.image('card_20');        
        this.load.image('card_21');        
        this.load.image('card_22');        
        this.load.image('card_23');        
        this.load.image('card_24');        
        this.load.image('card_25');        
        this.load.image('card_26');        
        this.load.image('card_27');        
        this.load.image('card_28');        
        this.load.image('card_29');        
        this.load.image('card_30');        
        this.load.image('card_31');        
        this.load.image('card_32');        
        this.load.image('card_33');        
        this.load.image('card_34');        
        this.load.image('card_35');        
        this.load.image('card_36');        
        this.load.image('card_37');        
        this.load.image('card_38');        
        this.load.image('card_39');        
        this.load.image('card_40');        
        this.load.image('card_41');        
        this.load.image('card_42');        
        this.load.image('card_43');        
        this.load.image('card_44');        
        this.load.image('card_45');        
        this.load.image('card_46');        
        this.load.image('card_47');        
        this.load.image('card_48');        
        this.load.image('card_49');        
        this.load.image('card_50');        
        this.load.image('card_51');        
        this.load.image('card_52');        
        this.load.image('card_53');        
        this.load.image('card_54');        
        this.load.image('card_55');        
        this.load.image('card_56');        
        this.load.image('card_57');   

        this.load.setPath('assets/img');        
        this.load.image('freecell_bg');         
        this.load.image('freecell_hint');          
        this.load.image('icon_hint');          
        this.load.image('icon_logo');          
        this.load.image('icon_restart');          
        this.load.image('icon_undo');           

        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });
    }

}
