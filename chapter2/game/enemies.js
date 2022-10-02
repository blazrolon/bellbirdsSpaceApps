class Enemy {
    constructor(){
        this.frameX=0;
        this.frameY=0;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.markedDeletion = false;
    }
    update(deltatime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer =0;
            if(this.frameX<this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltatime;
        }
        if (this.x + this.width <0) this.markedDeletion = true;

    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image, 0, 0, this.width, this.height,this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        super();
        this.game=game;
        this.width=64;
        this.height =64;
        this.x= this.game.width + Math.random() * this.game.width * 0.5;
        this.y= Math.random() * this.game.height * 0.4;
        this.speedX=Math.random() + 1;
        this.speedY=0;

        this.image = document.getElementById('enemy_fly');
        this.angle=0;
        this.va =Math.random()* 0.1 +0.1;
    }
    update(deltatime){
        super.update(deltatime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game =game;
        this.width=101;
        this.height = 83;
        this.x=this.game.width;
        this.y=this.game.height - this.height -this.game.groundMargin;
        this.image = document.getElementById('enemy_plant');
        this.speedX=0;
        this.speedY=0;

    }
    
}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game =game;
        this.width=80;
        this.height =80;
        this.x=this.game.width;
        this.y=Math.random() * this.game.height * 0.5;
        this.image = document.getElementById('enemy_spider');
        this.speedX=0;
        this.speedY= Math.random() > 0.5 ? 1 : -1;

    }
    update(deltatime){
        super.update(deltatime);
        if (this.y> this.game.height - this.height -this.game.groundMargin) this.speedY *= -1;
        if(this.y < -this.height) this.markedDeletion =true;
    }
    draw(context){
        super.draw(context);

    }
}