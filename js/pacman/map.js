'use strict';

class Map{

	get size(){
		return this._map.length;
	}

	constructor(options){
		if(options && options instanceof Array){
			this._map = options.slice();
		}
		else if(options && options instanceof String || typeof options==='string'){
			this._map = options.split(',').map(function(mapElement, index){
				return mapElement.trim();
			});
		}
		else throw '[Map.constructor]: Wrong options';
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
