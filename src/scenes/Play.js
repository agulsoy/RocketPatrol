class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //load images /title sprite
        this.load.image('Rocket', './assets/Rocket.png');
        this.load.image('Spaceship', './assets/Spaceship.png');
        this.load.image('Starryback', './assets/Starryback.png');
        this.load.spritesheet('Explosion', './assets/Explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 10});
    }

    create(){
        //place tile sprite
        this.Starryback = this.add.tileSprite(0, 0, 640, 480, 'Starryback').setOrigin(0, 0);
        console.log(this);
        
        //add background music
         this.bgm = this.sound.add('backgroundMusic');

        //play music continuously
         this.bgm.play();

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0.0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'Rocket').setScale(0.5, 0.5).setOrigin(0.5, 0.5);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width +192, 132, 'Spaceship', 0, 30).setOrigin(0, 0); 
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'Spaceship', 0, 20).setOrigin(0, 0); 
        this.ship03 = new Spaceship(this, game.config.width, 260, 'Spaceship', 0, 10).setOrigin(0, 0); 

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('Explosion', {start: 0, end: 10, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //FIRE text
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.fireText = this.add.text(game.config.width/2, game.config.height, fireConfig).setOrigin(0, 0);

        //Display Text 
        //let centerX = game.config.width/2;
        //let centerY = game.config.height;
        //let textSpacer = 64;
        //this.add.text(centerX, centerY, 'FIRE COMPUTER', fireConfig).setOrigin(0, 0);

        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){

        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        //check key input for Menu Screen
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        //scroll Starryback
        this.Starryback.tilePositionX -= 4;

        if(!this.gameOver){
            this.p1Rocket.update(); //update Rocket
            this.ship01.update();   //update spaceships(x3)
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }
    
    checkCollision(rocket, ship){
    //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else{
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0; //temporarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'Explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //play explode animation
        boom.on('animationcomplete', () => {    //callback after animation complete
            ship.reset();   //reset ship position
            ship.alpha = 1; //make ship visible again
            boom.destroy(); //remove explosion sprite
        });
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}