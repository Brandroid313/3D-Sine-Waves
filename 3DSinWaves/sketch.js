var distance; 
var length;
var confLocs = []; // location of each confetti
var confTheta =[]; // initial angle of each confetti
var confettiSlider;
var speedSlider;
var waveSlider;


function setup() {
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES); 
    for(var i = 0; i < 200; i++){
        
        var randomX = random(-500, 500);
        var randomY = random(-800, 0);
        var randomZ = random(-500, 500); 
        var confVector = createVector(randomX, randomY, randomZ); 
        confLocs.push(confVector); 
        confTheta.push(random(0, 360));     
    };
    
   // size of confetti
   let sizeP = createP('confetti size');
   sizeP.style('font-size', '16px');
   sizeP.position(920, 0);
   confettiSlider = createSlider(5, 30, 15); 
   confettiSlider.position(920, 30);
    
   // speed of spin
   let spinP = createP('Spin Speed');
   spinP.style('font-size', '16px');
   spinP.position(920, 45);
   speedSlider = createSlider(0, 10, 1); 
   speedSlider.position(920, 80);
    
   // speed of waves
   let waveP = createP('Wave Speed');
   waveP.style('font-size', '16px');
   waveP.position(920, 95);
   waveSlider = createSlider(1, 10, 1); 
   waveSlider.position(920, 130);
    
}

function confetti(){
    
    for(var i = 0; i < confLocs.length; i++){
        push();
        
        noStroke();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(confettiSlider.value(), confettiSlider.value());
        
        pop();
        
        confLocs[i].y += 1;
        confTheta[i] += 10;
        
        if(confLocs[i].y > 0){
            confLocs[i]. y = -800;
        }    
        
    }
}

/* Create grid of boxes that oscilate with cos and sin waves */
function waveBlocks(){
   rectMode(CENTER); 
   var speed = map(speedSlider.value(), 0, 10, 0, 2);
   var xLoc = cos(frameCount * speed)  * 800;
   var zLoc = sin(frameCount * speed)  * 800;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);
    normalMaterial();
    stroke(0);
    strokeWeight(2);
    translate(-400, 0, -400);
    push();
        for(var x = -400; x < 400; x+= 50){   
        translate(50, 0, 0);    
            push();     
                for(var z = -400; z < 400; z+= 50){
                    translate(0, 0, 50); 
                    distance = dist(0, 0, 0, x, 0, z);   
                    length = map(sin(distance + frameCount * waveSlider.value()), -1, 1, 100, 300);   
                    box(50, length, 50);             
                };
        
            pop();    
    pop();  
        
    }
    
}

function draw() {
    background(125);
    confetti();
    waveBlocks();    
}
