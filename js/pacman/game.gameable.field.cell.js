'use strict';

// ячейка
class Cell extends Gameable{

	get gists(){ return this._gists; }
	get i(){ return this.index; }
	get index(){ return this._index; }
	get x(){ return this.i % this.field.width; }
	get y(){ return this.i / this.field.width; }

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

	gists(is){
		return this._gists.filter(function(g){
			return g.is==String(is).toLowerCase();
		});
	}

}

