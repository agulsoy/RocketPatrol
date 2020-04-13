//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        //add an object to the existing scene
        scene.add.existing(this); //add to existing scene, displayList, and updateList
        this.points = pointValue;
    }

    update() {
        //move spaceship left
        this.x -= 3;
        //wrap around screen bounds
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
}