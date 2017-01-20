'use strict';

class Food extends Gist{

	constructor(game, options) {
		super('food', game, options);

		// options.foodClass
		if(options.foodClass){
			this._class = options.foodClass;
		}
	}

	draw(){
		var texture = this.texture;
		var trg = this.game.cell2XY(this._cell);
		super.draw(texture, trg);
	}

	undraw(){
	}

}

