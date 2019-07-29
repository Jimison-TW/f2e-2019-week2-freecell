export module Timer {
    let timerText: Phaser.GameObjects.Text;
    let minutes: number = 0;
    let seconds: number = 0;

    export function createTimerText(scene: Phaser.Scene, x: number, y: number) {
        timerText = scene.add
            .text(x, y, '00:00', <Phaser.Types.GameObjects.Text.TextSyle>{
                fontSize: '60px',
                strokeThickness: 5
            })
            .setOrigin(0.5, 0.5);
        scene.time.addEvent({
            delay: 1000,
            callback: setTimerText,
            callbackScope: this,
            loop: true
        });
    }

    function setTimerText() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        let tMinutes: string = '';
        let tSeconds: string = '';
        if (minutes < 10) {
            tMinutes = '0' + minutes;
        }else {
            tMinutes = minutes + '';
        }
        if (seconds < 10) {
            tSeconds = '0' + seconds;
        } else {
            tSeconds = seconds + '';
        }
        timerText.setText(tMinutes + ':' + tSeconds);
    }
}
