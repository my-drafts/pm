'use strict';

class Actor extends Gist{
	
	get i(){
		return this.index;
	}

	get index(){
		return this._index;
	}

	constructor(is, game, options) {
		super(is, game, options);

		if(options.index>=0){
			this._index = options.index;
		}
		else throw '[Actor.constructor]: Wrong index';
	}

}

