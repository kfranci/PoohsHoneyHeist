var width = 800;
var height = 600;
var xPos=50;
var yPos=240;
var playerSize=75;
var playerSpeed=20;
var bees=[];
var beeSize=75;
var beeSpeed=8;
var honey=[];
var shotSize=30;
var shotSpeed=10;
var img = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var time = 1500;
var updateTime = 1000/20;
var bufferTop = playerSize/2; 
var bufferBottom = height-playerSize/2;
img.src = 'images/pooh.png';
img2.src = 'images/bees.png';
img3.src = 'images/honey.png';
img4.src = 'images/back.jpg';
var lives = 3;
var score = 0;

//button press codes
var space = 32;
var up = 38;
var down = 40;
var timeoutTime = 5000;
var initOne = setInterval(update,updateTime);
var initTwo = setInterval(createBee,time);   
document.addEventListener('keydown',keyPush);


function init() {

	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
}


window.onload = init();

function createBee() {
	bees.push({x:canvas.width,y:Math.random()*(bufferBottom - bufferTop) + bufferTop});
}
function dispStats(){
	context.drawImage(img4, 0,0,canvas.width,canvas.height);
	context.fillStyle = "purple";
	context.font = "30px Arial";
	context.fillText("Lives: " + lives, width - bufferTop*5, bufferBottom);
	context.fillText("Score: " + score, width-bufferTop*5, bufferTop);
}

function update() {
	dispStats();
	context.drawImage(img,xPos-playerSize/2,yPos-playerSize/2,playerSize,playerSize);
	for(var i=0;i<honey.length;i++) {
		honey[i].x += shotSpeed;
		context.drawImage(img3, honey[i].x-shotSize/2,honey[i].y-shotSize/2,shotSize,shotSize);
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
	for(var k=0;k<bees.length;k++) {
		bees[k].x -= beeSpeed;
		context.drawImage(img2, bees[k].x-beeSize/2,bees[k].y-beeSize/2,beeSize,beeSize);
		var dx=Math.abs(bees[k].x-xPos);
		var dy=Math.abs(bees[k].y-yPos);
		var dist=Math.sqrt(dx*dx+dy*dy);
		if(dist < (playerSize+beeSize)/2) {
			honey=[];
			bees=[];
			xPos = 50;
			yPos = 240;
			lives--;
			if(lives == 0){
				endGame();
				clear();
				break;
			}
			break;
		}
		else if( bees[k].x == 0 ){
			score -= 10;
			if(score < 0){
				endGame();
				clear();
				break;
			}
		}
	}
}


function keyPush(e) {
	switch(e.keyCode) {
		case space:
			honey.push({x:xPos,y:yPos});
			break;
		case up:
			if(yPos-playerSpeed <= bufferTop){
				break;
			}
			yPos-=playerSpeed;
			break;
		case down:
			if(yPos+playerSpeed >= bufferBottom){
				break;
			}
			yPos+=playerSpeed;
			break;
	}
}

function clear() {
	clearInterval(initOne);
	clearInterval(initTwo);
}

function endGame(){
	dispStats();
	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
	context.drawImage(img4, 0,0, canvas.wdith, canvas.height);
	context.fillStyle = "purple";
	context.font = "30px Arial";
	context.fillText("You Lose! Refresh to play again!", width/2 - bufferTop*8, height/2);  
}

	