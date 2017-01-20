'use strict';

class Game{

	get b(){
		return this.bots; 
	}

	get f(){
		return this.foods;
	}

	get g(){
		return this._gists;
	}

	get m(){
		return this.mans;
	}

	get vb(){
		return this.visibleBottomIndex;
	}

	get vc(){
		return this.visibleCellsIndex;
	}

	get vh(){
		return this.visibleHieghtIndex;
	}

	get vl(){
		return this.visibleLeftIndex;
	}

	get vr(){
		return this.visibleRightIndex;
	}

	get vt(){
		return this.visibleTopIndex;
	}

	get vw(){
		return this.visibleWidthIndex;
	}

	get w(){
		return this.walls;
	}


	get bots(){
		return this.gists('bot'); 
	}

	get canvas(){
		return this._canvas;
	}

	get cellHeight(){
		return this._canvasCellHeight;
	}

	get cellWidth(){
		return this._canvasCellWidth;
	}

	get field(){
		return this._field;
	}

	get foods(){
		return this.gists('food');
	}

	get gists(){
		return this._gists;
	}

	get mans(){
		return this.gists('man');
	}

	get tactIndex(){
		return this._tactIndex;
	}

	get tactSleep(){
		return this._tactSleep;
	}

	get visibleBottomIndex(){
		return this.visibleTopIndex + this.visibleHieghtIndex;
	}

	get visibleCellsIndex(){
		return this.field.c.map(function(cell){
			return { i: cell.i, ix: cell.ix, iy: cell.iy };
		}).filter(function(c){
			return (this.vl<=c.ix && c.ix<this.vr) && (this.vt<=c.iy && c.iy<this.vb);
		}).map(function(c){
			return c.index;
		});
	}

	get visibleHieghtIndex(){
		return this._visible.height;
	}

	get visibleLeftIndex(){
		return this._visible.left;
	}

	get visibleRightIndex(){
		return this.visibleLeftIndex + this.visibleWidthIndex;
	}

	get visibleTopIndex(){
		return this._visible.top;
	}

	get visibleWidthIndex(){
		return this._visible.width;
	}

