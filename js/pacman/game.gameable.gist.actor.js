'use strict';

class Actor extends Gist{
	
	get action(){
		return this.acting ? this._actions.shift() : false;
	}

	get acting(){
		return this._actions.length>0;
	}

	get index(){
		return this._index;
	}

	constructor(is, game, options) {
		super(is, game, options);

		var actor = this;

		if(options.index>=0){
			actor._index = options.index;
		}
		else throw '[Actor.constructor]: Wrong index';

		actor._actions = [];
	}

	set action(action){
		if(action instanceof Array){
			this._actions = [].concat.apply(this._actions, action);
		}
		else if(action instanceof Object && ('s' in action) && ('i' in action) && ('l' in action)){
			this._actions.push(action);
		}
		else throw '[Actor.action]: Wrong action';
	}

}

