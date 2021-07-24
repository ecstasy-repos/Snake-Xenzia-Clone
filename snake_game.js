full = document.getElementById("full");
doc = document.getElementById("doc");
playnow = document.getElementById("playnow");
fullscreen = false;
full.addEventListener("click",()=>{
	fullscreen= true;
	console.log("hello!!!!!!!");
				if (doc.requestFullscreen) {
		    doc.requestFullscreen();
		  } else if (doc.mozRequestFullScreen) { /* Firefox */
		    doc.mozRequestFullScreen();
		  } else if (doc.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		    doc.webkitRequestFullscreen();
		  } else if (doc.msRequestFullscreen) { /* IE/Edge */
		    doc.msRequestFullscreen();
		  }
	});
function init(){
	game_over = false;
	canvas = document.getElementById("playarea");
	up = document.getElementById("up");
	console.log(up);
	left = document.getElementById("left");
	right = document.getElementById("right");
	down = document.getElementById("bottom");
	decision = document.getElementById("decision");
	BUTTON = document.getElementById("button");
	points = document.getElementById("point");
	BUTTON.addEventListener("click",()=>{
		 	if (doc.requestFullscreen) {
		    doc.requestFullscreen();
		  } else if (doc.mozRequestFullScreen) { /* Firefox */
		    doc.mozRequestFullScreen();
		  } else if (doc.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		    doc.webkitRequestFullscreen();
		  } else if (doc.msRequestFullscreen) { /* IE/Edge */
		    doc.msRequestFullscreen();
		  }
		  location.reload();
	});
	points.textContent=0;
	console.log(canvas);
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 66;

    food_img = new Image();
    food_img.src = "food.PNG";
    score = 0;
	food = randomFood();

	snake = {
		l0 : 5,
		color : "black",
		cells :[],
		direction : "right",
		createSnake: function()
		{
			for(var i = this.l0; i>0 ; i--)
			{
				this.cells.push({
						x: i,
						y: 0
				});
			}
		},

		drawSnake: function()
		{
			for(var i=0; i<this.cells.length; i++)
			{
				pen.fillStyle = snake.color;
				pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2.5,cs-2.5);

			}
		},

		updateSnake: function()
		{
			var x0 = this.cells[0].x;
			var y0 = this.cells[0].y;
			var x1,y1;

			if(x0 == food.x && y0 == food.y)
			{
				score++;
				food = randomFood();
			}
			else{
				this.cells.pop();
			}
			if(this.direction == "right")
			{
				x1 = x0 + 1;
				y1 = y0;			
			}
			else if(this.direction == "left")
			{
				x1 = x0-1 ;
				y1 = y0;
			}
			else if(this.direction == "down")
			{
				x1 = x0 ;
				y1 = y0 + 1; 
			}
			else if(this.direction =="up")
			{
				x1 = x0;
				y1 = y0 -1;
			}
			this.cells.unshift({
					x: x1,
					y: y1
				});
			var boundx = Math.round(W/cs);
			var boundy = Math.round(H/cs);
			if(this.cells[0].x <0 || this.cells[0].y <0 || this.cells[0].x >= boundx || this.cells[0].y >= boundy ){
				game_over = true;
				points.textContent = 0;
			}

			for(let i=1; i<this.cells.length ;i++)
			{
				if(this.cells[0].x == this.cells[i].x && this.cells[0].y == this.cells[i].y)
				{
					points.textContent = 0;
					game_over = true;
				}
			}

		}		
	};
    
	snake.createSnake();
	document.addEventListener("keydown",function(k)
	{
        if(k.key == "ArrowUp")
        {
        	snake.direction ="up";
        }
        else if(k.key == "ArrowDown")
        {
        	snake.direction ="down";
        }
        else if(k.key == "ArrowLeft")
        {
        	snake.direction ="left";
        }
        else if(k.key == "ArrowRight")
        {
            snake.direction ="right";
        }
	});

	up.addEventListener("click",()=>{
		console.log("you clicked up");
		snake.direction ="up";
	});

	left.addEventListener("click",()=>{
		snake.direction ="left";
	});

	right.addEventListener("click",()=>{
		snake.direction ="right";
	});

	down.addEventListener("click",()=>{
		snake.direction ="down";
	});
}

function randomFood()
{
	var x1 = Math.round(Math.random()*((W-cs)/cs));
	var y1 = Math.round(Math.random()*((H-cs)/cs));
	var food ={
		x : x1,
		y : y1 ,
		color : "red"
	}
	return food;
}

function draw(){
	//we have to erase old frame;
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs, food.y*cs, cs, cs);

    pen.fillStyle = "blue";
    pen.font = "45px Roboto";
	points.textContent = score;
}

function update()
{
   snake.updateSnake();
}

function gameloop()
{
	if(game_over == true)
	{
		clearInterval(f);
		decision.textContent = "Try Again!😵 ";
		BUTTON.textContent = "PLAY AGAIN!";
		BUTTON.addEventListener("click",()=>{
			});
	}
   draw();
   update();
   		if (doc.requestFullscreen) {
		    doc.requestFullscreen();
		  } else if (doc.mozRequestFullScreen) { /* Firefox */
		    doc.mozRequestFullScreen();
		  } else if (doc.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		    doc.webkitRequestFullscreen();
		  } else if (doc.msRequestFullscreen) { /* IE/Edge */
		    doc.msRequestFullscreen();
		  }
}
playnow.addEventListener("click", ()=>{
init();
 f = setInterval(gameloop,300);
});
