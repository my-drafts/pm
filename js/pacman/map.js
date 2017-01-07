'use strict';

class Map{
	constructor(options){
		if(!options){
			throw '[Map.constructor]: Wrong options';
		}
		else if(options instanceof Array){
			this._map = options.slice();
		}
		else if(options instanceof String || typeof options==='string'){
			this._map = options.split(',').map(function(e, i){
				return e.trim();
			});
		}
		else{
			throw '[Map.constructor]: Wrong options';
		}
	}

	get size(){
		return this._map.length;
	}

	filter(callback){
		return this._map.map(function(cellClass, cellIndex){
			return { cellIndex: cellIndex, cellClass: cellClass };
		}).filter(function(m){
			return callback(m.cellClass, m.cellIndex);
		}).map(function(m){
			return m.cellIndex;
		});
	}
}
