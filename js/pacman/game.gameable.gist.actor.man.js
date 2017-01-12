'use strict';

class Man extends Actor{

	get i(){ return this.index; }
	get index(){ return this._index; }

	constructor(game, options) {
		super('man', game, options);

		if(options.index>=0) this._index = options.index;
		else throw '[Bot.constructor]: Wrong index';
	}

}

