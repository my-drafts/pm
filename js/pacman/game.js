'use strict';

class Game{

	get b(){
		return this.bots; 
	}

	get f(){
		return this.foods;
	}

	get g(){
		return this.gists;
	}

	get m(){
		return this.mans;
	}

	get vb(){
		return this.visibleBottom;
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

		game._tactIndex = 0;

		if(options && options instanceof Object) ;
		else throw '[Game.constructor]: Wrong options';

		// field
		if(options.field){
			game._field = new Field(game, options.field);
			if(!options.visible){
				game._visible = {
					height: game.field.height,
					left: 0,
					top: 0,
					width: game.field.width,
				};
			}
			else if(options.visible.height>0 && options.visible.width>0){
				game._visible = {
					height: options.visible.height,
					left: Math.max(options.visible.left, 0),
					top: Math.max(options.visible.top, 0),
					width: options.visible.width,
				};
				game._visible.left = Math.min(game.vleft, game.field.width - game.vwidth);
				game._visible.top = Math.min(game.vtop, game.field.height - game.vheight);
			}
			else throw '[Game.constructor]: Wrong visible size';
		}
		else throw '[Game.constructor]: Wrong field cfg';

		// gist
		if(options.maps){
			game._gists = [];
			game._maps = new Map(options.maps);
			if(game._maps.size==game._field.size);
			else throw '[Game.constructor]: Wrong map size';
		}
		else throw '[Game.constructor]: Wrong map cfg';

		// walls
		if(options.walls){
			var walls = options.walls.filter({ nk: /^_default$/ }).map(function(wallOptions, wallClass){
				return game._maps.filter(function(cellClass, cellindex){
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
			var foods = options.foods.filter({ nk: /^_default$/ }).map(function(foodOptions, foodClass){
				return game._maps.filter(function(cellClass, cellindex){
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
				game._maps.filter(function(cellClass, cellindex){
					return cellClass==o.cell;
				}).map(function(cellIndex){
					game.field.bind(bot, cellIndex);
				});
				return bot;
			});
			game._gists = game._gists.concat(bots);
		}
		else throw '[Game.constructor]: Wrong bots amount';

		// man
		if(!options.mans) throw '[Game.constructor]: Wrong mans cfg';
		else if(options.mans.amount>0){
			var mans = [...Array(options.mans.amount).keys()].map(function(index){
				var o = Object.assign({index: index}, options.mans._default, options.mans[index]);
				var man = new Man(game, o);
				game._maps.filter(function(cellClass, cellindex){
					return cellClass==o.cell;
				}).map(function(cellIndex){
					game.field.bind(man, cellIndex);
				});
				return man;
			});
			game._gists = game._gists.concat(mans);
		}
		else throw '[Game.constructor]: Wrong mans amount';

		if(typeof options.draw=='function'){
			game._draw = options.draw;
		}
		else throw '[Game.constructor]: Wrong draw';
	}

	tact(){
		console.log(1);
	}

	gists(filter){
		if(typeof filter==='function'){
			return this.g.filter(filter);		
		}
		else if(typeof filter==='string' || filter instanceof String){
			var is = String(is).toLowerCase();
			return this.g.filter(function(g){
				return g.is==is;
			});
		}
		return this.g;
	}

/*
	get height(){
		return this._field.height;
	}

	get size(){
		return this._field.size;
	}

	get width(){
		return this._field.width;
	}

	draw(){
		this._draw && this._draw(this);
	}
*/
}

