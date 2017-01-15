'use strict';

// ячейка
class Cell extends Gameable{

	get g(){
		return this._gists;
	}

	get h(){
		return this.height;
	}

	get i(){
		return this.index;
	}

	get ix(){
		return this.xIndex;
	}

	get ixy(){
		return { i: this.index, ix: this.xIndex, iy: this.yIndex };
	}

	get iy(){
		return this.yIndex;
	}

	get w(){
		return this.width;
	}


	get gists(){
		return this._gists;
	}

	get height(){
		return this.game.cellHeight;
	}

	get index(){
		return this._index;
	}

	get xIndex(){
		return this.index % this.field.width;
	}

	get yIndex(){
		return this.index / this.field.width;
	}

	get width(){
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

}
