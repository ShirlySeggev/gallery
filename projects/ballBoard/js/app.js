var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/glue.png" />';

var COLLECT_AUDIO = new Audio('sound/right.mp3');

var gBoard;
var gGamerPos;
var gBallInterval;
var gGlueInterval;
var gBallsCollected;
var gCountBalls;
var gIsGlue;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gBallsCollected = 0;
	updateNumBallsCollected(gBallsCollected);
	gCountBalls = 2;
	gIsGlue = false;
	gBallInterval = setInterval(renderBall, 3000);
	gGlueInterval = setInterval(renderGlue, 5000);
	renderPassages({ i: 0, j: 5 });
	renderPassages({ i: 9, j: 5 });
	renderPassages({ i: 5, j: 0 });
	renderPassages({ i: 5, j: 11 });
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}
	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			cellClass += (currCell.type === FLOOR) ? ' floor' : ' wall'
			// if (currCell.type === FLOOR) cellClass += ' floor';
			// else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			switch (currCell.gameElement) {
				case GAMER: strHTML += GAMER_IMG; break;
				case BALL: strHTML += BALL_IMG; break;
			}
			// if (currCell.gameElement === GAMER) {
			// 	strHTML += GAMER_IMG;
			// } else if (currCell.gameElement === BALL) {
			// 	strHTML += BALL_IMG;
			// }

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	if (gIsGlue) return;
	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four passages
	if (i === -1) i = gBoard.length - 1;
	if (i === gBoard.length) i = 0;
	if (j === -1) j = gBoard[0].length - 1;
	if (j === gBoard[0].length) j = 0;

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// If the clicked Cell is one of the four allowed
	// We also Allow the movement through passages
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		// collecting balls
		if (targetCell.gameElement === BALL) {
			updateNumBallsCollected(++gBallsCollected);
			var audioPop = new Audio('sound/pop.wav');
			audioPop.play();
			if (gCountBalls === gBallsCollected) gameOver();
		} else if (targetCell.gameElement === GLUE) {
			gIsGlue = true;
			setTimeout(function () { gIsGlue = false }, 3000);
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;
	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell {i:, j:}
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function renderBall() {
	var randi = Math.floor(Math.random() * gBoard.length);
	var randj = Math.floor(Math.random() * gBoard[0].length);
	var randLocation = { i: randi, j: randj };

	if (!gBoard[randi][randj].gameElement && gBoard[randi][randj].type === 'FLOOR') {
		gBoard[randi][randj].gameElement = BALL;
		renderCell(randLocation, BALL_IMG);
		gCountBalls++;
	}
}

function gameOver() {
	alert('GAME OVER!');
	var audioOver = new Audio('sound/right.mp3');
	audioOver.play();
	clearInterval(gBallInterval);
}

function restart(elButton) {
	initGame();
}

function updateNumBallsCollected(num) {
	var elBallsColected = document.querySelector('h2 span');
	elBallsColected.innerText = num;
}

function renderPassages(location) {
	gBoard[location.i][location.j].type = FLOOR;
	var cellSelector = '.' + getClassName(location);
	var elPassages = document.querySelector(cellSelector);
	elPassages.classList.remove('wall');
	elPassages.classList.add('floor');
}

function renderGlue() {
	var randi = Math.floor(Math.random() * gBoard.length);
	var randj = Math.floor(Math.random() * gBoard[0].length);
	var randLocation = { i: randi, j: randj };
	if (!gBoard[randi][randj].gameElement && gBoard[randi][randj].type === 'FLOOR') {
		gBoard[randi][randj].gameElement = GLUE;
		renderCell(randLocation, GLUE_IMG);

		setTimeout(function () {
			gBoard[randi][randj].gameElement = null;
			renderCell(randLocation, '');
		}, 3000);
	}
}

