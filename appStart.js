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
  
  accumulate();
  gnome('red', canvas.width/2);
  gnome('green', canvas.width/1.75);
  gnome('blue', canvas.width/2.25);

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

//Accumulation
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

function gnome(color, x){
  this.color = color;
  this.x = x;

  ctx.beginPath();
  ctx.arc(x, canvas.height-140, 20, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = 'tan';
  ctx.fill();

  //Body  
  ctx.beginPath();
  ctx.arc(x, canvas.height-100, 30, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
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

console.log(canvas.width);