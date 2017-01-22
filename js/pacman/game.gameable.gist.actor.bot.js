'use strict';

class Bot extends Actor{

	constructor(game, options) {
		super('bot', game, options);
	}

	draw(){
		var bot = this;
		var game = bot.game;
		var field = bot.game.field;
		var cell = bot.cell;
		var cell2 = undefined;
		var trg = game.cell2XY(cell), trg2 = game.cell2XY(cell);
		var a = bot.action;
		var texture = undefined;
		cell.draw();
		if(cell && cell.gists('food').length){
			cell.gists('food').forEach(function(f){
				f.painted = f.eaten;
				f.draw();
			});
		}
		//
		if(a===false) texture = this.texture.P;
		else if(/^(u)([\d])/.test(a.s)){
			texture = bot.texture.T[a.i];
			bot.painted = false;
			cell2 = field.cellUp(cell);
			trg.y -= Math.floor(game.cellHeight * (a.i+1) / a.l);
		}
		else if(/^(r)([\d])/.test(a.s)){
			texture = bot.texture.R[a.i];
			bot.painted = false;
			cell2 = field.cellRight(cell);
			trg.x += Math.floor(game.cellWidth * (a.i+1) / a.l);
		}
		else if(/^(d)([\d])/.test(a.s)){
			texture = bot.texture.B[a.i];
			bot.painted = false;
			cell2 = field.cellDown(cell);
			trg.y += Math.floor(game.cellHeight * (a.i+1) / a.l);
		}
		else if(/^(l)([\d])/.test(a.s)){
			texture = bot.texture.L[a.i];
			bot.painted = false;
			cell2 = field.cellLeft(cell);
			trg.x -= Math.floor(game.cellWidth * (a.i+1) / a.l);
		}
		else throw '[Bot.draw]';
		if(cell2){
			if(!cell2.gists('wall').length){
				cell2.draw();
				if(a.i==a.l-1){
					field.bind(bot, cell2.index);
					if(cell2.gists('man').length){
						game.done = true;
					}
				}
				else if(cell2 && cell2.gists('food').length){
					cell2.gists('food').forEach(function(f){
						f.painted = f.eaten;
						f.draw();
					});
				}
			}
			else{
				trg = trg2;
			} 
		}
		super.draw(texture, trg);
	}

}

