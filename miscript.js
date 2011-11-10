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
	
	//DADOS 
	
	var cwidth=400;
	var cheight=300;
	var dicex=50;
	var dicey=50;
	var dicewidth=100;
	var diceheight=100;
	var dotrad=6;
	var ctx;
	var dx=100;
	var dy=100;
	var firstturn=true;
	var point;

	function throwdice(){
		var sum;
		var ch=1+Math.floor(Math.random()*6);
		sum=ch;
		dx=dicex;
		dy=dicey;
		drawface(ch);
		dx=(dicex+150);
		ch=1+Math.floor(Math.random()*6);
		sum += ch;
		drawface(ch);
		
		if(firstturn){
		
			var bank=Number(document.f.bank.value);
			if(bank<10){
				alert("No tienes dinero! No puedes jugar.");
				return;
			}
			bank=bank-10;
			document.f.bank.value=String(bank);
				switch(sum){
					case 7:
					case 11:
						document.f.outcome.value="Ganaste!";
						bank=Number(document.f.bank.value);
						bank += 20;
						document.f.bank.value = String(bank);
						break;
					case 2:
					case 3:
					case 12:
						document.f.outcome.value="Perdiste";
						break;
					default:
						point=sum;
						document.f.pv.value=point;
						firstturn=false;
						document.f.stage.value="Lance nuevamente.";
						document.f.outcome.value="   ";
				}
		}else{
			switch(sum){
				case point:
					document.f.outcome.value="Ganaste!";
					bank=Number(document.f.bank.value);
						bank += 20;
						document.f.bank.value= String(bank);
					document.f.stage.value="Juega nuevamente.";
					document.f.pv.value="  ";
					firstturn=true;
					break;
				
				case 7:
					document.f.outcome.vale="Perdiste!";
					document.f.stage.value="Reinicia el juego";
					document.f.pv.value="   ";
					firstturn=true;

			}
	}
	
	function draw1(){
		var dotx;
		var doty;
		ctx.beginPath();
		dotx=dx+.5*dicewidth;
		doty=dy+.5*diceheight;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	
	function draw2(){
		var dotx;
		var doty;
		ctx.beginPath();
		dotx=dx+3*dotrad;
		doty=dy+3*dotrad;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+diceheight-3*dotrad;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	
	function draw4(){
		var dotx;
		var doty;
		ctx.beginPath();
		dotx=dx+3*dotrad;
		doty=dy+3*dotrad;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+diceheight-3*dotrad;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		
		dotx=dx+3*dotrad;
		doty=dy+diceheight-3*dotrad;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+3*dotrad;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	
	function draw2mid(){
		var dotx;
		var doty;
		ctx.beginPath();
		dotx=dx+3*dotrad;
		doty=dy+.5*diceheight;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+.5*diceheight;
		ctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	
	function drawface(n){
		ctx=document.getElementById('canvas').getContext('2d');
		ctx.lineWidth=5;
		ctx.clearRect(dx,dy,dicewidth,diceheight);
		ctx.strokeRect(dx,dy,dicewidth,diceheight);
		var dotx;
		var doty;
		ctx.fillStyle="#009966";
			switch(n){
				case 1:
					draw1();
					break;
				case 2:
					draw2();
					break;
				case 3:
					draw2();
					draw1();
					break;
				case 4:
					draw4();
					break;
				case 5:
					draw4();
					draw1();
					break;
				case 6:
					draw4();
					draw2mid();
					break
			}
			
			}
	}