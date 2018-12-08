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
var accumAmount = 0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

/**
 * Constructor for a single snow flake 
 */

function snowFlake(x,y,r) {
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
/** 
 * TODO: Complete the function below to make lots of snow.   
 * Create each snowflake using the snowFlake constructor and 
 * populate the snowArray with your snowflakes
 * Each snow flake must be of random sizes and populate
 * the screen randomly in the y and x directions
 * Feel free to add a parameter to specify the amount of snow
 */

function snow(amount){
  var x, y, r;

  //Creates array of flakes
  for (var i = 0; i < amount; i++){
    x = Math.random()*canvas.width;
    y = Math.random()*canvas.height;
    r = Math.random()*8;

    snowArray[i] = new snowFlake(x,y,r);
  }

  drawSnow();
}  

/**
 * TODO:  Make the snow appear randomly appear on the screen and move 
 * in a verticle direction add an additional variable to account for wind
 */

function drawSnow(){
  //The command below is needed to clear the screen between each movement
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); 
  
  //Moves flakes down and left, scaled by size
  var flake;
  for (var i = 0; i < snowArray.length; i++){
    flake = snowArray[i];

    flake.x -= flake.r/4;
    flake.y += flake.r/4;
    
    flake.draw();

    moveSnow(i);
  }   
  
  elf('red', 440, 247);
  elf('green', 505, 247);
  elf('blue', 570, 247);

  sleigh();

  accumulate();

  //The command below is needed to animate the snow
  window.requestAnimationFrame(drawSnow); 
}

/**
 * TODO: Complete the function below to move each snow flake to the 
 * top of the screen once it has reached the bottom.
 */
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

function accumulate(){
  var initHeight = 20,
      maxHeight = 150,
      accumRate = 25,
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

function sleigh(){
  //Body
  ctx.beginPath();
  ctx.rect(400, 120, 300, 80);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();

  //Rungs
  ctx.beginPath();
  ctx.rect(450, 200, 10, 15);
  ctx.rect(650, 200, 10, 15);
  ctx.rect(400, 210, 300, 10);
  ctx.rect(400, 205, 10, 5);
  ctx.rect(690, 205, 10, 5);
  ctx.closePath();
  ctx.fillStyle = 'gold';
  ctx.fill();
}

function elf(color, x, y){
  this.color = color;
  this.x = x;
  this.y = y;
  
  //Body  
  ctx.beginPath();
  ctx.arc(x, y-100, 30, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  //Head
  ctx.beginPath();
  ctx.arc(x, y-140, 20, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = 'tan';
  ctx.fill();

  //Eyes
  ctx.beginPath();
  ctx.arc(x-7, y-143, 1.5, 0, Math.PI*2, true);
  ctx.arc(x+7, y-143, 1.5, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fill();

  //Mouth
  ctx.beginPath();
  ctx.arc(x, y-135, 6, 0, Math.PI, false);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fill();

  //Hat
  ctx.beginPath();
  ctx.moveTo(x+17, y-150);
  ctx.lineTo(x-17, y-150);
  ctx.lineTo(x, y-180);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  //Legs
  ctx.beginPath();
  ctx.rect(x-19, y-80, 16, 20);
  ctx.rect(x+4, y-80, 16, 20);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  //Shoes
  ctx.beginPath();
  ctx.rect(x-19, y-68, 16, 8);
  ctx.arc(x-19, y-63.9, 4, Math.PI*.5, Math.PI*1.5, false);
  ctx.rect(x+4, y-68, 16, 8);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x+19, y-64, 4, Math.PI*.5, Math.PI*1.5, true);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fill();

  //Arms
  ctx.beginPath();
  ctx.rotate(20*Math.PI/180);
  ctx.rect(x-200, 300, 25, 10);
  ctx.closePath();
  ctx.fillStyle = color;
  //ctx.fill();
  ctx.rotate(-20*Math.PI/180);
}

/**
 * TODO: Complete the drawScene function below.
 * Inside this function, call the additional functions needed to
 * complete your scene
 */
function drawScene(){
  snow(100);
}

drawScene();