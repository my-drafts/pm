'use strict';

// ячейка
class Cell extends Gameable{
	constructor(game, options){
		super('cell', game, options);

		if(!options){
			throw '[Cell.constructor]: Wrong options';
		}

		if(options.index>=0){
			this._index = options.index;
		}
		else{
			throw '[Cell.constructor]: Wrong cell index';
		}

		this._gists = [];
	}

	get index(){
		return this._index;
	}

	get xIndex(){
		return this._index % this.field.width;
	}

	get yIndex(){
		return this._index / this.field.width;
	}

	bind(gist){
		if(gist instanceof Gist){
			this._gists.push(gist);
		}
		else{
			throw '[Cell.bind]: Wrong gist';
		}
	}

	gists(is){
		return this._gists.filter(function(g){
			return g.is==String(is).toLowerCase();
		});
	}

	unbind(gist){
		if(gist instanceof Gist){
			this._gists = this._gists.filter(function(g){
				return g!=gist;
			});
		}
		else{
			throw '[Cell.unbind]: Wrong gist';
		}
	}

}

