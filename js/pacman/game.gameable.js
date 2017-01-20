'use strict';

class Gameable{

	get field(){
		return this.game.field;
	}

	get game(){
		return this._game;
	}

	get is(){
		return this._is;
	}

	get painted(){
		return this._painted;
	}

	set painted(_painted){
		this._painted = Boolean(_painted);
	}


	constructor(is, game, options){
		// is
		if(is && (typeof is=='string' || is instanceof String)){
			this._is = String(is).toLowerCase();
		}
		else throw '[Gameable.constructor]: Wrong is';
		
		// game
		if(game && game instanceof Game){
			this._game = game;
		}
		else throw '[Gameable.constructor]: Wrong game in ' + this._is;

		// options
		if(options && options instanceof Object) ;
		else throw '[Gameable.constructor]: Wrong options in ' + this._is;

		// draw
		if(typeof options.draw=='function'){
			this._draw = options.draw;
		}

		// undraw
		if(typeof options.undraw=='function'){
			this._undraw = options.undraw;
		}

		this._painted = false;
	}


	draw(image, trg, src){
		if(!!this._painted){
			this._painted = true;
		}
		else if(this._draw){
			this._draw(image, trg, src);
			this._painted = true;
		}
		else if(this._game._draw){
			this._game.draw(image, trg, src);
			this._painted = true;
		}
		else throw '[Gameable.draw]: no draw method';
	}

	undraw(trg){
		if(this._undraw){
			this._undraw(trg);
			//this._painted = false;
		}
		else if(this._game.undraw){
			this._game.undraw(trg);
			//this._painted = false;
		}
		else throw '[Gameable.undraw]: no undraw method';
	}

}