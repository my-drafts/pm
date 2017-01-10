'use strict';

(function(){
	var filter = function(obj, callback){
		if(callback instanceof Function){
			var o = obj instanceof Object ? Object.keys(obj) : [];
			o = o.filter(function(key, index){
				return callback(obj[key], key);
			}).map(function(key, index){
				return {[key]: obj[key]};
			});
			return o.length>0 ? Object.assign.apply({}, o) : {};
		}
		else if(callback instanceof RegExp){
			return filter(obj, { key: callback, value: callback });
		}
		else if(callback instanceof Object){
			var cb = callback;
			var cbk = false;
			if(cb.key instanceof RegExp){
				cbk = cb.key;
			}
			else if(cb.k instanceof RegExp){
				cbk = cb.k;
			}
			var cbnk = false;
			if(cb.notkey instanceof RegExp){
				cbnk = cb.notkey;
			}
			else if(cb.nk instanceof RegExp){
				cbnk = cb.nk;
			}
			var cbv = false;
			if(cb.value instanceof RegExp){
				cbv = cb.value;
			}
			else if(cb.v instanceof RegExp){
				cbv = cb.v;
			}
			var cbnv = false;
			if(cb.notvalue instanceof RegExp){
				cbnv = cb.notvalue;
			}
			else if(cb.nv instanceof RegExp){
				cbnv = cb.nv;
			}
			if(cbk || cbnk || cbv || cbnv){
				return filter(obj, function(value, key){
					var _cbk = cbk ? cbk.test(key) : true;
					var _cbnk = cbnk ? !cbnk.test(key) : true;
					var _cbv = cbv ? cbv.test(value) : true;
					var _cbnv = cbnv ? !cbnv.test(value) : true;
					return _cbk && _cbnk && _cbv && _cbnv;
				});			
			}
			else{
				throw 'Error: Object.filter({key: RegExp?, value: RegExp?})';
			}
		}
	}

	var map = function(obj, callback){
		if(callback instanceof Function){
			var o = obj instanceof Object ? Object.keys(obj) : [];
			o = o.map(function(key, index){
				return {[key]: callback(obj[key], key)};
			});
			return o.length>0 ? Object.assign.apply({}, o) : {};
		}
		else{
			throw 'Error: Object.map(function)';
		}
	}

	Object.filter = function(obj, callback){
		return filter(obj, callback);
	}

	Object.map = function(obj, callback){
		return map(obj, callback);
	}


	Object.prototype.keys = function(){
		return Object.keys(this);
	}

	Object.prototype.filter = function(callback){
		return filter(this, callback);
	}

	Object.prototype.map = function(callback){
		return map(this, callback);
	}

	Object.prototype.toArray = function(){
		var obj = this;
		return Object.keys(obj).map(function(key, index){
			return obj[key];
		});
	}
})();

//console.log({a:1, b:2, c:3}.toArray());
