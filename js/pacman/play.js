'use strict';

var canvasCellSize = 16;
var canvasCellsAmount = 5;
var canvasCellHeight = canvasCellSize;
var canvasCellWidth = canvasCellSize;
var canvasCellsHorizontalAmount = 4*canvasCellsAmount;
var canvasCellsVerticallyAmount = 3*canvasCellsAmount;
var canvasTextures = {
	bot: {
		0: {
			B: [
				'img/bots/0/p-32.png',
				'img/bots/0/b1-32.png',
				'img/bots/0/b2-32.png',
				'img/bots/0/b1-32.png',
				'img/bots/0/b2-32.png',
				'img/bots/0/b1-32.png',
				'img/bots/0/p-32.png',
			],
			L: [
				'img/bots/0/p-32.png',
				'img/bots/0/l1-32.png',
				'img/bots/0/l2-32.png',
				'img/bots/0/l1-32.png',
				'img/bots/0/l2-32.png',
				'img/bots/0/l1-32.png',
				'img/bots/0/p-32.png',
			],
			P: 'img/bots/0/p-32.png',
			R: [
				'img/bots/0/p-32.png',
				'img/bots/0/r1-32.png',
				'img/bots/0/r2-32.png',
				'img/bots/0/r1-32.png',
				'img/bots/0/r2-32.png',
				'img/bots/0/r1-32.png',
				'img/bots/0/p-32.png',
			],
			T: [
				'img/bots/0/p-32.png',
				'img/bots/0/t1-32.png',
				'img/bots/0/t2-32.png',
				'img/bots/0/t1-32.png',
				'img/bots/0/t2-32.png',
				'img/bots/0/t1-32.png',
				'img/bots/0/p-32.png',
			],
		},
		1: {
			B: [
				'img/bots/1/p-32.png',
				'img/bots/1/b1-32.png',
				'img/bots/1/b2-32.png',
				'img/bots/1/b1-32.png',
				'img/bots/1/b2-32.png',
				'img/bots/1/b1-32.png',
				'img/bots/1/p-32.png',
			],
			L: [
				'img/bots/1/p-32.png',
				'img/bots/1/l1-32.png',
				'img/bots/1/l2-32.png',
				'img/bots/1/l1-32.png',
				'img/bots/1/l2-32.png',
				'img/bots/1/l1-32.png',
				'img/bots/1/p-32.png',
			],
			P: 'img/bots/1/p-32.png',
			R: [
				'img/bots/1/p-32.png',
				'img/bots/1/r1-32.png',
				'img/bots/1/r2-32.png',
				'img/bots/1/r1-32.png',
				'img/bots/1/r2-32.png',
				'img/bots/1/r1-32.png',
				'img/bots/1/p-32.png',
			],
			T: [
				'img/bots/1/p-32.png',
				'img/bots/1/t1-32.png',
				'img/bots/1/t2-32.png',
				'img/bots/1/t1-32.png',
				'img/bots/1/t2-32.png',
				'img/bots/1/t1-32.png',
				'img/bots/1/p-32.png',
			],
		},
		2: {
			B: [
				'img/bots/2/p-32.png',
				'img/bots/2/b1-32.png',
				'img/bots/2/b2-32.png',
				'img/bots/2/b1-32.png',
				'img/bots/2/b2-32.png',
				'img/bots/2/b1-32.png',
				'img/bots/2/p-32.png',
			],
			L: [
				'img/bots/2/p-32.png',
				'img/bots/2/l1-32.png',
				'img/bots/2/l2-32.png',
				'img/bots/2/l1-32.png',
				'img/bots/2/l2-32.png',
				'img/bots/2/l1-32.png',
				'img/bots/2/p-32.png',
			],
			P: 'img/bots/2/p-32.png',
			R: [
				'img/bots/2/p-32.png',
				'img/bots/2/r1-32.png',
				'img/bots/2/r2-32.png',
				'img/bots/2/r1-32.png',
				'img/bots/2/r2-32.png',
				'img/bots/2/r1-32.png',
				'img/bots/2/p-32.png',
			],
			T: [
				'img/bots/2/p-32.png',
				'img/bots/2/t1-32.png',
				'img/bots/2/t2-32.png',
				'img/bots/2/t1-32.png',
				'img/bots/2/t2-32.png',
				'img/bots/2/t1-32.png',
				'img/bots/2/p-32.png',
			],
		},
		3: {
			B: [
				'img/bots/3/p-32.png',
				'img/bots/3/b1-32.png',
				'img/bots/3/b2-32.png',
				'img/bots/3/b1-32.png',
				'img/bots/3/b2-32.png',
				'img/bots/3/b1-32.png',
				'img/bots/3/p-32.png',
			],
			L: [
				'img/bots/3/p-32.png',
				'img/bots/3/l1-32.png',
				'img/bots/3/l2-32.png',
				'img/bots/3/l1-32.png',
				'img/bots/3/l2-32.png',
				'img/bots/3/l1-32.png',
				'img/bots/3/p-32.png',
			],
			P: 'img/bots/3/p-32.png',
			R: [
				'img/bots/3/p-32.png',
				'img/bots/3/r1-32.png',
				'img/bots/3/r2-32.png',
				'img/bots/3/r1-32.png',
				'img/bots/3/r2-32.png',
				'img/bots/3/r1-32.png',
				'img/bots/3/p-32.png',
			],
			T: [
				'img/bots/3/p-32.png',
				'img/bots/3/t1-32.png',
				'img/bots/3/t2-32.png',
				'img/bots/3/t1-32.png',
				'img/bots/3/t2-32.png',
				'img/bots/3/t1-32.png',
				'img/bots/3/p-32.png',
			],
		},
	},
	food: {
		1: {
			cherry: 'img/foods/cherry.png',
		},
	},
	man: {
		1: {
			B: [
				'img/mans/p-32.png',
				'img/mans/b1-32.png',
				'img/mans/b2-32.png',
				'img/mans/b3-32.png',
				'img/mans/b4-32.png',
				'img/mans/b5-32.png',
				'img/mans/p-32.png',
			],
			L: [
				'img/mans/p-32.png',
				'img/mans/l1-32.png',
				'img/mans/l2-32.png',
				'img/mans/l3-32.png',
				'img/mans/l4-32.png',
				'img/mans/l5-32.png',
				'img/mans/p-32.png',
			],
			P: 'img/mans/p-32.png',
			R: [
				'img/mans/p-32.png',
				'img/mans/r1-32.png',
				'img/mans/r2-32.png',
				'img/mans/r3-32.png',
				'img/mans/r4-32.png',
				'img/mans/r5-32.png',
				'img/mans/p-32.png',
			],
			T: [
				'img/mans/p-32.png',
				'img/mans/t1-32.png',
				'img/mans/t2-32.png',
				'img/mans/t3-32.png',
				'img/mans/t4-32.png',
				'img/mans/t5-32.png',
				'img/mans/p-32.png',
			],
		},
	},
	wall: {
		1: {
			angel: {
				TR: 'img/walls/angel/tr-32.png',
				RB: 'img/walls/angel/rb-32.png',
				BL: 'img/walls/angel/bl-32.png',
				LT: 'img/walls/angel/lt-32.png',
			},
			cross:{
				TRB: 'img/walls/cross/trb-32.png',
				RBL: 'img/walls/cross/rbl-32.png',
				BLT: 'img/walls/cross/blt-32.png',
				LTR: 'img/walls/cross/ltr-32.png',
				TRBL: 'img/walls/cross/trbl-32.png',
			},
			line: {
				B: 'img/walls/line/b-32.png',
				H: 'img/walls/line/h-32.png',
				L: 'img/walls/line/l-32.png',
				R: 'img/walls/line/r-32.png',
				T: 'img/walls/line/t-32.png',
				V: 'img/walls/line/v-32.png',
			},
			P: 'img/walls/p.png',
		},
	},
};
var src2img = function(src){
	if(typeof src=='string' || src instanceof String){
		var img = new Image();
		img.src = src;
		return img;
	}
	else if(src instanceof Array){
		return src.map(src2img);
	}
	else if(src instanceof Object){
		return src.map(src2img);
	}
}
canvasTextures = canvasTextures.map(src2img);

