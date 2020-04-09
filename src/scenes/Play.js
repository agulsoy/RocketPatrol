class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //load images /title sprite
        this.load.image('Rocket', './assets/Rocket.png.png');
        this.load.image('Spaceship', './assets/Spaceship.png.png');
        this.load.image('StarryBackground', './assets/Starryback.png.png');
    }

    create(){
        //place tile sprite
        this.Starryback = this.add.titleSprite(0, 0, 640, 480, 'Starryback').setOrigin(0, 0);

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0.0);
    }

    update(){
        //scroll Starryback
        this.Starryback.tilePositionX -= 4;
    }
}