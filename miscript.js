

$(document).ready(function(){
		var clase=$("input[name=clase]:checked").val(); 
		$("#boton1").click(function() {
			
			if(validarCampo("#nick") & validarCampoAlerta("input[name=clase]:checked","#alerta_tipo")
			){collectParams();}
			return false;

		});
		
		$("#guerrero_elegido").click(function(){
			$("#mAttack").text("Attack: 10");
			$("#mDefense").text("Defense: 14");
			$("#mDamage").text("Damage: 15");
			$("#mHealth").text("Health: 100");
		});
		
		$("#clerigo_elegido").click(function(){
			$("#mAttack").text("Attack: 5");
			$("#mDefense").text("Defense: 16");
			$("#mDamage").text("Damage: 5");
			$("#mHealth").text("Health: 150");
		});
		
		
		$("#valkiria_elegido").click(function(){
			$("#mAttack").text("Attack: 10");
			$("#mDefense").text("Defense: 12");
			$("#mDamage").text("Damage: 20");
			$("#mHealth").text("Health: 50");
		});
			

	
		 $("#enemigo1").css({"top":yEnemigo1+"px"});
		 $("#enemigo1").css({"left":yEnemigo1+"px"});
		 movimientoEnemigo1();
});

//inicio
	function mostrarDatosPersonajes(){
		if(clase="guerrero"){
			$("#mAttack").text("Attack: 10");
		}
	}
	
	function collectParams(){
		var nick=document.inicioDatos.nick.value;
		var clase=$("input[name=clase]:checked").val(); 
		$("#datos").hide("fast");
		$("#mapa").show("slow");
		$("#zonaDados").fadeIn();

	}
	
	function validarCampo(input_id) {
			if ($(input_id).val() == "" || $(input_id).val() == undefined) {
					$(input_id).next().show();
					return false;
			}
			else {
					$(input_id).next().hide();
					return true;
			}
	};
	
	function validarCampoAlerta(input_id, alerta_id) {
			if ($(input_id).val() == "" || $(input_id).val() == undefined) {
					$(alerta_id).show();
					return false;
			}
			else {
					$(alerta_id).hide();
					return true;
			}
	};



// mover jugador
	
	var xJugador=0;
	var yJugador=200;

	
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
	
	//Enemigo 1 
	
	var xEnemigo1=30;
	var yEnemigo1=130;
	var vidaEnemigo1=40;
	
	function movimientoEnemigo1(){
		
			yEnemigo1=yEnemigo1+5;
			if(yEnemigo1>190){
				yEnemigo1=yEnemigo1-5;
				$("#enemigo1").css({"top":yEnemigo1+"px"});
			}
			if(yEnemigo1<130){
				yEnemigo1=yEnemigo1+5;
				$("#enemigo1").css({"top":yEnemigo1+"px"});
			}
			$("#enemigo1").css({"top":yEnemigo1+"px"});

	}
	
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