function drawXY(img, x, y, width, height){
	var canvas = document.getElementById('easel');
	var context = canvas.getContext('2d');
	context.drawImage(img, x, y, width, height);
}

var drawCellLT = { x: 0, y:0 }; // visible left top cell

function drawCellXY(img, xIndex, yIndex, width, height){
	var x = xIndex * canvasCellWidth;
	var y = yIndex * canvasCellHeight;
	drawXY(img, x, y, width || canvasCellWidth, height || canvasCellHeight);
}

// test
$("document").ready(function(){
	var canvas = document.getElementById('easel');
	canvas.height = canvasCellHeight * canvasCellsVerticallyAmount;
	canvas.width = canvasCellWidth * canvasCellsHorizontalAmount;
	var context = canvas.getContext('2d');
	var x = 0, y = 0;
	drawCellXY(canvasTextures.wall[1].angel.RB, x, y);
	drawCellXY(canvasTextures.wall[1].line.H, x + 1, y);
	drawCellXY(canvasTextures.wall[1].angel.BL, x + 2, y);
	drawCellXY(canvasTextures.wall[1].line.V, x + 0, y + 1);
	drawCellXY(canvasTextures.wall[1].line.V, x + 2, y + 1);
	drawCellXY(canvasTextures.wall[1].angel.TR, x, y + 2);
	drawCellXY(canvasTextures.wall[1].line.H, x + 1, y + 2);
	drawCellXY(canvasTextures.wall[1].angel.LT, x + 2, y + 2);

});

