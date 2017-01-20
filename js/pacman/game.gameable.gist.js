 'use strict';

// сущьность
class Gist extends Gameable{

	get class(){
		return this._class;
	}

	get cell(){
		return this._cell;
	}

	get texture(){
		return this._texture;
	}

	constructor(is, game, options){
		super(is, game, options);

		this._class = false;
		this._cell = false;

		// options.texture
		if(options.texture){
			this._texture = options.texture;
		}
		else throw '[Gist.constructor]: Wrong texture in ' + this.is;
	}


	bind(cell){
		if(!(cell instanceof Cell)) throw '[Gist.bind]: Wrong cell';
		else{
			this._cell = cell;
		}
	}

	unbind(){
		this._cell = false;
	}

}