	get walls(){
		return this.gists('wall');
	}

	
	constructor(options){
		var game = this;

		if(options && options.game && options.game instanceof Object) ;
		else throw '[Game.constructor]: Wrong options';

		// field
		if(options.field){
			game._field = new Field(game, options.field);
		}
		else throw '[Game.constructor]: Wrong field cfg';

		game._gists = [];

		// map
		if(options.game.maps){
			game._maps = new Map(options.game.maps);
			if(game._maps.size==game._field.size);
			else throw '[Game.constructor]: Wrong map size';
		}
		else throw '[Game.constructor]: Wrong map cfg';

		// walls
		if(options.walls){
			var walls = options.walls.filter({
				nk: /^_default$/
			}).map(function(wallOptions, wallClass){
				return game._maps.filter(function(cellClass, cellIndex){
					return cellClass==wallClass;
				}).map(function(cellIndex){
					var o = { cellIndex: cellIndex, wallClass: wallClass };
					o = Object.assign(o, options.walls._default, wallOptions);
					var wall = new Wall(game, o);
					game.field.bind(wall, cellIndex);
					return wall;
				});
			}).toArray();
			game._gists = [].concat.apply(game._gists, walls);
		}
		else throw '[Game.constructor]: Wrong walls cfg';

		// foods
		if(options.foods){
			var foods = options.foods.filter({
				nk: /^_default$/
			}).map(function(foodOptions, foodClass){
				return game._maps.filter(function(cellClass, cellIndex){
					return cellClass==foodClass;
				}).map(function(cellIndex){
					var o = { cellIndex: cellIndex, foodClass: foodClass };
					o = Object.assign(o, options.foods._default, foodOptions);
					var food = new Food(game, o);
					game.field.bind(food, cellIndex);
					return food;
				});
			}).toArray();
			game._gists = [].concat.apply(game._gists, foods);
		}
		else throw '[Game.constructor]: Wrong foods cfg';

		// bots
		if(!options.bots) throw '[Game.constructor]: Wrong bots cfg';
		else if(options.bots.amount>0){
			var bots = [...Array(options.bots.amount).keys()].map(function(index){
				var o = Object.assign({index: index}, options.bots._default, options.bots[index]);
				var bot = new Bot(game, o);
				game._maps.filter(function(cellClass, cellIndex){
					return cellClass==o.cell;
				}).map(function(cellIndex){
					game.field.bind(bot, cellIndex);
				});
				return bot;
			});
			game._gists = [].concat.apply(game._gists, bots);
		}
		else throw '[Game.constructor]: Wrong bots amount';

		// man
		if(!options.mans) throw '[Game.constructor]: Wrong mans cfg';
		else if(options.mans.amount>0){
			var mans = [...Array(options.mans.amount).keys()].map(function(index){
				var o = Object.assign({index: index}, options.mans._default, options.mans[index]);
				var man = new Man(game, o);
				game._maps.filter(function(cellClass, cellIndex){
					return cellClass==o.cell;
				}).map(function(cellIndex){
					game.field.bind(man, cellIndex);
				});
				return man;
			});
			game._gists = [].concat.apply(game._gists, mans);
		}
		else throw '[Game.constructor]: Wrong mans amount';

		// canvas
		if(options.game.canvas){
			game._canvas = $(options.game.canvas);
		}
		else throw '[Game.constructor]: Wrong canvas';

		// canvasCellSize
		if(options.game.canvasCellSize>0){
			game._canvasCellHeight = game._canvasCellWidth = options.game.canvasCellSize;
		}
		else if(options.game.canvasCellHieght>0 && options.game.canvasCellWidth>0){
			game._canvasCellHeight = options.game.canvasCellHieght;
			game._canvasCellWidth = options.game.canvasCellWidth;
		}
		else throw '[Game.constructor]: Wrong canvasCellSize';

		// canvasDraw
		if(typeof options.game.draw=='function'){
			game._draw = options.game.draw;
		}
		else throw '[Game.constructor]: Wrong draw';

		// canvasUnDraw
		if(typeof options.game.undraw=='function'){
			game._undraw = options.game.undraw;
		}
		else throw '[Game.constructor]: Wrong undraw';

		// sleep
		if(options.game.sleep>0){
			game._tactSleep = options.game.sleep;
		}
		else{
			game._tactSleep = 100;
		}

		// visible cells
		if(!options.game.visible){
			game._visible = {
				height: game.field.height,
				left: 0,
				top: 0,
				width: game.field.width,
			};
		}
		else if(options.game.visible.height>0 && options.game.visible.width>0){
			game._visible = {
				height: Math.min(options.game.visible.height, game.field.height),
				left: Math.max(options.game.visible.left, 0),
				top: Math.max(options.game.visible.top, 0),
				width: Math.min(options.game.visible.width, game.field.width),
			};
		}
		else throw '[Game.constructor]: Wrong visible size';

		var h = game._canvasCellHeight * game.vh + 1;
		var w = game._canvasCellWidth * game.vw + 1;
		game._canvas.attr('height', h + 'px');
		game._canvas.attr('width', w + 'px');

		game._tactIndex = 0;

		this.field.draw();
		this.walls.forEach(function(w, i){
			w.draw();
		});
		this.foods.forEach(function(f, i){
			f.draw();
		});
		this.bots.forEach(function(b){
			b.draw();
		});
		this.mans.forEach(function(m){
			m.draw();
		});
	}

	cell2xy(cell){
		var xy = cell.xy;
		var v = { x: xy.x - this.vl, y: xy.y - this.vt };
		if(0<=v.x && v.x<this.vw && 0<=v.y && v.y<this.vh){
			return v;
		}
		else throw '[Error Game]: cell2xy';
	}

	cell2XY(cell){
		var v = this.cell2xy(cell);
		return { x: v.x*this._canvasCellWidth+1, y: v.y*this._canvasCellHeight+1 };
	}

	draw(image, trg, src){
		if(this._draw){
			var canvas = this._canvas.get(0);
			if(!trg.w) trg.w = this._canvasCellWidth;
			if(!trg.h) trg.h = this._canvasCellHeight;
			return this._draw(canvas, image, trg, src);
		}
	}

	gists(filter){
		if(typeof filter==='function'){
			return this._gists.filter(filter);		
		}
		else if(typeof filter==='string' || filter instanceof String){
			var is = String(filter).toLowerCase();
			return this._gists.filter(function(g){
				return g.is==is;
			});
		}
		return this._gists;
	}

	run(){
		this._tactIndex = 0;
		var game = this;
		var it = function() {
			game.tact().then(function(res){
				game._tactIndex += 1;
				setTimeout(it, game.tactSleep);				
			}).catch(function(error){
				console.log(error);
			});
		};
		it();
	}

	tact(){
		var game = this;
		return new Promise(function(resolve, reject){
			console.log(game.tactIndex);
			
			//
			game.mans.filter(function(m){
				return m.acting || !m.painted;
			}).forEach(function(m){
				m.draw();
			});

			//*
			game.bots.filter(function(b){
				return b.acting || !b.painted;
			}).forEach(function(m){
				b.draw();
			});
			/**/
			resolve();
		});
	}

	undraw(trg){
		if(this._undraw){
			var canvas = this._canvas.get(0);
			if(!trg.w) trg.w = this._canvasCellWidth;
			if(!trg.h) trg.h = this._canvasCellHeight;
			return this._undraw(canvas, trg);
		}
	}

}

