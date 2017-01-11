'use strict';

class Gameable{
	constructor(is, game, options){
		if(is && (typeof is=='string' || is instanceof String)) this._is = String(is).toLowerCase();
		else throw '[Gameable.constructor]: Wrong is';

		if(game && game instanceof Game) this._game = game;
		else throw '[Gameable.constructor]: Wrong game in ' + this._is;

		if(options && options instanceof Object) ;
		else throw '[Gameable.constructor]: Wrong options in ' + this._is;

		if(typeof options.draw=='function'){
			this._painted = false;
			this._draw = options.draw;
		}
		else throw '[Gameable.constructor]: Wrong draw in ' + this._is;
	}

	draw(){
		!this._painted && this._draw && this._draw(this);
		this._painted = true;
	}

	get field(){ return this._game.field; }
	get game(){ return this._game; }
	get is(){ return this._is; }
	get painted(){ return this._painted; }
	set painted(_painted){ this._painted = Boolean(_painted); }

}