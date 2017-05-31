var d_left, d_top, movimento_left, movimento_top, pos_x, pos_y, pos_raquete_1, pos_raquete_2, play, ponto;
var raquete_1, raquete_2, time_1, time_2;

$(document).ready(function(){

	function marca_ponto(time){
		time.html(parseInt(time.html()) + 1);
		ponto = true;
	}
		
	function verifica_defesa(raquete, bola, timeScore){
		inicio = parseInt(raquete.css('top').replace('px',''));	
		fim = inicio + raquete.height();
		if(inicio < bola && fim > bola){
			return true;
		} else {
		
			marca_ponto(timeScore);
			
			window.setTimeout(function(){ clearInterval(play); },300);
			window.setTimeout(function(){ inicia_jogo(); },300);
			
			return false;
		}
	}
	
	function reseta_jogo(){
		
		ponto = false;
	
		// Quantos px andará cada intervalo
		movimento_left = 5;
		movimento_top = parseInt(Math.random()*3 + 1);

		// Definindo direções 1 = positivo e 0 = negativo
		d_left = parseInt(Math.random()*2);
		d_top = parseInt(Math.random()*2);		
		
		// Ajustando bola pra iniciar no meio da mesa
		pos_x = parseInt($('#campo').width() / 2 - $('#bola').width() / 2 );
		pos_y = parseInt($('#campo').height() / 2 - $('#bola').height() / 2 );		
	
	}


	function inicia_jogo(){
			
		reseta_jogo();
			
		window.setTimeout(function(){ playButton.show().html('3');	},200);
		window.setTimeout(function(){ playButton.html('2');	},700);
		window.setTimeout(function(){ playButton.html('1');	},1200);
		window.setTimeout(function(){ playButton.hide(); },1700);
		window.setTimeout(function(){
			play = window.setInterval(function(){
				
				pos_x = d_left == 1 ? pos_x + movimento_left : pos_x - movimento_left;
				pos_y = d_top == 1 ? pos_y + movimento_top : pos_y - movimento_top;
				
				if(pos_x<limite_left && ponto == false){
					if(verifica_defesa(raquete_1, pos_y, time_2)){
						pos_x = pos_x + movimento_left * 2;
						d_left = 1;
					}
				}
				
				if(pos_x>limite_right && ponto == false){
					if(verifica_defesa(raquete_2, pos_y, time_1)){
						pos_x = pos_x - movimento_left * 2;
						d_left = 0;
					}
				}
				
				if(pos_y<limite_top){
					pos_y = pos_y + movimento_top * 2;
					d_top = 1;
				}
				
				if(pos_y>limite_bottom){
					pos_x = pos_x + movimento_top * 2;
					d_top = 0;
				}
				
				$('#bola').css({'top':pos_y+'px','left':pos_x+'px'});
				
			},33);
		},1900);
	}
	
	// Limites
	limite_left = 20;
	limite_right = $('#campo').width() - $('#bola').width() - 20;
	limite_top = 0;
	limite_bottom = $('#campo').height() - $('#bola').height();
	
	// Raquetes
	raquete_1 = $('#raquete_1');
	raquete_2 = $('#raquete_2');
	
	// Times
	time_1 =  $('#time_1');
	time_2 =  $('#time_2');
	
	playButton = $('#playgame');
	playButton.click(inicia_jogo);
});