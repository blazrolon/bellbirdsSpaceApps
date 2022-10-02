const startTime = Date.now();

const backgroundOptions = [
    'bg-primary',
    'bg-success',
    'bg-warning',
    'bg-danger',
    'bg-secondary',
];
const timerBars = document.querySelectorAll('.progress-bar');

const timerValues = [100,100,100,100,100,100];

function chooseRnd(max){
    return Math.floor(Math.random()*max);
}


for(let i=0; i<timerBars.length; i++){
    // timerBars[i].classList.add(backgroundOptions[chooseRnd(backgroundOptions.length)]);
    timerBars[i].style.width='100%';

}


let speed = 0.1;
function alterTimer(){
    if(secs===15){
        youWin();
        return;
    }

    for(let i=0; i<timerBars.length; i++){
        if(timerValues[i]<1){
            gameOver();
            return;   
        }
        timerValues[i]-=speed;
        
        if( timerValues[i]>=70){
            timerBars[i].classList.add(backgroundOptions[1]);
        }
        if(timerValues[i]<70 && timerValues[i]>40){
            timerBars[i].classList.add(backgroundOptions[2]);
        }
        if(timerValues[i]<=40){
            timerBars[i].classList.add(backgroundOptions[3]);
        }

        
        timerBars[i].style.width = timerValues[i]+'%';
    }
}

var goSw = false;
function gameOver(){
    const gameOverTime = new Date(Date.now()-startTime);
    goSw=true;
    document.querySelector('#gameOver').classList.remove('d-none');    
    const score = document.querySelector('#game-over-score');
    score.innerText=String(secs)+'s';
    console.log(score);
    
}

function youWin(){
    const youWin = document.querySelector('#youWin').classList.remove('d-none');   
}

// setInterval(alterTimer, 30);

const glassWindows = document.querySelectorAll('.glass');
const glassValues = [0,0,0,0,0,0];

function alterBlur(){
    for(let i=0; i<glassWindows.length; i++){
        glassValues[i]+=speed/100
        glassWindows[i].style.opacity = glassValues[i];

        if(glassValues[i]===1){
            glassValues[i]=0;
        }



        // console.log(glassWindows[i].style.opacity);
    }
}

// setInterval(alterBlur,30)

let a =10;
function alterLvl(){
    const nivel = document.querySelector('#nivel');

    nivel.textContent= a-1+'%';
    a-=1
}

setInterval(()=>{
    alterTimer();
    alterBlur();
}, 30);

var secs=0;
setInterval(()=>{
    document.querySelector('#timer').textContent=secs;
    if(secs<15 && !goSw){
        secs+=1;
    }
},1000);

const noBlurWindows=document.querySelectorAll('.glass-noblur');

for(let i=0; i<noBlurWindows.length; i++){
    noBlurWindows[i].addEventListener('click', (e)=>{
        glassValues[i]=0;
        timerValues[i]=100;
        timerBars[i].classList.add(backgroundOptions[1]);
        speed+=0.03;
    });
}


function javascript_abort()
{
   throw new Error('GameOver');
}