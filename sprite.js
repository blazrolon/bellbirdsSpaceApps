var flag = 0;
var img2;
var count=0;
var ref;
var segundo = "segundo";
var tercero = "tercero";
var cuarto = "cuarto";
var quinto = "quinto";
var sexto = "sexto";
var intro = "intro/intro.html"
var ch1 = "chapter1/dist/chap1.html";
var ch2 = "chapter2/game/chap2.html";
var ch3 = "chapter3/ch3.html";
var ch4 = "chapter4/chap4.html";
var gallery = "gallery/gallery.html";
var canWidth = 1500;
var canHeight = 200;
//frame position
var x = -150;
var y = 30;
var newx;
var newy;
var img;
function position2(newx) {
    newx = newx;
}
//png position
var srcX;
var srcY;

var sheetWidth = 10620
var sheetHeight = 400

var frameCount = 60

var width = sheetWidth / frameCount
var height = sheetHeight

var currentFrame = 0;

var character = new Image();
character.src = "src/spriteStandRight.png"

var canvas = document.getElementById('canvas');
canvas.width = canWidth;
canvas.height = canHeight;
var ctx = canvas.getContext('2d');

function updateFrame() {
    ctx.clearRect(x, y, width, height);
    currentFrame = ++currentFrame % frameCount;
    srcX = currentFrame * width
    srcY = 0
    if (x < newx) {
        x += 5;
        if ((newx - x) == 5) {
            count = count + 1;
            var edit_save = document.getElementById(img2);
            edit_save.src = "src/" + img2 + ".png";
            console.log(ref)
            var win = window.open(ref,'_blank');
        }
    }
    
    ctx.clearRect(x, y, width, height);
}

function drawImage() {
    updateFrame();
    ctx.drawImage(character, srcX, srcY, width, height, x, y, width / 2.5, height / 2.5)
    character.src = "src/spriteStandRight.png";
}
var velocity = 20;
setInterval(function () {
    drawImage();
}, velocity);
function start(newxx,img,refe) {
    if ((newxx - x) < 400) {
        flag = 0;
        img2 = img
        newx = newxx;
        ref = refe;
        // var edit_save = document.getElementById(img2);
        // edit_save.src = "src/" + img + ".png";
    }
}


