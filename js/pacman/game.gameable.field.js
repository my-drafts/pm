'use strict';

// поле
class Field extends Gameable{

	get c(){ return this.cells; }
	get cells(){ return this._cells; }
	get h(){ return this.height; }
	get height(){ return this._height; }
	get size(){ return this.h*this.w; }
	get w(){ return this.width; }
	get width(){ return this._width; }

	constructor(game, options){
		super('field', game, options);

		var field = this;

		if(options.height>0 && options.width>0){
			field._height = options.height;
			field._width = options.width;
		}
		else{
			throw '[Field.constructor]: Wrong size';
		}

		if(options.cells && options.cells._default){
			var h = field._height;
			var w = field._width;
			var c = options.cells;
			var c1 = c._default;
			var c2 = function(index){
				var re = /^([\d]+)[\:]([\d]+)$/;
				var x = String(index).replace(re, '$1');
				var y = String(index).replace(re, '$2');
				return c[Number(y)*w + Number(x)];
			};
			var c3 = function(index){
				return c[index];
			}
			field._cells = [...Array(h*w).keys()].map(function(index){
				var o = Object.assign({index: index}, c1, c2(index), c3(index));
				var cell = new Cell(game, o);
				return cell;
			});
		}
		else{
			throw '[Field.constructor]: Wrong field';
		}
	}

	bind(gist, cellIndex){
		if(gist instanceof Gist){
			var cell = this.cell(cellIndex);
			this.unbind(gist);
			gist.bind(cell);
			cell.bind(gist);
		}
		else{
			throw '[Field.bind]: Wrong gist';
		}
	}

	cell(index){
		if(index in this.cells){
			return this.cells[index];
		}
		else{
			throw '[Field.cell]: Wrong cell index ';
		}
	}

	cellXY(x, y){
		return this.cell(y*this.w + x);
	}

	unbind(gist){
		if(gist instanceof Gist){
			if(gist.cell===false){
				// nothing
			}
			else if(gist.cell instanceof Cell){
				var cell = this.cell(gist.cell.index);
				cell.unbind(gist);				
			}
			else{
				throw '[Field.unbind]: gist unbind corrupted';
			}
			gist.unbind();
		}
		else{
			throw '[Field.unbind]: Wrong gist';
		}
	}

}
