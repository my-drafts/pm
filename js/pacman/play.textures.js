
var playTextures = function(){
	var img = function(file){
		if(typeof file=='string' || file instanceof String){
			var result = new Image();
			result.src = 'img/{1}/{0}.png'.format(file, 128);
			return result;
		}
		else if(file instanceof Array){
			return file.map(img);
		}
		else if(src instanceof Object){
			return file.map(img);
		}
	}

	var textures = {
		bot0: {
			B: img([ 'b0p', 'b0b1', 'b0b2', 'b0b1', 'b0b2', 'b0b1', 'b0p', ]),
			L: img([ 'b0p', 'b0l1', 'b0l2', 'b0l1', 'b0l2', 'b0l1', 'b0p', ]),
			P: img('b0p'),
			R: img([ 'b0p', 'b0r1', 'b0r2', 'b0r1', 'b0r2', 'b0r1', 'b0p', ]),
			S: img([ 'b_s1', 'b_s2', ]),
			T: img([ 'b0p', 'b0t1', 'b0t2', 'b0t1', 'b0t2', 'b0t1', 'b0p', ]),
		},
		bot1: {
			B: img([ 'b1p', 'b1b1', 'b1b2', 'b1b1', 'b1b2', 'b1b1', 'b1p', ]),
			L: img([ 'b1p', 'b1l1', 'b1l2', 'b1l1', 'b1l2', 'b1l1', 'b1p', ]),
			P: img('b1p'),
			R: img([ 'b1p', 'b1r1', 'b1r2', 'b1r1', 'b1r2', 'b1r1', 'b1p', ]),
			S: img([ 'b_s1', 'b_s2', ]),
			T: img([ 'b1p', 'b1t1', 'b1t2', 'b1t1', 'b1t2', 'b1t1', 'b1p', ]),
		},
		bot2: {
			B: img([ 'b2p', 'b2b1', 'b2b2', 'b2b1', 'b2b2', 'b2b1', 'b2p', ]),
			L: img([ 'b2p', 'b2l1', 'b2l2', 'b2l1', 'b2l2', 'b2l1', 'b2p', ]),
			P: img('b2p'),
			R: img([ 'b2p', 'b2r1', 'b2r2', 'b2r1', 'b2r2', 'b2r1', 'b2p', ]),
			S: img([ 'b_s1', 'b_s2', ]),
			T: img([ 'b2p', 'b2t1', 'b2t2', 'b2t1', 'b2t2', 'b2t1', 'b2p', ]),
		},
		bot3: {
			B: img([ 'b3p', 'b3b1', 'b3b2', 'b3b1', 'b3b2', 'b3b1', 'b3p', ]),
			L: img([ 'b3p', 'b3l1', 'b3l2', 'b3l1', 'b3l2', 'b3l1', 'b3p', ]),
			P: img('b3p'),
			R: img([ 'b3p', 'b3r1', 'b3r2', 'b3r1', 'b3r2', 'b3r1', 'b3p', ]),
			S: img([ 'b_s1', 'b_s2', ]),
			T: img([ 'b3p', 'b3t1', 'b3t2', 'b3t1', 'b3t2', 'b3t1', 'b3p', ]),
		},
		cell: {},
		field: {},
		food1: img('f1'),
		man1: {
			B: img([ 'm1p', 'm1b1', 'm1b2', 'm1b3', 'm1b4', 'm1b5', 'm1p', ]),
			L: img([ 'm1p', 'm1l1', 'm1l2', 'm1l3', 'm1l4', 'm1l5', 'm1p', ]),
			P: img('m1p'),
			R: img([ 'm1p', 'm1r1', 'm1r2', 'm1r3', 'm1r4', 'm1r5', 'm1p', ]),
			T: img([ 'm1p', 'm1t1', 'm1t2', 'm1t3', 'm1t4', 'm1t5', 'm1p', ]),
		},
		w1b: img('w1b'),
		w1bl: img('w1bl'),
		w1blt: img('w1blt'),
		w1h: img('w1h'),
		w1l: img('w1l'),
		w1lt: img('w1lt'),
		w1ltr: img('w1ltr'),
		w1p: img('w1p'),
		w1r: img('w1r'),
		w1rb: img('w1rb'),
		w1rbl: img('w1rbl'),
		w1t: img('w1t'),
		w1tr: img('w1tr'),
		w1trb: img('w1trb'),
		w1trbl: img('w1trbl'),
		w1v: img('w1v'),
	};

	Object.freeze(textures);
	return textures;
}
