//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add an object to the existing scene
        scene.add.existing(this); //add to existing scene, displayList, and updateList
        this.isFiring = false;   //track rocket's firing steps

    }

    update() {
        //left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 4;
            } else if(keyRIGHT.isDown && this.x <= 598){
                this.x += 4;
            }
        }
        // fire button (NOT spacebar)
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
        }
        //if fired move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }
    }
}