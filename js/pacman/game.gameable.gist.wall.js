'use strict';

class Wall extends Gist{

	constructor(game, options) {
		super('wall', game, options);
		
		// options.wallClass
		if(options.wallClass){
			this._class = options.wallClass;
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

