// Joshua Bordick, Kylee Franci, David Shearon, Anna Otterstetter

// Javascript Project



// variables used for gameplay and setup
var width = 800;
var height = 600;
var xPos=50;
var yPos=240;
var playerSize=150;
var playerSpeed=20;
var bees=[];
var beeSize=60;
var beeSpeed=8;
var honey=[];
var shotSize=30;
var shotSpeed=10;

// setup image variables
var img = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
img.src = 'images/pooh.png';
img2.src = 'images/bees.png';
img3.src = 'images/honey.png';
img4.src = 'images/back.jpg';


// setup time and buffer variables
var time = 1500;
var updateTime = 1000/20;
var bufferTop = 75/2; 
var bufferBottom = height-75/2;

// score and lives variables for game
var lives = 3;
var score = 0;

//button press codes
var spaceCooldown = 0;
var space = 32;
var up = 38;
var down = 40;
var timeoutTime = 5000;

// setup timing variables for gameplay
var initOne = setInterval(update,updateTime);
var initTwo = setInterval(createBee,time);   
document.addEventListener('keydown',keyPush);
document.addEventListener('keyup', refreshSpace);

// get the elements that will be needed for the game
function init() {

	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
}

// run init onload
window.onload = init();

// create bees when prompted
function createBee() {
	bees.push({x:canvas.width,y:Math.random()*(bufferBottom - bufferTop) + bufferTop});
}

// show the score and lives when there is an update needed
function dispStats(){
	context.drawImage(img4, 0,0,canvas.width,canvas.height);
	context.fillStyle = "white";
	context.font = "bold 30px Arial";
	context.fillText("Lives: " + lives, width - bufferTop*5, bufferBottom);
	context.fillText("Score: " + score, width-bufferTop*5, bufferTop);
}


// this is the ain logic loop og the game and handles the gameplay
function update() {
	dispStats();

	// draw pooh image to board
	context.drawImage(img,xPos-playerSize/2,yPos-playerSize/2,playerSize,playerSize);

	// move the honey across the screen when needed
	for(var i=0;i<honey.length;i++) {
		honey[i].x += shotSpeed;
		// draw honey
		context.drawImage(img3, honey[i].x-shotSize/2,honey[i].y-shotSize/2,shotSize,shotSize);

		// this loop is used to check for collisions when bees and honey interact
		for(var j=bees.length-1;j>=0;j--) {
			var dx=Math.abs(bees[j].x-honey[i].x);
			var dy=Math.abs(bees[j].y-honey[i].y);
			var dist=Math.sqrt(dx*dx+dy*dy);
			if(dist < (shotSize+beeSize)/2) {
				bees.splice(j,1);
				honey.splice(i,1);     
				score += 10;
			}
		}
	}   

	// this loop here checks for if a bee hits a player  
	for(var k=0;k<bees.length;k++) {
		bees[k].x -= beeSpeed;
		// draw bee
		context.drawImage(img2, bees[k].x-beeSize/2,bees[k].y-beeSize/2,beeSize,beeSize);
		var dx=Math.abs(bees[k].x-xPos);
		var dy=Math.abs(bees[k].y-yPos);
		var dist=Math.sqrt(dx*dx+dy*dy);
		// check for collision
		if(dist < (playerSize+beeSize)/2) {
			honey=[];
			bees=[];
			xPos = 50;
			yPos = 240;
			lives--;
			// check to see if player has no more lives
			if(lives == 0){
				endGame();
				clear();
				break;
			}
			break;
		}
		// subtarct score if bee gets passed pooh
		else if( bees[k].x == 0 ){
			score -= 10;
			if(score < 0){
				honey=[];
				bees=[];
				xPos = 50;
				yPos = 240;
				lives--;
				score = 0;
				if(lives == 0){
					endGame();
					clear();
					break;
				}
			}
		}
	}
}

// logic for key presses and what shoulf happen
function keyPush(e) {
	switch(e.keyCode) {
		case space:
			if(spaceCooldown == 0){
				honey.push({x:xPos,y:yPos});
				spaceCooldown = 1;
			}
			break;
		case up:
			if(yPos-playerSpeed <= 75/2 -15){
				break;
			}
			yPos-=playerSpeed;
			break;
		case down:
			if(yPos+playerSpeed >= height - playerSize/2+10){
				break;
			}
			yPos+=playerSpeed;
			break;
	}
}

// end intervals for game
function clear() {
	clearInterval(initOne);
	clearInterval(initTwo);
}

// change the game state to show that the game is over and display stats
function endGame(){
	dispStats();
	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
	context.drawImage(img4, 0,0, canvas.wdith, canvas.height);
	context.fillStyle = "black";
	context.font = "bold 30px Arial";
	context.fillText("Ran Out of Lives- Refresh to Play Again!", width/2 - bufferTop*8, height/2);  
}

// cooldown so space cannot be held down
function refreshSpace(){
	spaceCooldown = 0;
}