class Game {
	score;
	lost;
	InProgres;
	moves;
	tailSize;
	defaultTailSize;
	nick;
	active;
}

function init(){
	Game.nick = document.getElementById("nick-input").value;
	setActive()
}
Game.active = false;
function setActive(){
	Game.active = true;
	document.getElementById("canvas").setAttribute("style", "visibility: visible;");	
	document.getElementById("id1").setAttribute("style", "visibility: hidden;");
	document.getElementById("id1").setAttribute("style", "height: 0px;");
}	
var canvas, ctx;
window.onload = function () {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	document.addEventListener('keydown', keyDownEvent);

	/*Renderowanie obrazu x razy na sekundę, w tym przypadku 8 czyli co 125ms */
	var x = 8;
	setInterval(draw, 1000 / x);
	Game.lost = false;
	Game.score = 0;
};

/*Tworzenie planszy i ustalanie ilości kratek, po których porusza się wąż */
var gridSize = (tileSize = 25);
var nextX = (nextY = 0);

/*Zmienne dotyczące węża*/
var defaultTailSize = 3;
Game.defaultTailSize = defaultTailSize;
Game.tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

// początkowe jabłko
randomCoords();

// rysowanie węża i jabłek
function draw() {
	if (Game.lost == false) {
		// move snake in next pos
		snakeX += nextX;
		snakeY += nextY;

		// Sprawdzenie, czy wąż nie znalazł się poza planszą
		if (snakeX < 0) {
			snakeX = gridSize - 1;
		}
		if (snakeX > gridSize - 1) {
			snakeX = 0;
		}

		if (snakeY < 0) {
			snakeY = gridSize - 1;
		}
		if (snakeY > gridSize - 1) {
			snakeY = 0;
		}

		// czy wąż ugryzł jabłko?
		if (snakeX == appleX && snakeY == appleY) {
			Game.tailSize++;
			if (Game.InProgres == false) Game.InProgres = true;
			randomCoords();
		}

		// kolorowanie tła planszy
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// kolorowanie węża
		ctx.fillStyle = 'green';
		for (var i = 0; i < snakeTrail.length; i++) {
			ctx.fillRect(snakeTrail[i].x * tileSize, snakeTrail[i].y * tileSize, tileSize, tileSize);

			//czy wąż ugryzł swój ogon?
			if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
				if (Game.InProgres == true) {
					endGame();
					Game.tailSize = defaultTailSize;
				}
			}
		}

		//pokoloruj jabłko
		ctx.fillStyle = 'red';
		ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

		//ustawianie śladu węża
		snakeTrail.push({ x: snakeX, y: snakeY });
		while (snakeTrail.length > Game.tailSize) {
			snakeTrail.shift();
		}
	}
}
function randomCoords() {
	appleX = Math.floor(Math.random() * gridSize);
	appleY = Math.floor(Math.random() * gridSize);
}
function endGame() {
	Game.lost = true;
	insertIntoDB(Game.nick, (Game.tailSize - Game.defaultTailSize), Game.moves);
	document.getElementById("headline").innerText = "Przegrałeś, następna runda rozpocznie się za 5 sekund!"
	Game.moves = 0;
	resetGame();
}
function resetGame() {
	snakeX = (snakeY = 10);
	Game.tailSize = defaultTailSize;
	Game.lost = false;
	document.getElementById("headline").innerText = "Snake"	
}
var lastCode;
Game.moves = 0;
function keyDownEvent(e) {
	if(Game.active == true){
	switch (e.keyCode) {
		case 37:
			Game.InProgres = true;
			if (lastCode == 39) { break; }
			else {
				Game.moves++;
				lastCode = 37;
				nextX = -1;
				nextY = 0;
				break;
			}
		case 38:
			Game.InProgres = true;
			if (lastCode == 40) break;
			else {
				Game.moves++;
				lastCode = 38;
				nextX = 0;
				nextY = -1;
				break;
			}
		case 39:
			Game.InProgres = true;
			if (lastCode == 37) break;
			else {
				Game.moves++;
				lastCode = 39;
				nextX = 1;
				nextY = 0;
				break;
			}
		case 40:
			Game.InProgres = true;
			if (lastCode == 38) break;
			else {
				Game.moves++;
				lastCode = 40;
				nextX = 0;
				nextY = 1;
				break;
			}
	}
}
}
