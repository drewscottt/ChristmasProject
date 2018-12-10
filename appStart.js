/**
*Provide a description of this file here
*
*/

/**
*@author pluska
*@author Drew Scott
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var snowArray = [];
var elvesArray = [];
var mySleigh;

var accumAmount = 0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//Snowflake constructor
function snowFlake(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y, this.r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle="#ffffff";
    ctx.fill();
  }
}

//Elf constructor
function elf(color, x, y){
  this.color = color;
  this.x = x;
  this.y = y;
  
  this.draw = function(){
    //Body  
    ctx.beginPath();
    ctx.arc(this.x, this.y-100, 30, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    //Head
    ctx.beginPath();
    ctx.arc(this.x, this.y-140, 20, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = 'tan';
    ctx.fill();

    //Eyes
    ctx.beginPath();
    ctx.arc(this.x-7, this.y-143, 1.5, 0, Math.PI*2, true);
    ctx.arc(this.x+7, this.y-143, 1.5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    //Mouth
    ctx.beginPath();
    ctx.arc(this.x, this.y-135, 6, 0, Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    //Hat
    ctx.beginPath();
    ctx.moveTo(this.x+17, this.y-150);
    ctx.lineTo(this.x-17, this.y-150);
    ctx.lineTo(this.x, this.y-180);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    //Legs
    ctx.beginPath();
    ctx.rect(this.x-19, this.y-80, 16, 20);
    ctx.rect(this.x+4, this.y-80, 16, 20);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    //Shoes
    ctx.beginPath();
    ctx.rect(this.x-19, this.y-68, 16, 8);
    ctx.arc(this.x-19, this.y-63.9, 4, Math.PI*.5, Math.PI*1.5, false);
    ctx.rect(this.x+4, this.y-68, 16, 8);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x+19, this.y-64, 4, Math.PI*.5, Math.PI*1.5, true);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();

    //Arms
    ctx.beginPath();
    ctx.rotate(20*Math.PI/180);
    ctx.rect(this.x-200, 300, 25, 10);
    ctx.closePath();
    ctx.fillStyle = color;
    //ctx.fill();
    ctx.rotate(-20*Math.PI/180);
    
  }
}

//Sleigh constructor
function sleigh(x, y){
  this.x = x;
  this.y = y;
  
  this.draw = function(){
    //Body
    ctx.beginPath();
    ctx.rect(this.x, this.y, 300, 80);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();

    //Rungs
    ctx.beginPath();
    ctx.rect(this.x+50, this.y+80, 10, 15);
    ctx.rect(this.x+250, this.y+80, 10, 15);
    ctx.rect(this.x, this.y+90, 300, 10);
    ctx.rect(this.x, this.y+85, 10, 5);
    ctx.rect(this.x+290, this.y+85, 10, 5);
    ctx.closePath();
    ctx.fillStyle = 'gold';
    ctx.fill();
  }
}

//Creates array of flakes
function snow(amount){
  var x, y, r;

  for (var i = 0; i < amount; i++){
    x = Math.random()*canvas.width;
    y = Math.random()*canvas.height;
    r = Math.random()*8;

    snowArray[i] = new snowFlake(x,y,r);
  }
}  

//Draws and moves elves
function moveElves(){
  for(var i = 0; i < elvesArray.length; i++){
    if(elvesArray[i].x > 120+(120*i) && elvesArray[i].y < canvas.height+50){
      elvesArray[i].y+=2;
    }

    if(elvesArray[i].y < canvas.height+50){
      elvesArray[i].x+=2;
    }

    if(i = 1){
      
    }
    elvesArray[i].draw();
  }
}

//Moves snow down and left, scaled by size
function drawSnow(){
  var flake,
      windSpeed = .25;
  for (var i = 0; i < snowArray.length; i++){
    flake = snowArray[i];

    flake.x -= flake.r*(windSpeed);
    flake.y += flake.r/4;
    
    flake.draw();

    moveSnow(i);
  }    
}

//Draws sleigh
function drawSleigh(){
  mySleigh.x+=2;
  mySleigh.draw();
}

//Moves snow back on screen once it exits
function moveSnow(index){
  //Moves flakes to the top if they exit bottom
  if (snowArray[index].y >= canvas.height){
    snowArray[index].y = 0;

    accumAmount++;
  }
  
  //Moves flakes to the right if they exit left
  if (snowArray[index].x <= 0){
    snowArray[index].x = canvas.width;
  }
}

//Adds snow to bottom of screen when snow exits bottom
function accumulate(){
  var initHeight = 20,
      maxHeight = 150,
      accumRate = 9, //Decrease for faster accumulation
      accumulation = (accumAmount/accumRate);

  if(accumulation <= maxHeight){
    ctx.beginPath();
    ctx.rect(0, canvas.height-initHeight-accumulation, canvas.width, initHeight+accumulation);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }else{
    ctx.beginPath();
    ctx.rect(0, canvas.height-initHeight-maxHeight, canvas.width, maxHeight+initHeight);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}

//Draws scene
function drawScene(){
  //Clears screen  
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); 

  drawSnow();
  moveElves();
  drawSleigh();
  accumulate();

  //Animates screen
  window.requestAnimationFrame(drawScene); 
}

//Creates sleigh and 3 elf objects
var xS = -330,
    yS = 120;

elvesArray[0] = new elf('red', xS+40, yS+127);
elvesArray[1] = new elf('green', xS+105, yS+127);
elvesArray[2] = new elf('blue', xS+170, yS+127);
mySleigh = new sleigh(xS, yS);

//Draws all elements
snow(100);
drawScene();