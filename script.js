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
var offYP = 20;  //offset of pixels

var player_w = pixS
var player_h = pixS * 2
var player_off_x = maxW / 2
var player_off_y = maxH / 2


// World generation parameters

var min_cave_alt = 100       // Minimum distance down for cave
var cave_chance = 0.001     // Chance of a cave seeding
var cave_iterations = 40    // Cave-forming iterations
var cave_spread_chance = 0.05   // Chance of a cave spreading to neighbors during iteration



// World elements 0 = air, 1 = mars soil


var tickS = 100;

function genWorld() {
    // Create surface layer
    pAinv = new Array(pCXW)
    var alt = 70
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
                temp_y[y] = 0;
            }
            else{
                temp_y[y] = 1;
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

    // Cave generation - seeding

    for(var y = min_cave_alt; y < pCYW - 1; y++){
        for(var x = 1; x < pCXW - 1; x++){
            r = Math.random()
            if(pA[y][x] == 1 & r < cave_chance){
                pA[y][x] = 0
            }
        }
    }

    // Cave generation - expanding

    for(var i = 0; i < cave_iterations; i++){
        for(var y = min_cave_alt; y < pCYW - 1; y++){
            for(var x = 1; x < pCXW - 1; x++){
                if(pA[y][x] == 0){
                    continue;
                }
                neighborC = 0
                for(y_check = -1; y_check <= 1; y_check++){
                    for(x_check = -1; x_check <= 1; x_check++){
                        if(y_check == 0 & x_check == 0){
                            continue;
                        }
                        if(pA[y + y_check][x + x_check] == 0){
                            neighborC++;
                        }

                    }
                }
                r = Math.random()
                if(r < cave_spread_chance * neighborC){
                    pA[y][x] = 0;
                }
            }
        }
    }

    // Cave generation - remove isolated blocks
    for(var i = 0; i < cave_iterations; i++){
        for(var y = min_cave_alt; y < pCYW - 1; y++){
            for(var x = 1; x < pCXW - 1; x++){
                if(pA[y][x] == 0){
                    continue;
                }
                neighborC = 0
                for(y_check = -1; y_check <= 1; y_check++){
                    for(x_check = -1; x_check <= 1; x_check++){
                        if(y_check == 0 & x_check == 0){
                            continue;
                        }
                        if(pA[y + y_check][x + x_check] == 0){
                            neighborC++;
                        }

                    }
                }
                if(neighborC > 7){
                    pA[y][x] = 0;
                }
            }
        }
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
            if(pA[y + offYP][x + offXP] == 1){
                ctx.fillStyle = "#770000";
                ctx.fillRect(x * pixS, y * pixS, pixS, pixS);
            }
            else{
                ctx.fillStyle = '#777777'
            }
        }
    }

    // Draw player
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player_off_x,player_off_y,player_w,player_h);
    var x_coord = offXP * pixS + player_off_x
    var y_coord = offYP * pixS + player_off_y


    


    // Physics
    var player_index_x = Math.floor(x_coord / pixS)
    var player_index_y = Math.floor(y_coord / pixS)

    if(pA[player_index_y][player_index_x] == 0){
        offYP += 1;
    }




    // Write troubleshooting info
    ctx.fillStyle = "#000000";
    ctx.fillText("X-Value of Player: " + x_coord, 10, 10)
    ctx.fillText("Y-Value of Player: " + y_coord, 10, 20)
    ctx.fillText("X-index of Player: " + player_index_x, 10, 30)
    ctx.fillText("Y-index of Player: " + player_index_y, 10, 40)


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