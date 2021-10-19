var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var picpic = document.getElementById("pic");

var x = 0;
var y = 420;
var bullets = [];

window.onload = function(){
    initialDraw();
    drawBullets(canvas);
}

document.addEventListener("keydown", presskey);


function initialDraw() {
    //
    context.clearRect(0, 0, 500, 500);
    context.drawImage(picpic, x, y, 75, 75);
  }


function presskey(event){   
    var l = event.keyCode;
        if (l==39){
            if(x+25 <= 425){
                x = x + 25;
                draw();
            }
            
        }
        else if (l==37){
            if(x-25 >= 0){
                x = x - 25;
                draw();
            }
        } 
	else if (l == 32){
		//alert("s");
		//var newBullet = new bullet();
    		//newBullet.init();
    		//bullets.push(newBullet);
		//var bullets.push({type: 'rect', x:(x+30),y:(y+10), width:15,height:15,fill:'red'});
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = "#FF0000";
		i = x+30;
		j = y+10;
		//alert(bullets.length);
	}
}

this.init = function(){
        alert("s");
	//var c = document.getElementById("canvas");
	//var con = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	i = x;
	j = y+10;
}


	//alert("update1");
setInterval(function() {update()}, .5);

function update() {
     context.clearRect(0, 0, canvas.width, canvas.height);
     context.drawImage(picpic, x, y, 75, 75);
 //    for(var t = 0; t< bullets.length,++){
//	var singleBullet = bullets[t];
//	if(t.type = 'rect'){
//		drawRect(singleBullet.i, singleBullet.j);
//}
//}
	drawRect(i, j);
     context.drawImage(picpic, x, y, 75, 75);
       i;
     j = j - 2;
}
function drawRect(x, y){context.fillRect(x, y,15,15)};
