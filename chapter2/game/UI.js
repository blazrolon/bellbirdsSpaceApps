export class UI{
    constructor(game){
        this.game=game;
        this.fontSize = 30;
        this.fontFamily='Bungee Spice';
        this.livesImage = document.getElementById('lives');
        this.button = document.getElementById('reset-button');
        this.modal1 = document.getElementById('modal1');
        this.modal2 = document.getElementById('modal2');
    
    }
    draw(context){
        context.save();
        context.font=this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        //score
        context.fillText('Score: ' + this.game.score, 25, 45);
        //timer
        //context.font = this.fontSize * 0.8 + 'px ' +this.fontFamily;
        //context.fillText('Time: ' + (this.game.time *0.001).toFixed(1), 20, 80);
        //lives
        for(let i=0;i<this.game.lives;i++){
            context.drawImage(this.livesImage, 25 *i +25 ,50,25,25)
        }
        
        //game over message
        if(this.game.gameOver){
            //context.textAlign = 'center';
            //context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            
            
            //button.addEventListener('click', sayHi);
            
            if(this.game.score===this.game.winningScore){
                this.modal2.classList.add('open');
                //context.fillText('Congrats!', this.game.width * 0.5, this.game.height * 0.5);

            } else{
                this.modal1.classList.add('open');
                
                context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5);

            }
        }
        
        context.restore();
    }
     
}
