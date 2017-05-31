var d_left, d_top, movimento_left, movimento_top, pos_x, pos_y, pos_raquete_1, pos_raquete_2;
var play, ponto;
var pos_raquete_1 =100;
var pos_raquete_2 = 100;
var campo_largura, campo_altura, raquete_altura, largura_util, dificuldade, tempo;
var defesas = 0;
var velocidadeJogo = 50;
var raquete_1, raquete_2, time_1, time_2, select_dificuldade;
 
$(document).ready(function(){

	function marca_ponto(time){
		time.html(parseInt(time.html()) + 1);
		ponto = true;
	}
	
	function calcula_posicao_raquete(){
		movimentos = parseInt(largura_util / movimento_left);
		top_proxima_defesa = d_top == 1 ? pos_y + ( movimento_top * movimentos) : pos_y - ( movimento_top * movimentos) ;				
		
		if(top_proxima_defesa<limite_top){
			top_proxima_defesa = top_proxima_defesa * -1;
		} else if( top_proxima_defesa > limite_bottom ){
			top_proxima_defesa = limite_bottom - (top_proxima_defesa - limite_bottom);
		}
		
		top_proxima_defesa = top_proxima_defesa - parseInt(raquete_altura / 2);
		
		if(top_proxima_defesa + raquete_altura > limite_bottom){
			top_proxima_defesa = limite_bottom - raquete_altura  + 10;;
		} else if(top_proxima_defesa < limite_top){
			top_proxima_defesa = limite_top;
		}

		;
		raquete_2.animate({
			'top':top_proxima_defesa+'px'
		},tempo);	
	}
	
		
	function verifica_defesa(raquete, bola, timeScore){
		inicio = parseInt(raquete.css('top').replace('px',''));	
		fim = inicio + raquete.height();
		if(inicio < bola && fim > bola){
			if( inicio + 15 > bola && d_top == 0) movimento_top++;
			if(fim - 15 < bola && d_top == 1) movimento_top++;
			if(raquete.attr('id')=='raquete_1'){
				defesas++;
				if(defesas%2==0)movimento_left++;
				calcula_posicao_raquete();
			}
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
		movimento_left = 7;
		movimento_top = parseInt(Math.random()*3 + 1);
		// Definindo direções 1 = positivo e 0 = negativo
		d_left = 0;
		d_top = parseInt(Math.random()*2);		
		// Ajustando bola pra iniciar no meio da mesa
		pos_x = parseInt($('#campo').width() / 2 - $('#bola').width() / 2 );
		pos_y = parseInt($('#campo').height() / 2 - $('#bola').height() / 2 );		
		
		$(document).unbind('keydown');
		
		raquete_1.animate({'top':'100px'},1500, function(){ 
			pos_raquete_1 = 100;
			ativa_controles(); 
		});
		raquete_2.animate({'top':'100px'},1500);
	}
	
	
	function atualizaBola(){
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
	}	

	
	function inicia_jogo(){
		reseta_jogo();
		window.setTimeout(function(){ playButton.show().html('3');	},200);
		window.setTimeout(function(){ playButton.html('2');	},700);
		window.setTimeout(function(){ playButton.html('1');	},1200);
		window.setTimeout(function(){ playButton.hide(); ativa_controles(); },1700);
		window.setTimeout(function(){ play = window.setInterval(atualizaBola,velocidadeJogo); },1900);
	}
	
	function ativa_controles(){
		$(document).keydown(function(event){
			// Q - SUBIR RAQUETE 1
			if(event.keyCode==81){ 
				if(pos_raquete_1 > 0 ){
					pos_raquete_1 -= 2;
					raquete_1.css('top',pos_raquete_1+'px');
				}
			} 
			// A - DESCER RAQUETE 1
			if(event.keyCode==65){ 
				if(pos_raquete_1 < limite_pos_raquete ){
					pos_raquete_1 += 2;
					raquete_1.css('top',pos_raquete_1+'px');
				}
			} 

		});
	}	
	
	
	// Limites
	campo_largura = $('#campo').width();
	campo_altura = $('#campo').height();
	
	limite_left = 20;
	limite_right = campo_largura - $('#bola').width() - 20;
	largura_util = limite_right - limite_left;
	limite_top = 0;
	limite_bottom = campo_altura - $('#bola').height();
	
	// Raquetes
	raquete_1 = $('#raquete_1');
	raquete_2 = $('#raquete_2');
	raquete_altura = raquete_1.height();
	limite_pos_raquete = campo_altura - raquete_altura;
	
	// Times
	time_1 =  $('#time_1');
	time_2 =  $('#time_2');
	
	playButton = $('#playgame');
	playButton.click(function(){
			

		select_dificuldade =  $('#dificuldade');
		
		dificuldade = parseInt(select_dificuldade.val());
		
		select_dificuldade
			.hide()
			.after(select_dificuldade.find(':selected').text())
			.remove();

		 tempo = 2000 - dificuldade * 250;
		inicia_jogo();
	
	});
	
});