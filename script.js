var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");

// Display settings
var minW = 0;
var minH = 0;
var maxW = canvas1.width;   //width is 800 pixels
var maxH = canvas1.height;   //height is 800 pixels
var bgHue = "#777777";

var pixS = 8;
var pCX = Math.floor(maxW / pixS);
var pCY = Math.floor(maxH / pixS);
var pA = new Array(pCY);

var cloneA = new Array(pCY);


var tickS = 100;

function genWorld() {
    // Reset the array to all 'air'
    for (var i = 0; i < pCY; i++) {
        r = Math.random()
        var el = 0
        if(r < 0.5){
            el = 1
        }
        pA[i] = new Array(pCX).fill(el);
        cloneA[i] = new Array(pCX).fill(el);

    }
}


function tick() {
    // Clear and fill background
    ctx.clearRect(minW, minH, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(minW, minH, maxW, maxH);

    for (var x = 0; x < pCX; x++){
        for (var y = 0; y < pCY; y++){
            if(pA[y][x] == 1){
                ctx.fillRect(x * pixS, y * pixS, pixS, pixS);
            }
        }
    }

}


// Initialize
genWorld()



setInterval(tick, tickS);