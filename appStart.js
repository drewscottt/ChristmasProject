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
var cloudArray = [];

var accumAmount = 0,
    accumulation = 0,
    maxHeight = 150;

var counter = 0;

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
    if(elvesArray[i].x > 120+(120*i) && elvesArray[i].y < canvas.height+40){
      elvesArray[i].y+=2;
    }

    if(elvesArray[i].y < canvas.height+40){
      elvesArray[i].x+=2;
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
      accumRate = 2.5; //Decrease for faster accumulation
    
  accumulation = accumAmount/accumRate;

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

//Sets background color
function background(color){
  
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

//Displays words in between scenes
function aFewMonthsLater(){
  ctx.font = '75px Arapey';
  ctx.fillStyle = 'white';
  ctx.fillText('A few months later...', 400, 350);
  
  counter++;
}

//Draws sun
function sun(){
  ctx.beginPath();
  ctx.arc(150, 110, 75, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = 'yellow';
  ctx.fill();
}

//Cloud constructor
function cloud(x, y){
  this.x = x;
  this.y = y;
  
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, Math.PI, true);
    ctx.arc(this.x+68, this.y, 50, 0, Math.PI, true);
    ctx.arc(this.x+34, this.y-35, 50, 0, Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}

//Draws and moves clouds
function drawCloud(){
  for(var i = 0; i < cloudArray.length; i++){
    cloudArray[i].x+=.2;
    cloudArray[i].draw();

    if(cloudArray[i].x >= canvas.width+100){
      cloudArray[i].x = -110;
    }
  }
}

//Draws grass and gravestones
function ground(){
  //Grass
  ctx.beginPath();
  ctx.rect(0, canvas.height-20, canvas.width, 20);
  ctx.closePath();
  ctx.fillStyle = 'green';
  ctx.fill();

  gravestone(520, 'Julien S.');
  gravestone(655, 'Dylan H.');
  gravestone(790, 'Caleb S.');
}

//Gravestone constructor
function gravestone(x, name){
  this.x = x;
  this.name = name;
  
  ctx.beginPath();
  ctx.rect(this.x, canvas.height-95, 75, 75);
  ctx.arc(this.x+37.5, canvas.height-95, 37.5, 0, Math.PI, true);
  ctx.closePath();
  ctx.fillStyle = 'gray';
  ctx.fill();

  ctx.font = '20px Sanchez';
  ctx.fillStyle = 'black';
  ctx.fillText('R.I.P', x+17, canvas.height-88);

  ctx.font = '15px Sanchez';
  ctx.fillText('12/25/18', x+7, canvas.height-71);

  ctx.font = '17px Sanchez'
  ctx.fillText(this.name, x+4.5, canvas.height-45);
}

//Elves say "Merry Christmas"
function xmas(){
  //Speech bubble
  ctx.beginPath();
  ctx.rect(550, canvas.height-213, 300, 45);
  ctx.arc(550, canvas.height-190, 22.5, Math.PI*.5, Math.PI*1.5, false);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(850, canvas.height-190, 22.5, Math.PI*.5, Math.PI*1.5, true);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(580, canvas.height-170);
  ctx.lineTo(585, canvas.height-125);
  ctx.lineTo(595, canvas.height-170);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(795, canvas.height-170);
  ctx.lineTo(790, canvas.height-125);
  ctx.lineTo(780, canvas.height-170);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  //Text
  ctx.font = '30px Courgette';
  ctx.fillStyle = 'red';
  ctx.fillText('Merry Christmas!', 580, canvas.height-180);
}

//Fonts
WebFontConfig = {
  google:{ families: ['Courgette', 'Arapey', 'Sanchez'] },
  active: function(){start();},
};
(function(){
  var wf = document.createElement("script");
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js';
  wf.async = 'true';
  document.head.appendChild(wf);
})();

//Draws scene
function drawScene(){
  //Clears screen  
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if(accumulation <= maxHeight){
    background('rgb(158, 206, 211)');
    
    drawSnow();
    moveElves();
    drawSleigh();
    accumulate();
    
    if(elvesArray[2].y >= canvas.height+40){
      xmas();
    }
  }else if(counter <= 150){
    background('black');

    aFewMonthsLater();
  }else{
    background('rgb(158, 206, 211)');

    sun();
    drawCloud();
    ground();
  }
  
  //Animates screen
  window.requestAnimationFrame(drawScene); 
}

//Creates sleigh, 3 elves, and 100 snow flakes
snow(100);

var xSleigh = -330,
    ySleigh = 120;

elvesArray[0] = new elf('red', xSleigh+40, ySleigh+127);
elvesArray[1] = new elf('green', xSleigh+105, ySleigh+127);
elvesArray[2] = new elf('blue', xSleigh+170, ySleigh+127);

mySleigh = new sleigh(xSleigh, ySleigh);

//Creates cloud
var xCloud = 400,
    yCloud = 210;

cloudArray[0] = new cloud(xCloud, yCloud);
cloudArray[1] = new cloud(xCloud+550, yCloud-40);
cloudArray[2] = new cloud(xCloud-600, yCloud-60);

drawScene();