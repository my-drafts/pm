'use strict';

class Game{
	constructor(options){
		var game = this;
		this._tactIndex = undefined;

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
			else{
				throw '[Game.constructor]: Wrong visible size';
			}
		}
		else{
			throw '[Game.constructor]: Wrong field cfg';
		}

		// gist
		if(options.maps){
			game._gists = [];
			game._maps = new Map(options.maps);
			if(!(game._maps.size==game._field.size)){
				throw '[Game.constructor]: Wrong map size';
			}
		}
		else{
			throw '[Game.constructor]: Wrong map cfg';
		}

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
		else{
			throw '[Game.constructor]: Wrong walls cfg';
		}

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
		else{
			throw '[Game.constructor]: Wrong foods cfg';
		}

		// bots
		if(!options.bots){
			throw '[Game.constructor]: Wrong bots cfg';
		}
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
		else{
			throw '[Game.constructor]: Wrong bots amount';
		}

		// man
		if(!options.mans){
			throw '[Game.constructor]: Wrong mans cfg';
		}
			var m = options.mans;
			var m1 = options.mans._default;
		if(options.mans.amount>0){
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
		else{
			throw '[Game.constructor]: Wrong mans amount';
		}

		if(typeof options.draw=='function'){
			game._draw = options.draw;
		}
		else{
			throw '[Game.constructor]: Wrong draw';
		}
	}

	get bots(){ return this._gists.filter(function(g){ return g instanceof Bot; }); }
	get foods(){ return this._gists.filter(function(g){ return g instanceof Food; }); }
	get mans(){ return this._gists.filter(function(g){ return g instanceof Man; }); }
	get walls(){ return this._gists.filter(function(g){ return g instanceof Wall; }); }
	get field(){ return this._field; }


	get visibleCellsIndex(){
		return this.field.c.map(function(cell){
			return {
				index: cell.index, 
				x: cell.xIndex, 
				y: cell.yIndex
			};
		}).filter(function(cell){
			if(c.xIndex<this.vleft) return false;
			if(c.yIndex<this.vtop) return false;
			if(this.vright<=c.xIndex) return false;
			if(this.vbottom<=c.yIndex) return false;
			return true;
		}).map(function(c){
			return c.index;
		});
	}

	get vb(){ return this.vt + this.vh; }
	get vh(){ return this._visible.height; }
	get vl(){ return this._visible.left; }
	get vr(){ return this.vl + this.vw; }
	get vt(){ return this._visible.top; }
	get vw(){ return this._visible.width; }

	get tactIndex(){ return this._tactIndex; }
	
	tact(){

	}

	gists(is){
		return this._gists.filter(function(g){
			return g.is==String(is).toLowerCase();
		});
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

