// mover jugador
	
	var xJugador=0;
	var yJugador=0;

	
	$(document).ready(function(){	

	});
	
	$(document).keypress(function(e) {
		
		if (e.which == 115) {
			//DOWN - S
			yJugador = yJugador + 5;
			if (yJugador > 398) yJugador = 398;
			$("#jugador").css({ "top": yJugador + "px"});
		  
		}
		if (e.which == 119) {
			//UP - W
			yJugador = yJugador - 5;
			if (yJugador < 0) yJugador = 0;
			$("#jugador").css({ "top": yJugador + "px"});
		}
		if (e.which == 100) {
			//RIGHT - D
			xJugador = xJugador + 5;
			if (xJugador > 1212) xJugador = 1212;        
			$("#jugador").css({ "left": xJugador + "px"});
		}
		if (e.which == 97) {
			//LEFT - A
			xJugador = xJugador - 5;
			if (xJugador < 0) xJugador = 0;
			$("#jugador").css({ "left": xJugador + "px"});
		}
		

	});