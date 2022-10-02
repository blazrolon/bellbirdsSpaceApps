class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height  = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x=0;
        this.y = 0;
    }
    update(){
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.layer1Image=document.getElementById('layer1');
        this.layer2Image=document.getElementById('layer2');
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 1, this.layer2Image);
        this.backgroundLayers = [this.layer1, this.layer2];
        
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}