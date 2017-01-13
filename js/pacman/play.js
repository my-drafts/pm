'use strict';

(function(){
	const CELL_SIZE = 16, CELLS_AMOUNT = 5;
	const CELL_HEIGHT = CELL_SIZE, CELL_WIDTH = CELL_SIZE;
	const CELLS_HAMOUNT = 3*CELLS_AMOUNT;
	const CELLS_WAMOUNT = 4*CELLS_AMOUNT;
	const TEXTURES = playTextures();

	// convas, image, coords, size
	function __draw(canvas, image, t, s){
		var src = s && s.x && s.y && s.w>0 && s.h>0 ? [s.x, s.y, s.w, sh] : [];
		var trg = t && t.x && t.y ? [t.x, t.y].concat(t.w>0 && t.h>0 ? [t.w, t.h] : []) : [0, 0];
		
		var xy = coord ? Object.assign({x: 0, y: 0}, coord) : false;
		var wh = size && size.w>0 && size.h>0 ? Object.assign({w: 0, h: 0}, size) : false;
		var contex = canvas.getContext('2d');
		var call = []
		contex.drawImage.aplly(image, coord.x, coord.y, size.w, size.h);
	}

	function __clear(c, x=None, y=None, w=None, height=None){
		c.getContext('2d').clearRect(x || 0, y || 0, w || c.width, h || c.height);
	}

	var drawCellLT = { x: 0, y:0 }; // visible left top cell

ctx.clearRect(10, 10, 200, 200); // Очистка области указанного размера и положения
ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста 

	function __clear(xIndex, yIndex, width, height){
		var canvas = document.getElementById('easel');
		var x = xIndex * CELL_WIDTH;
		var y = yIndex * CELL_HEIGHT;
		var w = width || CELL_WIDTH;
		var h = height || CELL_HEIGHT;
		__draw(canvas, img, x, y, w, h);
	}


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
		var draw = function(bot){
			throw 'bot draw';
		};
		return draw;
	}

	function cellDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
		var draw = function(cell){
			throw 'cell draw';
		};
		return draw;
	}

	function fieldDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
		var draw = function(field){
			throw 'field draw';
		};
		return draw;
	}

	function foodDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
		var draw = function(food){
			throw 'food draw';
		};
		return draw;
	}

	function gameDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
		var draw = function(game){
			throw 'game draw';
		};
		return draw;
	}

	function manDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
		var draw = function(man){
			throw 'man draw';
		};
		return draw;
	}

	function wallDraw(){
		var height = CELL_HEIGHT, width = CELL_WIDTH;
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
				texture: TEXTURES.bot0,
			},
			1: {
				cell: 'b2',
				texture: TEXTURES.bot1,
			},
			2: {
				cell: 'b1',
				texture: TEXTURES.bot2,
			},
			3: {
				cell: 'b2',
				texture: TEXTURES.bot3,
			},
		},

		draw: gameDraw(),

		field: {
			cells: {
				_default: {
					draw: cellDraw(),
					texture: TEXTURES.field,
				},
				'0:1': {},
				0: {},
			},
			draw: fieldDraw(),
			height: 10,
			width: 10,
		},

		foods: {
			_default: { draw: foodDraw(), },
			f1: { texture: TEXTURES.food1, },
		},

		mans: {
			_default: { draw: manDraw(), },
			amount: 1,
			0: {
				cell: 'm1',
				texture: TEXTURES.man1,
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

		visible: {
			height: 4,
			left: 0,
			top: 0,
			width: 4,
		},

		walls: {
			_default: { draw: wallDraw(), },
			wB: { texture: TEXTURES.w1b, },
			wBL: { texture: TEXTURES.w1bl, },
			wBLT: { texture: TEXTURES.w1blt, },
			wH: { texture: TEXTURES.w1h, },
			wL: { texture: TEXTURES.w1l, },
			wLT: { texture: TEXTURES.w1lt, },
			wLTR: { texture: TEXTURES.w1ltr, },
			wR: { texture: TEXTURES.w1r, },
			wRB: { texture: TEXTURES.w1rb, },
			wRBL: { texture: TEXTURES.w1rbl, },
			wT: { texture: TEXTURES.w1t, },
			wTR: { texture: TEXTURES.w1tr, },
			wTRB: { texture: TEXTURES.w1trb, },
			wTRBL: { texture: TEXTURES.w1trbl, },
			wP: { texture: TEXTURES.w1p, },
			wV: { texture: TEXTURES.w1v, },
		},

	};

	var game = new Game(gameOptions);
	game.tact();
//	console.log(game.height * )

	// test
	$("document").ready(function(){
		var canvas = document.getElementById('easel');
		canvas.height = CELL_HEIGHT * CELLS_HAMOUNT;
		canvas.width = CELL_WIDTH * CELLS_WAMOUNT;
		var context = canvas.getContext('2d');
		var x = 0, y = 0;
		draw(TEXTURES.w1rb, x, y);
		draw(TEXTURES.w1h, x + 1, y);
		draw(TEXTURES.w1bl, x + 2, y);
		draw(TEXTURES.w1v, x + 0, y + 1);
		draw(TEXTURES.w1v, x + 2, y + 1);
		draw(TEXTURES.w1tr, x, y + 2);
		draw(TEXTURES.w1h, x + 1, y + 2);
		draw(TEXTURES.w1lt, x + 2, y + 2);
	});
})();
