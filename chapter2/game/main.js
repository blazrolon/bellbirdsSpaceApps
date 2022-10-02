import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js'
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js'
import { UI } from './UI.js'
//const openBtn = document.getElementById('openModalBtn');
//const closeBtn = document.getElementById('closeModalBtn');
//const modal = document.getElementById('modal');

//openBtn.addEventListener('click', () => {
//	modal.classList.add('open');
//});

//closeBtn.addEventListener('click', () => {
//	modal.classList.remove('open');
//});
var splashScreen = document.querySelector('.splash');
//onst splashScreen = document.getElementById('splashscreen');
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
  },610)
});

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height=window.innerHeight;
    
    class Game{
        constructor(width, height){
            this.width=width;
            this.height=height;
            this.groundMargin=window.innerHeight-window.innerHeight*0.8;
            this.speed=0;
            this.maxSpeed=3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles=[];
            this.collisions = [];
            this.floatingMessages =[];
            this.maxParticles = 50;
            this.enemiesTimer=0;
            this.enemiesInterval = 1000;
            this.debug =false;
            this.score=0;
            this.winningScore=50;
            //this.fontColor='black';
            this.time=0;
            this.maxTime=30000;
            this.gameOver=false;
            this.lives=18;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltatime){
            this.time += deltatime;
            if(this.score=== this.winningScore) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltatime);
            //handler
            if (this.enemiesTimer>this.enemiesInterval){
                this.addEnemy();
                this.enemiesTimer=0;
            } else{
                this.enemiesTimer += deltatime;
            }
            this.enemies.forEach(enemy=> {
                enemy.update(deltatime);
                if (enemy.markedDeletion) this.enemies.splice (this.enemies.indexOf(enemy), 1);
            });
            //handle messages
            this.floatingMessages.forEach(message=> {
                message.update();
            });
            //handle particles
            this.particles.forEach((particle, index)=> {
                particle.update();
                if(particle.markedDeletion) this.particles.splice(index,1);
            });
            if(this.particles.length > this.maxParticles){
                this.particles.length = this.maxParticles;
            }
            //handle collision sprites
            this.collisions.forEach((collision, index)=> {
                collision.update(deltatime);
                if(collision.markedDeletion) this.collisions.splice(index, 1);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedDeletion);
            this.particles = this.particles.filter(particle => !particle.markedDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedDeletion);

        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy=> {
                enemy.draw(context);
            });
            this.particles.forEach(particle =>{
                particle.draw(context);
            });
            this.collisions.forEach(collision =>{
                collision.draw(context);
            });
            this.floatingMessages.forEach(message=> {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed >0 && Math.random() <0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed>0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this))
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime=0;

    function animate(timestamp){
        const deltatime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.update(deltatime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);

});
