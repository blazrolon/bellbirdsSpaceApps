const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
const collisionCanvas = document.getElementById('collisionCanvas')
const collisionctx= collisionCanvas.getContext('2d')
collisionCanvas.width = window.innerWidth;
collisionCanvas.height= window.innerHeight;

let score = 0;
let gameOver=false;
ctx.font = '50px Impact';

let timetoNext = 0;
let shipInterval = 800;
let lastTime = 0;

let spaceship = [];
class Ship{
    constructor(){
        this.spriteWidth = 355;
        this.spriteHeight = 250;
        this.sizeModifier=Math.random() * 0.6 +0.4;
        this.width=this.spriteWidth * this.sizeModifier;
        this.height=this.spriteHeight * this.sizeModifier;
        this.x=canvas.width;
        this.y=Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedDeletion = false;
        this.image = new Image();
        this.image.src = 'ufo.png';
        this.randomColors=[Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0]+ ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(){
        if (this.y <0 || this.y>canvas.height - this.height){
            this.directionY=this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y +=this.directionY;
        if (this.x <0 - this.width) this.markedDeletion = true;
        particles.push(new Particle(this.x, this.y, this.width, this.color));
        
    }
    draw(){
        collisionctx.fillStyle = this.color;
        collisionctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosions = [];
class Explosions{
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = 'bubble.png';
        this.spriteWidth = 200;
        this.spriteHeight = 260;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame=0;
        this.sound = new Audio();
        this.sound.src = 'explosion.wav';
        this.timeSinceLast = 0;
        this.frameInterval = 100;
        this.markedDeletion = false;
    }
    update(deltatime){
        if (this.frame ===0) this.sound.play();
        this.timeSinceLast += deltatime;
        if (this.timeSinceLast > this.frameInterval){
            this.frame++;
            this.timeSinceLast = 0;
            if (this.frame > 4) this.markedDeletion = true;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x,this.y, this.size, this.size);
    }
}

let particles = [];
class Particle{
    constructor(x,y,size, color){
        this.size=size;
        this.x=x + this.size;
        this.y = y + this.size/2;
        this.radius = Math.random() * this.size/20;
        this.maxRad = Math.random() * 5;
        this. markedDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }
    update(){
        this.x += this.speedX;
        this.radius += 0.2;
        if (this.radius > this.maxRadius) this.markedDeletion = true;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(128, 128, 128, 0.05)';
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
    }
}
//const ship = new Ship();
function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}

function drawOver(){
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width/2, canvas.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width/2+5, canvas.height/2 + 5);
}

window.addEventListener('click', function(e){
    const detectPixelColor = collisionctx.getImageData(e.x, e.y, 1, 1);
    console.log(detectPixelColor);
    const pc = detectPixelColor.data;
    spaceship.forEach(object => {
        if(object.randomColors[0]=== pc[0] && object.randomColors[1]=== pc[1] && object.randomColors[2]=== pc[2]){
            object.markedDeletion = true;
            score++;
            explosions.push(new Explosions(object.x, object.y, object.width));
            console.log(explosions);
            if(score == 20) gameOver = true;
        }
    });
});

function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionctx.clearRect(0, 0, canvas.width, canvas.height);
 //   ship.update();
  //  ship.draw();
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timetoNext+=deltatime;
    if(timetoNext>shipInterval){
        spaceship.push(new Ship());
        timetoNext=0;
        spaceship.sort(function(a,b){
            return a.width - b.width;
        });
        //console.log(spaceship);
    };
    drawScore();
    [...spaceship, ...explosions, ...particles].forEach(object => object.update(deltatime));
    [...spaceship, ...explosions, ...particles].forEach(object => object.draw());
    spaceship = spaceship.filter(object => !object.markedDeletion);
    explosions = explosions.filter(object => !object.markedDeletion);
    particles = particles.filter(object => !object.markedDeletion);
  
    //console.log(timestamp);
    if (!gameOver) requestAnimationFrame(animate);
    else drawOver();

}
animate(0);