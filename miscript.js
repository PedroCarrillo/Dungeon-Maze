// mover jugador
	
	var x1=0;
	var y1=0;
		

		
	function moverJugador(direccion)
		{	
			switch(direccion.keyCode)
			{
				case 38:
					y1-=5;
					document.getElementById("jugador").style.top=String(y1)+"px";
				break;
				case 39:
					x1-=5;
					document.getElementById("jugador").style.right=String(x1)+"px";
				break;
				case 40:
					y1+=5;
					document.getElementById("jugador").style.top=String(y1)+"px";
				break;
				case 37:
					x1+=5;
					document.getElementById("jugador").style.right=String(x1)+"px";
				break;
				
			}
			
	};

