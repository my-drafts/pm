'use strict';

// поле
class Field extends Gameable{
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

		if(!options.visible){
			field._visibleHeight = field.height;
			field._visibleLeft = 0;
			field._visibleTop = 0;
			field._visibleWidth = field.width;
		}
		else if(options.visible.height>0 && options.visible.width>0){
			field._visibleHeight = options.visible.height;
			field._visibleLeft = Math.max(options.visible.left, 0);
			field._visibleTop = Math.max(options.visible.top, 0);
			field._visibleWidth = options.visible.width;
			field._visibleLeft = Math.min(field.vleft, field.width - field.vwidth);
			field._visibleTop = Math.min(field.vtop, field.height - field.vheight);
		}
		else{
			throw '[Field.constructor]: Wrong visible size';
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
				var o = {index: index};
				o = Object.assign(o, c1, c2(index), c3(index));
				var cell = new Cell(game, o);
				return cell;
			});
		}
		else{
			throw '[Field.constructor]: Wrong field';
		}
	}

	get cells(){
		return this._cells;
	}

	get height(){
		return this._height;
	}

	get size(){
		return this._height*this._width;
	}

	get vbottom(){
		return this.vtop + this.vheight;
	}

	get vheight(){
		return this._visibleHeight;
	}

	get vleft(){
		return this._visibleLeft;
	}

	get vright(){
		return this.vleft + this.vwidth;
	}

	get vtop(){
		return this._visibleTop;
	}

	get vwidth(){
		return this._visibleWidth;
	}

	get visibleCellsIndex(){
		return this._cells.map(function(cell){
			return {
				index: cell.index, 
				x: cell.xIndex, 
				y: cell.yIndex
			};
		}).filter(function(cell){
			if(c.xIndex<this.vleft) return false;
			if(c.yIndex<this.vtop) return false;
			if(this.vright<=c.xIndex) return false;
			if(this.vbottom<=c.yIndex) return false;
			return true;
		}).map(function(c){
			return c.index;
		});
	}

	get visibleHeight(){
		return this._visibleHeight;
	}

	get visibleLeft(){
		return this._visibleLeft;
	}

	get visibleTop(){
		return this._visibleTop;
	}

	get visibleWidth(){
		return this._visibleWidth;
	}

	get width(){
		return this._width;
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
		if(index in this._cells){
			return this._cells[index];
		}
		else{
			throw '[Field.cell]: Wrong cell index ';
		}
	}

	cellXY(x, y){
		return this.cell(y*this.width + x);
	}

	unbind(gist){
		if(gist instanceof Gist){
			if(gist.cell===false){

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
