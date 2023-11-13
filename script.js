var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");

// Display settings
var minW = 0;
var minH = 0;
var maxW = canvas1.width;   //width is 800 pixels
var maxH = canvas1.height;   //height is 800 pixels
var bgHue = "#777777";

var pixS = 10;
var pCX = Math.floor(maxW / pixS);  // count of pixels across the screen
var pCY = Math.floor(maxH / pixS);  // count of pixels across the screen

var pCXW = 1000;      // count of pixels across the world
var pCYW = 700;       // count of pixels across the world

var pA = new Array(pCY);

var cloneA = new Array(pCY);


var tickS = 100;

function genWorld() {
    pAinv = new Array(pCXW)
    var alt = 20
    var altV = 0
    for (var x = 0; x < pCXW; x++){
        temp_y = new Array(pCYW);
        altV += (Math.random() - .5) * .1
        alt += altV
        altV *= .9
        for (var y = 0; y < pCYW; y++){
            r = Math.random();

            if(y < alt){
                temp_y[y] = 1;
            }
            else{
                temp_y[y] = 0;
            }
        }
        pAinv[x] = temp_y
    }

    //transpose
    for(var y = 0; y < pCYW; y++){
        temp_x = new Array(pCXW);
        for(var x = 0; x < pCXW; x++){
            temp_x[x] = pAinv[x][y]
        }
        pA[y] = temp_x
    }

}


function tick() {
    genWorld();
    // Clear and fill background
    ctx.clearRect(minW, minH, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(minW, minH, maxW, maxH);

    for (var y = 0; y < pCY; y++){
        for (var x = 0; x < pCX; x++){
            if(pA[y][x] == 0){
                ctx.fillStyle = "#770000";
                ctx.fillRect(x * pixS, y * pixS, pixS, pixS);
            }
            else{
                ctx.fillStyle = '#777777'
            }
        }
    }

}


// Initialize
genWorld()



setInterval(tick, tickS);