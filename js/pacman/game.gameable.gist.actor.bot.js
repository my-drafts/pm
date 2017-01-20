'use strict';

class Bot extends Actor{

	constructor(game, options) {
		super('bot', game, options);
	}

	draw(){
		var bat = this;
		var game = bat.game;
		var field = bat.game.field;
		var cell = bat.cell;
		var cell2 = undefined;
		var trg = game.cell2XY(cell), trg2 = game.cell2XY(cell);
		var a = bat.action;
		var texture = undefined;
		cell.draw();
		if(a===false) texture = this.texture.P;
		else if(/^(u)([\d])/.test(a.s)){
			texture = bat.texture.T[a.i];
			bat.painted = false;
			cell2 = field.cellUp(cell);
			trg.y -= Math.floor(game.cellHeight * (a.i+1) / a.l);
		}
		else if(/^(r)([\d])/.test(a.s)){
			texture = bat.texture.R[a.i];
			bat.painted = false;
			cell2 = field.cellRight(cell);
			trg.x += Math.floor(game.cellWidth * (a.i+1) / a.l);
		}
		else if(/^(d)([\d])/.test(a.s)){
			texture = bat.texture.B[a.i];
			bat.painted = false;
			cell2 = field.cellDown(cell);
			trg.y += Math.floor(game.cellHeight * (a.i+1) / a.l);
		}
		else if(/^(l)([\d])/.test(a.s)){
			texture = bat.texture.L[a.i];
			bat.painted = false;
			cell2 = field.cellLeft(cell);
			trg.x -= Math.floor(game.cellWidth * (a.i+1) / a.l);
		}
		else throw '[Man.draw]'
		if(cell2){
			if(!cell2.gists('wall').length){
				cell2.draw();
				if(a.i==a.l-1){
					field.bind(bat, cell2.index);
				}
			}
			else{
				trg = trg2;
			} 
		}
		super.draw(texture, trg);
	}

}

