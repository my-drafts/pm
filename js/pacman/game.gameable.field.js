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

	cellXY(x, y){
		return this.cell(y*this._width + x);
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
