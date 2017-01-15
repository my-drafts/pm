'use strict';

(function(){
	const CELL_SIZE = 16, CELLS_AMOUNT = 5;
	const CELL_HEIGHT = CELL_SIZE, CELL_WIDTH = CELL_SIZE;
	const CELLS_HAMOUNT = 3*CELLS_AMOUNT;
	const CELLS_WAMOUNT = 4*CELLS_AMOUNT;
	const TEXTURES = playTextures();

	// convas, image, coords, size
	function __draw(canvas, image, t, s){
		var twh = t.w>0 && t.h>0 ? [t.w, t.h] : t.s>0 ? [t.s, t.s] : [];
		var trg = (t && t.x>0 && t.y>0 ? [t.x, t.y] : [0, 0]).concat(twh);
		var src =  s && s.x && s.y && s.w>0 && s.h>0 ? [s.x, s.y, s.w, s.h] : [];
		var context = canvas.getContext('2d');
		console.log(trg, src);
		context.drawImage.apply(context, [image].concat(trg, src));
	}

	function __undraw(canvas, trg){
		var trgs = trg && trg.s>0 ? {w: trg.s, h: trg.s} : {};
		var t = Object.assign({ x: 0, y: 0, w: canvas.width, h: canvas.height }, trgs, trg);
		canvas.getContext('2d').clearRect(t.x, t.y, t.w, t.h);
	}

	var drawCellLT = { x: 0, y:0 }; // visible left top cell

//ctx.clearRect(10, 10, 200, 200); // Очистка области указанного размера и положения
//ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста 

/*
	function __undraw(xIndex, yIndex, width, height){
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
*/
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
			_default: {
				draw: __draw,
				undraw: __undraw
			},
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

		cellHieght: CELL_HEIGHT,
		cellWidth: CELL_WIDTH,
		draw: __draw,
		undraw: __undraw,

		field: {
			cells: {
				_default: {
					draw: __draw,
					texture: TEXTURES.field,
					undraw: __undraw,
				},
				'0:1': {},
				0: {},
			},
			draw: __draw,
			height: 10,
			width: 10,
			undraw: __undraw,
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
		__draw(canvas, TEXTURES.w1rb, { x: x, y: y });
		__draw(canvas, TEXTURES.w1h, { x: x + 1, y: y });
		__draw(canvas, TEXTURES.w1bl, { x: x + 2, y: y });
		__draw(canvas, TEXTURES.w1v, { x: x + 0, y: y + 1 });
		__draw(canvas, TEXTURES.w1v, { x: x + 2, y: y + 1 });
		__draw(canvas, TEXTURES.w1tr, { x: x, y: y + 2 });
		__draw(canvas, TEXTURES.w1h, { x: x + 1, y: y + 2 });
		__draw(canvas, TEXTURES.w1lt, { x: x + 2, y: y + 2 });
	});
})();
