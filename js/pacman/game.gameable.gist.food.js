'use strict';

class Food extends Gist{

	get eaten(){
		return this._eaten;
	}
	
	set eaten(e){
		this._eaten = !!e;
	}

	constructor(game, options) {
		super('food', game, options);

		// options.foodClass
		if(options.foodClass){
			this._class = options.foodClass;
		}
		
		this._eaten = false;
	}

	draw(){
		var texture = this.texture;
		var trg = this.game.cell2XY(this._cell);
		super.draw(texture, trg);
	}

	undraw(){
	}

}

