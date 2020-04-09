class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create(){
        
        //Display Menu text
        this.add.text(20, 20, "Rocket Patrol Menu");
        
        //Launch the next scene
        this.scene.start("playScene");
    }
}