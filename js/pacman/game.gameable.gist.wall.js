'use strict';

class Wall extends Gist{

	constructor(game, options) {
		super('wall', game, options);
		
		// options.wallClass
		if(options.wallClass){
			this._class = options.wallClass;
		}	
	}

}

