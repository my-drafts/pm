'use strict';

class Food extends Gist{
	constructor(game, options) {
		super('food', game, options);

		if(options.foodClass){
			this._class = options.foodClass;
		}

	}

}

