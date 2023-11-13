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


// Character

var offXP = 0;  //offset of pixels
var offYP = 0;  //offset of pixels


var tickS = 100;

function genWorld() {
    pAinv = new Array(pCXW)
    var alt = 50
    var altV = 0
    for (var x = 0; x < pCXW; x++){
        temp_y = new Array(pCYW);
        altV += (Math.random() - .5) * .5
        alt += altV
        altV *= .9
        if(alt < 0){
            alt = 0
        }
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
    // Clear and fill background
    ctx.clearRect(minW, minH, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(minW, minH, maxW, maxH);


    // Draw screen
    for (var y = 0; y < pCY; y++){
        for (var x = 0; x < pCX; x++){
            if(pA[y + offYP][x + offXP] == 0){
                ctx.fillStyle = "#770000";
                ctx.fillRect(x * pixS, y * pixS, pixS, pixS);
            }
            else{
                ctx.fillStyle = '#777777'
            }
        }
    }

}



document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            // Action for the Up Arrow key
            if(offYP > 0){
                offYP -= 1;
            }
            break;
        case 'ArrowDown':
            // Action for the Down Arrow key
            if(offYP < pCYW - pCY){
                offYP += 1;
            }
            break;
        case 'ArrowLeft':
            // Action for the Left Arrow key
            if(offXP > 0){
                offXP -= 1;
            }
            break;
        case 'ArrowRight':
            // Action for the Right Arrow key
            if(offXP < pCXW - pCX){
                offXP += 1;
            }
            break;
        default:
            // Action for any other key
    }
});





// Initialize
genWorld()



setInterval(tick, tickS);