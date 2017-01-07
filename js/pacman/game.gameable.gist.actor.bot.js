'use strict';

class Bot extends Actor{
	constructor(game, options) {
		super('bot', game, options);
		
		if(options.index>=0){
			this._index = options.index;
		}
		else{
			throw '[Bot.constructor]: Wrong index';
		}
	}

	get index(){
		return this._index;
	}

}

