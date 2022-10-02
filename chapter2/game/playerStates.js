import {  Fire } from './particles.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    ROLLING:3,
    HIT:4,
}
class State{
    constructor(state, game){
        this.state=state;
        this.game=game;
    }
}

export class Sitting extends State{
    constructor(game){
        super('SITTING', game);
    }
    enter(){
        this.game.player.width=88.5;
        this.game.player.frameX=0;
        this.game.player.maxFrame=59;
        this.game.player.frameY = 3;
        
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        } else if( input.includes('Enter')){
            //this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y+this.game.player.height *0.5));

            this.game.player.setState(states.ROLLING, 2);
        }
    }
}
export class Running extends State{
    constructor(game){
        super('RUNNING', game);
    }
    enter(){
        this.game.player.width=170.2;
        this.game.player.frameX=0;
        this.game.player.maxFrame=29;
        this.game.player.frameY = 1;
        
    }
    handleInput(input){
        //this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y+this.game.player.height));
        if(input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0);
        }  else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        } else if( input.includes('Enter')){
          //  this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y+this.game.player.height *0.5));

            this.game.player.setState(states.ROLLING, 2);
        }
    }
}
export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
        if(this.game.player.onGround()) this.game.player.vy -=27;
        this.game.player.width=170.2;
        this.game.player.frameX=0;
        this.game.player.maxFrame=29;
        this.game.player.frameY = 1;

    }
    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.RUNNING, 1);
        }else if( input.includes('Enter')){
           // this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y+this.game.player.height *0.5));
            this.game.player.setState(states.ROLLING, 2);
        } else if(input.includes('ArrowDown')){
            this.game.player.setState(states.RUNNING, 0);
        }
    }
}

export class Rolling extends State{
    constructor(game){
        super('ROLLING', game);
    }
    enter(){
        this.game.player.width=170.2;
        this.game.player.frameX=0;
        this.game.player.maxFrame=29;
        this.game.player.frameY = 1;

    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.1, this.game.player.y+this.game.player.height *0.5));
        if(!input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if(!input.includes('Enter') && !this.game.player. onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if(input.includes('Enter') && input.includes('ArrowUp') &&  this.game.player.onGround()){
            this.game.player.vy=-27;
        } else if(input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 0);
        }
    }
}

export class Hit extends State{
    constructor(game){
        super('HIT', game);
    }
    enter(){
        this.game.player.width=170.2;
        this.game.player.frameX=0;
        this.game.player.maxFrame=29;
        this.game.player.frameY = 1;

    }
    handleInput(input){
        if(this.game.player.frameX >= 29 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if(this.game.player.frameX >= 29 && !this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } 
    }
}
