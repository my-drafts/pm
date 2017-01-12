'use strict';

class Wall extends Gist{

	constructor(game, options) {
		super('wall', game, options);
		if(options.wallClass){
			this._class = options.wallClass;
		}	
	}

}

