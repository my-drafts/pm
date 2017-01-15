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
		if(typeof options.draw=='function' || typeof options.undraw=='function'){
			this._painted = false;
			this._draw = options.draw;
			this._undraw = options.undraw;
		}
		else throw '[Gameable.constructor]: Wrong (draw, undraw) in ' + this._is;
	}


	draw(){
		console.log('!2!');
		!this._painted && this._draw && this._draw(this);
		this._painted = true;
	}

	undraw(){
		this._undraw && this._undraw(this);
		//this._painted = false;
	}

}