'use strict';

class Man extends Actor{
	constructor(game, options) {
		super('man', game, options);

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

