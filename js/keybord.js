'use strict';

(function (argument) {
	const __keysMeta = {
		alt: 'altKey',
		ctrl: 'ctrlKey',
		meta: 'metaKey',
		shift: 'shiftKey',
	};

	const __keysOption = {
		bubbles: 'bubbles',
		repeat: 'repeat',
		target: [ 'target', 'srcElement', ],
		type: 'type',
	};

	const __keysMore = {
		code: [ 'keyCode', 'charCode', ],
		locale: 'locale',
		location: 'location',
	};

	const __keysMain = {
		key: [ 'key', 'char', ],
	};

	const __keysMetaMain = Object.assign({}, __keysMeta, __keysMain);

	const __keys = Object.assign({hotkey: ''}, __keysMore, __keysOption, __keysMeta, __keysMain);

	const __keysFunction = [
		'arrowup',
		'arrowdown',
		'arrowleft',
		'arrowright',
		'home',
		'enter',
	];
	var hotkey2ahotkey = function(hotkey){
		if(hotkey instanceof Array){
			return hotkey.map(function(key){
				return String(key).trim().toLowerCase();
			}).filter(function(key){
				return (key in __keysMeta) || /^.$/i.test(key) || __keysFunction.some(function(k){return key==k;});
			});
		}
		else if(typeof hotkey==='string' || hotkey instanceof String){
			var re = /^(.+?)(?:[\+](.+?)(?:[\+](.+?)(?:[\+](.+?)(?:[\+](.+?)(?:[\+](.+?))?)?)?)?)?$/gi;
			var hk = re.exec(hotkey).filter(function(match, index){
				return index>0 && match;
			});
			return hotkey2ahotkey(hk);
		}
		else if(hotkey instanceof Object){
			var hk = hotkey.filter(function(value, key){
				return value!==false && (key in __keysMetaMain);
			}).map(function(value, key){
				return value===true ? key : value;
			}).toArray();
			return hotkey2ahotkey(hk);
		}
		else{
			throw 'Error[Keyboard.hotkey2ahotkey] Wrong hotkey';
		}
	}

	var ahotkey2hotkey = function(ahotkey){
		return ahotkey.join('+');
	}

	// https://developer.mozilla.org/en-US/docs/Web/Events/keypress
	var __event2keys = function(event, keys){
		if(keys instanceof Array && keys.length>0){
			try{
				return __event2keys(event, keys[0]);
			}
			catch(error){
				return __event2keys(event, keys.slice(1));
			}
		}
		else if(keys in event){
			return event[keys];
		}
		throw 'Error[Keyboard.hotkey2ahotkey] Wrong event key';
	};


	var event2key = function(event){
		var result = __keys.map(function(value, key){
			try{
				return __event2keys(event, value);	
			}
			catch(error){
				return false;
			}
		});
		result.hotkey = ahotkey2hotkey(hotkey2ahotkey(result));
		Object.freeze(result);
		return result;
	}

	var hotkey2key = function(hotkey){
		return ahotkey2hotkey(hotkey2ahotkey(hotkey));
	}

	var keyboard = {
	};

	const types = ['keypress', 'keydown', 'keyup'];

	document.__proto__.bindKey = function(hotkey, action, options){
		var hk = hotkey2key(hotkey);
		var a = function(event){
			var ehk = event2key(event);
			if(hk!==ehk.hotkey){
				return;
			}
			else if(action instanceof Function){
				action(event);
			}
		}
		var opt = (Object(options) || {}).filter(function(value, key){
			return key in __keysOption;
		});
		var t = types.some(function(v){return opt.type===v;}) ? opt.type : types[0];
		var b = (typeof opt.bubbles=='boolean' || opt.bubbles instanceof Boolean) ? opt.bubbles : null;
		var r = (typeof opt.repeat=='boolean' || opt.repeat instanceof Boolean) ? opt.repeat : null;
		var g = (opt.target instanceof Object) ? opt.target : document;

		g.addEventListener(t, a, true);
		return a;
	}

	document.__proto__.unbindKey = function(action, options){
		var opt = (Object(options) || {}).filter(function(value, key){
			return key in __keysOption;
		});
		var t = types.some(function(v){return opt.type===v;}) ? opt.type : types[0];
		var b = (typeof opt.bubbles=='boolean' || opt.bubbles instanceof Boolean) ? opt.bubbles : null;
		var r = (typeof opt.repeat=='boolean' || opt.repeat instanceof Boolean) ? opt.repeat : null;
		var g = (opt.target instanceof Object) ? opt.target : document;
		g.removeEventListener(t, action, true);
	}
})();
