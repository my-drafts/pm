'use strict';

String.prototype.format = function() {
	var THIS = this;
	[].forEach.call(arguments, function(a, i){
		THIS = THIS.replace(new RegExp('[\\{]' + i + '[\\}]', 'gi'), a);
	});
	return THIS;
};
