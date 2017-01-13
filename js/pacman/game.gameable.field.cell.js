'use strict';

// ячейка
class Cell extends Gameable{

	get g(){
		return this.gists;
	}

	get gists(){
		return this._gists;
	}

	get h(){
		return this.game.cellHeight;
	}

	get i(){
		return this.index;
	}

	get index(){
		return this._index;
	}

	get ix(){
		return this.i % this.field.width;
	}

	get ixy(){
		return { i: this.i, ix: this.ix, iy: this.iy };
	}

	get iy(){
		return this.i / this.field.width;
	}

	get w(){
		return this.game.cellWidth;
	}

	constructor(game, options){
		super('cell', game, options);

		this._gists = [];

		if(options.index>=0){
			this._index = options.index;
		}
		else throw '[Cell.constructor]: Wrong cell index';
	}

	bind(gist){
		if(gist instanceof Gist){
			this._gists.push(gist);
		}
		else throw '[Cell.bind]: Wrong gist';
	}

	unbind(gist){
		if(gist instanceof Gist){
			this._gists = this._gists.filter(function(g){
				return g!=gist;
			});
		}
		else throw '[Cell.unbind]: Wrong gist';
	}

	gists(filter){
		if(typeof filter===function){
			return this.gists.filter(filter);		
		}
		else if(typeof filter==='string' || filter instanceof String){
			var is = String(is).toLowerCase();
			return this.g.filter(function(g){
				return g.is==is;
			});
		}
		return this.g;
	}

}

