class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //load images /title sprite
        this.load.image('Rocket', './assets/Rocket.png');
        this.load.image('Spaceship', './assets/Spaceship.png');
        this.load.image('Starryback', './assets/Starryback.png');
    }

    create(){
        //place tile sprite
        this.Starryback = this.add.tileSprite(0, 0, 640, 480, 'Starryback').setOrigin(0, 0);
        console.log(this);

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0.0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'Rocket').setScale(3, 3).setOrigin(0.5, 0.5);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width +192, 60, 'Spaceship', 0, 30).setScale(4, 4).setOrigin(0, 0); 
        this.ship02 = new Spaceship(this, game.config.width + 96, 120, 'Spaceship', 0, 20).setScale(4, 4).setOrigin(0, 0); 
        this.ship03 = new Spaceship(this, game.config.width, 200, 'Spaceship', 0, 10).setScale(4, 4).setOrigin(0, 0); 

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 

    }

    update(){
        //scroll Starryback
        this.Starryback.tilePositionX -= 4;

        //update Rocket
        this.p1Rocket.update();

        //update spaceships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
    }
}