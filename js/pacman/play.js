'use strict';

(function(){
	const CELL_SIZE = 16, CELLS_AMOUNT = 5;
	const CELL_HEIGHT = CELL_SIZE, CELL_WIDTH = CELL_SIZE;
	const CELLS_HAMOUNT = 4*CELLS_AMOUNT;
	const CELLS_WAMOUNT = 3*CELLS_AMOUNT;
	const TEXTURES = playTextures();

	function __draw(canvas, img, x, y, width, height){
		canvas.getContext('2d').drawImage(img, x, y, width, height);
	}

	var drawCellLT = { x: 0, y:0 }; // visible left top cell

	function draw(img, xIndex, yIndex, width, height){
		var canvas = document.getElementById('easel');
		var x = xIndex * CELL_WIDTH;
		var y = yIndex * CELL_HEIGHT;
		var w = width || CELL_WIDTH;
		var h = height || CELL_HEIGHT;
		__draw(canvas, img, x, y, w, h);
	}

	function botDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
		var textures = TEXTURES.bot.filter(function(value, key){
			return /^bot[\d]+$/.test(key);
		});
		var draw = function(bot){
			throw 'bot draw';
		};
		return draw;
	}

	function cellDraw(){
		var height = canvasCellHeight, width = canvasCellWidth;
		var textures = canvasTextures.cell;
		var draw = function(cell){
			throw 'cell draw';
		};
		return draw;
	}

	function fieldDraw(){
		var height = canvasCellHeight, width = canvasCellWidth;
		var textures = canvasTextures.field;
		var draw = function(field){
			throw 'field draw';
		};
		return draw;
	}

	function foodDraw(){
		var height = canvasCellHeight, width = canvasCellWidth;
		var textures = canvasTextures.food;
		var draw = function(food){
			throw 'food draw';
		};
		return draw;
	}

	function gameDraw(){
		var height = canvasCellHeight, width = canvasCellWidth;
		var textures = canvasTextures.game;
		var draw = function(game){
			throw 'game draw';
		};
		return draw;
	}

	function manDraw(){
		var height = canvasCellHeight, width = canvasCellWidth;
		var textures = canvasTextures.man;
		var draw = function(man){
			throw 'man draw';
		};
		return draw;
	}

	function wallDraw(){
		var height = canvasCellHeight, width = canvasCellWidth;
		var textures = canvasTextures.wall;
		var draw = function(wall){
			var x = wall.cell.xIndex;
			var y = wall.cell.yIndex;
			throw 'wall draw';
		};
		return draw;
	}

	var gameOptions = {
		bots: {
			_default: { draw: botDraw(), },
			amount: 4,
			0: {
				cell: 'b1',
				texture: canvasTextures.bot0,
			},
			1: {
				cell: 'b2',
				texture: canvasTextures.bot1,
			},
			2: {
				cell: 'b1',
				texture: canvasTextures.bot2,
			},
			3: {
				cell: 'b2',
				texture: canvasTextures.bot3,
			},
		},

		draw: gameDraw(),

		field: {
			cells: {
				_default: { draw: cellDraw(), },
				'0:1': {},
				0: {},
			},
			draw: fieldDraw(),
			height: 10,
			width: 10,
			visible: { height: 4, left: 0, top: 0, width: 4, },
		},

		foods: {
			_default: { draw: foodDraw(), },
			f1: { texture: canvasTextures.food1, },
		},

		mans: {
			_default: { draw: manDraw(), },
			amount: 1,
			0: {
				cell: 'm1',
				texture: canvasTextures.man1,
			},
		},

		maps: '\
		  wRB,  wH,  wH,  wH,  wH,  wH,  wH,  wH,  wH, wBL,\
		   wV,  f1,   -,  f1,   -,   -,  f1,   -,  f1,  wV,\
		   wV,   -,  wP,  wP,  f1,  f1,  wP,  wP,   -,  wV,\
		   wV,   -,  wP,  wP,  f1,  f1,  wP,  wP,   -,  wV,\
		   wV,  f1,  f1,  f1,   -,   -,  f1,  f1,  f1,  wV,\
		    -,   -,  wP,   -,  wP,  wP,  f1,  wP,   -,   -,\
		   wV,  f1,  wP,  m1,  wP,  b1,  b2,  wP,  f1,  wV,\
		   wV,   -,  wP,   -,  wP,  wP,  f1,  wP,   -,  wV,\
		   wV,  f1,   -,  f1,   -,   -,  f1,   -,  f1,  wV,\
		  wTR,  wH,  wH,  wH,  wH,  wH,  wH,  wH,  wH, wLT \
		',

		walls: {
			_default: { draw: wallDraw(), },
			wB: { texture: canvasTextures.w1b, },
			wBL: { texture: canvasTextures.w1bl, },
			wBLT: { texture: canvasTextures.w1blt, },
			wH: { texture: canvasTextures.w1h, },
			wL: { texture: canvasTextures.w1l, },
			wLT: { texture: canvasTextures.w1lt, },
			wLTR: { texture: canvasTextures.w1ltr, },
			wR: { texture: canvasTextures.w1r, },
			wRB: { texture: canvasTextures.w1rb, },
			wRBL: { texture: canvasTextures.w1rbl, },
			wT: { texture: canvasTextures.w1t, },
			wTR: { texture: canvasTextures.w1tr, },
			wTRB: { texture: canvasTextures.w1trb, },
			wTRBL: { texture: canvasTextures.w1trbl, },
			wP: { texture: canvasTextures.w1p, },
			wV: { texture: canvasTextures.w1v, },
		},

	};

	var game = new Game(gameOptions);

	// test
	$("document").ready(function(){
		var canvas = document.getElementById('easel');
		canvas.height = canvasCellHeight * canvasCellsVerticallyAmount;
		canvas.width = canvasCellWidth * canvasCellsHorizontalAmount;
		var context = canvas.getContext('2d');
		var x = 0, y = 0;
		drawCellXY(canvasTextures.w1rb, x, y);
		drawCellXY(canvasTextures.w1h, x + 1, y);
		drawCellXY(canvasTextures.w1bl, x + 2, y);
		drawCellXY(canvasTextures.w1v, x + 0, y + 1);
		drawCellXY(canvasTextures.w1v, x + 2, y + 1);
		drawCellXY(canvasTextures.w1tr, x, y + 2);
		drawCellXY(canvasTextures.w1h, x + 1, y + 2);
		drawCellXY(canvasTextures.w1lt, x + 2, y + 2);

	});
})();