function botDraw(){
	var height = canvasCellHeight, width = canvasCellWidth;
	var textures = canvasTextures.bot;
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
		_default: {
			cell: 'b1',
			draw: botDraw(),
		},
		amount: 4,
		0: {
			texture: canvasTextures.bot[0],
		},
		1: {
			cell: 'b2',
			texture: canvasTextures.bot[1],
		},
		2: {
			texture: canvasTextures.bot[2],
		},
		3: {
			cell: 'b2',
			texture: canvasTextures.bot[3],
		},
	},

	draw: gameDraw(),

	field: {
		cells: {
			_default: {
				draw: cellDraw(),
			},
			'0:1': {},
			0: {},
		},
		draw: fieldDraw(),
		height: 10,
		width: 10,
		visible: {
			height: 4,
			left: 0,
			top: 0,
			width: 4,
		},
	},

	foods: {
		_default: {
			draw: foodDraw(),
		},
		f1: {
			texture: canvasTextures.food[1].cherry,
		},
	},

	mans: {
		_default: {
			cell: 'm1',
			draw: manDraw(),
		},
		amount: 1,
		0: {
			texture: canvasTextures.man[1],
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
		_default: {
			draw: wallDraw(),
			texture: canvasTextures.wall[1].P,
		},
		wB: {
			texture: canvasTextures.wall[1].line.B,
		},
		wBL: {
			texture: canvasTextures.wall[1].angel.BL,
		},
		wBLT: {
			texture: canvasTextures.wall[1].cross.BLT,
		},
		wH: {
			texture: canvasTextures.wall[1].line.H,
		},
		wL: {
			texture: canvasTextures.wall[1].line.L,
		},
		wLT: {
			texture: canvasTextures.wall[1].angel.LT,
		},
		wLTR: {
			texture: canvasTextures.wall[1].cross.LTR,
		},
		wR: {
			texture: canvasTextures.wall[1].line.R,
		},
		wRB: {
			texture: canvasTextures.wall[1].angel.RB,
		},
		wRBL: {
			texture: canvasTextures.wall[1].cross.RBL,
		},
		wT: {
			texture: canvasTextures.wall[1].line.T,
		},
		wTR: {
			texture: canvasTextures.wall[1].angel.TR,
		},
		wTRB: {
			texture: canvasTextures.wall[1].cross.TRB,
		},
		wTRBL: {
			texture: canvasTextures.wall[1].cross.TRBL,
		},
		wP: {
		},
		wV: {
			texture: canvasTextures.wall[1].line.V,
		},
	},

};

var game = new Game(gameOptions);
