var lastCode;
var moves = 0;
function keyDownEvent(e) {
	switch (e.keyCode) {
		case 37:
			Game.InProgres = true;
			if (lastCode == 39) { break; }
			else {
				moves++;
				lastCode = 37;
				nextX = -1;
				nextY = 0;
				break;
			}
		case 38:
			Game.InProgres = true;
			if (lastCode == 40) break;
			else {
				moves++;
				lastCode = 38;
				nextX = 0;
				nextY = -1;
				break;
			}
		case 39:
			Game.InProgres = true;
			if (lastCode == 37) break;
			else {
				moves++;
				lastCode = 39;
				nextX = 1;
				nextY = 0;
				break;
			}
		case 40:
			Game.InProgres = true;
			if (lastCode == 38) break;
			else {
				moves++;
				lastCode = 40;
				nextX = 0;
				nextY = 1;
				break;
			}
	}
}