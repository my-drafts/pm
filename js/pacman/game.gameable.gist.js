'use strict';

// сущьность
class Gist extends Gameable{
	constructor(is, game, options){
		super(is, game, options);

		if(options.texture){
			this._texture = options.texture;
		}
		else{
			throw '[Gist.constructor]: Wrong texture in ' + this.is;
		}

		this._cell = false;
	}

	get cell(){
		return this._cell;
	}

	bind(cell){
		if(cell instanceof Cell){
			this._cell = cell;
		}
		else{
			throw '[Gist.bind]: Wrong cell';
		}
	}

	unbind(){
		this._cell = false;
	}

}

