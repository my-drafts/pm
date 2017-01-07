'use strict';

// https://developer.mozilla.org/en-US/docs/Web/Events/keypress
const __eventKey2map = {
	alt: 'altKey',
	ctrl: 'ctrlKey',
	key: 'key',
	locale: 'locale',
	meta: 'metaKey',
	repeat: 'repeat',
	shift: 'shiftKey',
	type: 'type',
};

class Shortcut{
	constructor(){
		const this._map = __eventKey2map.filter(function(value, key){
			return {}
		});
		this._code = 0;
		this._keys = [];
		this._type = 'none';
	}

	get key(){
		return this._keys.length>0 ? this._keys.join('+') : '';
	}

	set key(_key){
		if()

	}

	static event2key(event){
		var K = {
			meta:  [1, 'metaKey'],
			ctrl:  [2, 'ctrlKey'],
			alt:   [3, 'altKey'],
			shift: [4, 'shiftKey'],
		};
		var result = [];
		for(k in K){
			if(K[k] in event && event[K[k]]===true){
				result.push()
			}
		}
	}

}

function event2key(event){
	var result = {key:[]};
	if(event.altKey===true) result.key.push('alt');
	if(event.ctrlKey===true) result.key.push('ctrl');
	if(event.metaKey===true) result.key.push('meta');
	if(event.shiftKey===true) result.key.push('shift');
	result.key.push(event.key);
	result.k = res
	result.type = event.type;
	//if(event.keyCode) result.code = event.keyCode;
	//if(/^.$/.test(event.key)) result.key = event.key;
	console.log(event, result);
}

document.addEventListener('keydown', function(event){
	event2key(event);
});
document.addEventListener('keyup', function(){
	event2key(event);
});
document.addEventListener('keypress', function(){
	event2key(event);
});

