'use strict';

(function(){
	const TEXTURES = playTextures();

	// context, image, coords, size
	function __draw(canvas, image, t, s){
		t = Object.assign({}, (t && t.s>0) ? {w: t.s, h: t.s} : {}, t);
		var trg = (t.x && t.y ? [t.x, t.y] : [0, 0]).concat(t.w>0 && t.h>0 ? [t.w, t.h] : []);
		var src =  s && ('x' in s) && ('y' in s) && s.w>0 && s.h>0 ? [s.x, s.y, s.w, s.h] : [];
		var context = canvas.getContext('2d');
		context.drawImage.apply(context, [image].concat(trg, src));
	}

	function __undraw(canvas, t){
		var ts = t && t.s>0 ? {w: t.s, h: t.s} : {};
		var trg = Object.assign({ x: 0, y: 0, w: canvas.width, h: canvas.height }, ts, t);
		canvas.getContext('2d').clearRect(trg.x, trg.y, trg.w, trg.h);
	}

	function manDirection(d){
		if(d=='u'){
			return ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else if(d=='r'){
			return ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else if(d=='d'){
			return ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else if(d=='l'){
			return ['l0', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else throw 'manDirection';
	}

	function botDirection(d){
		if(d=='u'){
			return ['u0', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else if(d=='r'){
			return ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else if(d=='d'){
			return ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else if(d=='l'){
			return ['l0', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', ].map(function(s, i, a){
				return {s:s, i:i, l:a.length};
			});			
		}
		else{
			return [];
		}
	}

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

	var gameOptions = {
		bots: {
			_default: {},
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

		game: {
			canvas: '#easel',
			canvasCellHieght: 48,
			canvasCellWidth: 48,
			draw: __draw,
			undraw: __undraw,

			maps: '\
			  wRB,  wH,  wH,  wH,  wH,  wH,  wH,  wH,  wH, wBL,\
			   wV,  f1,   -,  f1,   -,   -,  f1,   -,  f1,  wV,\
			   wV,   -,  wP,  wP,  f1,  f1, wRB, wBL,   -,  wV,\
			   wV,   -,  wP,  wP,  f1,  f1, wTR, wLT,   -,  wV,\
			   wV,  f1,  f1,  f1,   -,   -,  f1,  f1,  f1,  wV,\
			   wV,   -,  wP,   -,  wP,  wP,  f1,  wP,   -,  wV,\
			   wV,  f1,  wP,  m1,  wP,  b1,  b2,  wP,  f1,  wV,\
			   wV,   -,  wP,   -,  wP,  wP,  f1,  wP,   -,  wV,\
			   wV,  f1,   -,  f1,   -,   -,  f1,   -,  f1,  wV,\
			  wTR,  wH,  wH,  wH,  wH,  wH,  wH,  wH,  wH, wLT \
			',

			sleep: 100,

			visible: {
				height: 3*20,
				left: 0,
				top: 0,
				width: 4*20,
			},

		},

		field: {
			cells: {
				_default: {
					texture: TEXTURES.field,
				},
				'0:1': {},
				0: {},
			},
			height: 10,
			width: 10,
		},

		foods: {
			_default: {},
			f1: { texture: TEXTURES.food1, },
		},

		mans: {
			_default: {},
			amount: 1,
			0: {
				cell: 'm1',
				texture: TEXTURES.man1,
			},
		},

		walls: {
			_default: {},
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

	document.bindKey('ArrowUp', function(){
		//console.log('man[0] move up');
		game.mans[0].action = manDirection('u');
	});

	document.bindKey('ArrowDown', function(){
		//console.log('man[0] move down');
		game.mans[0].action = manDirection('d');
	});

	document.bindKey('ArrowLeft', function(){
		//console.log('man[0] move left');
		game.mans[0].action = manDirection('l');
	});

	document.bindKey('ArrowRight', function(){
		//console.log('man[0] move right');
		game.mans[0].action = manDirection('r');
	});

	var run = document.bindKey('Enter', function(){
		console.log('start game');
		game.run();
		document.unbindKey(run);
	});

	game.run();

	setInterval(function(){
		game.bots.forEach(function(bot){
			var r = Math.random();
			var R = Math.floor(r*39/10);
			var d = ['d', 'l', 'r', 'u'][R];
			var D = botDirection(d);
			bot.action = D;
			console.log(R, d, D);
		});
	}, gameOptions.game.sleep * 4);
})();
