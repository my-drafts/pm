'use strict';

// поле
class Field extends Gameable{

	get c(){
		return this.cells;
	}

	get h(){
		return this.height;
	}

	get s(){
		return this.size;
	}

	get w(){
		return this.width;
	}


	get cells(){
		return this._cells;
	}

	get height(){
		return this._height;
	}

	get size(){
		return this.height*this.width;
	}

	get width(){
		return this._width;
	}


	constructor(game, options){
		super('field', game, options);

		var field = this;

		if(options.height>0 && options.width>0){
			field._height = options.height;
			field._width = options.width;
		}
		else throw '[Field.constructor]: Wrong size';

		if(options.cells && options.cells._default){
			var h = field._height;
			var w = field._width;
			field._cells = [...Array(h*w).keys()].map(function(index){
				var c1 = options.cells._default;
				var c2 = options.cells['{0}:{1}'.format(index%w, index/w)];
				var c3 = options.cells[index];
				var o = Object.assign({index: index}, c1, c2, c3);
				var cell = new Cell(game, o);
				return cell;
			});
		}
		else throw '[Field.constructor]: Wrong field';
	}


	bind(gist, cellIndex){
		if(gist instanceof Gist){
			var cell = this.cell(cellIndex);
			this.unbind(gist);
			gist.bind(cell);
			cell.bind(gist);
		}
		else throw '[Field.bind]: Wrong gist';
	}

	cell(index){
		if(index in this._cells){
			return this._cells[index];
		}
		else throw '[Field.cell]: Wrong cell index ';
	}

	cellxy(x, y){
		return this.cell(y*this._width + x);
	}

	cellDown(cell){
		if(cell instanceof Cell){
			var xy = cell.xy;
			return this.cellxy(xy.x, (xy.y + this.height + 1) % this.height);
		}
		else throw '[Field.cellDown]: Wrong cell';
	}

	cellLeft(cell){
		if(cell instanceof Cell){
			var xy = cell.xy;
			return this.cellxy((xy.x + this.width - 1) % this.width, xy.y);
		}
		else throw '[Field.cellDown]: Wrong cell';
	}

	cellRight(cell){
		if(cell instanceof Cell){
			var xy = cell.xy;
			return this.cellxy((xy.x + this.width + 1) % this.width, xy.y);
		}
		else throw '[Field.cellDown]: Wrong cell';
	}

	cellUp(cell){
		if(cell instanceof Cell){
			var xy = cell.xy;
			return this.cellxy(xy.x, (xy.y + this.height - 1) % this.height);
		}
		else throw '[Field.cellDown]: Wrong cell';
	}

	draw(){
		this._cells.filter(function(c){
			return !c.paited;
		}).forEach(function(c){
			c.draw();
		})
	}

	unbind(gist){
		if(!(gist instanceof Gist)) throw '[Field.unbind]: Wrong gist';
		else if(gist.cell instanceof Cell){
			var cell = this.cell(gist.cell.index);
			cell.unbind(gist);				
			gist.unbind();
		}
		else if(gist.cell===false){
			gist.unbind();
		}
		else throw '[Field.unbind]: gist unbind corrupted';
	}

}
