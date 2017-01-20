'use strict';

class Man extends Actor{

	constructor(game, options) {
		super('man', game, options);
	}

	draw(){
		var man = this;
		var game = man.game;
		var field = man.game.field;
		var cell = man.cell;
		var cell2 = undefined;
		var trg = game.cell2XY(cell), trg2 = game.cell2XY(cell);
		var a = man.action;
		var texture = undefined;
		cell.draw();
		if(a===false) texture = this.texture.P;
		else if(/^(u)([\d])/.test(a.s)){
			texture = man.texture.T[a.i];
			man.painted = false;
			cell2 = field.cellUp(cell);
			trg.y -= Math.floor(game.cellHeight * (a.i+1) / a.l);
		}
		else if(/^(r)([\d])/.test(a.s)){
			texture = man.texture.R[a.i];
			man.painted = false;
			cell2 = field.cellRight(cell);
			trg.x += Math.floor(game.cellWidth * (a.i+1) / a.l);
		}
		else if(/^(d)([\d])/.test(a.s)){
			texture = man.texture.B[a.i];
			man.painted = false;
			cell2 = field.cellDown(cell);
			trg.y += Math.floor(game.cellHeight * (a.i+1) / a.l);
		}
		else if(/^(l)([\d])/.test(a.s)){
			texture = man.texture.L[a.i];
			man.painted = false;
			cell2 = field.cellLeft(cell);
			trg.x -= Math.floor(game.cellWidth * (a.i+1) / a.l);
		}
		else throw '[Man.draw]'
		if(cell2){
			if(!cell2.gists('wall').length){
				cell2.draw();
				if(a.i==a.l-1){
					field.bind(man, cell2.index);
				}
			}
			else{
				trg = trg2;
			} 
		}
		super.draw(texture, trg);
	}

}

