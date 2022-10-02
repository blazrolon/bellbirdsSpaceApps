class Particle{
    constructor(game){
        this.game=game;
        this.markedDeltion=false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if(this.soze <0.5) this.markedDeletion = true;
    }
}


export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this.image = document.getElementById('fire');
        this.size = Math.random() * 100+100;
        this.x = x;
        this.y = y;
        this.speedX=1;
        this.speedY = 1;
        this.angle=0;
        this.va = Math.random()*0.2-0.1;
    }
    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context){
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle);
        context.drawImage(this.image,-this.size *0.5,-this.size *0.5, this.size, this.size);
        context.restore();
    }
}