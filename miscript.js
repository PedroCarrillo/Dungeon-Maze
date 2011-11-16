var nick="";
var attack = 0;
var defense = 0;
var health = 0;
var damage = 0;
var muerte=false;
var interval_id = setInterval(function() { movimientoEnemigo1(); },300);

$(document).ready(function(){
		var clase=$("input[name=clase]:checked").val(); 
		movimientoEnemigo1();
		$("#boton1").click(function() {
			
			if(validarCampo("#nick") & validarCampoAlerta("input[name=clase]:checked","#alerta_tipo")
			){collectParams();}
			return false;

		});
		
		$("#guerrero_elegido").click(function(){
			attack = 10;
			defense = 14;
			damage = 15;
			health = 100;
			$("#mAttack").text("Attack: "+attack);
			$("#mDefense").text("Defense: "+defense);
			$("#mDamage").text("Damage: "+damage);
			$("#mHealth").text("Health: "+health);
		});
		
		$("#clerigo_elegido").click(function(){
			attack = 5;
			defense = 16;
			damage = 5;
			health = 150;
			$("#mAttack").text("Attack: "+attack);
			$("#mDefense").text("Defense: "+defense);
			$("#mDamage").text("Damage: "+damage);
			$("#mHealth").text("Health: "+health);
		});
		
		
		$("#valkiria_elegido").click(function(){
			attack = 10;
			defense = 12;
			damage = 20;
			health = 50;
			$("#mAttack").text("Attack: "+attack);
			$("#mDefense").text("Defense: "+defense);
			$("#mDamage").text("Damage: "+damage);
			$("#mHealth").text("Health: "+health);
		});
			
		 movimientoEnemigo1();
});

//inicio

	function collectParams(){
		nick=document.inicioDatos.nick.value;
		var clase=$("input[name=clase]:checked").val(); 
		$("#datos").hide("fast");
		$("#mapa").show("slow");
		$("#tablero").show("slow");
		$("#zonaDados").fadeIn();
		mostrarDatos();
	}
	
	function mostrarDatos(){
		$("#jugadorNick").text(nick);
		$("#jugadorVida").text("health: "+health);
		$("#jugadorAtaque").text("Attack: "+attack);
		$('#jugadorDaño').text("Damage: "+damage);
		$('#jugadorDefensa').text("Defense: "+defense);
	
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
	var ataqueGoblin=5;
	var defensaGoblin=10;
	var vidaGoblin=10;
	var dañoGoblin=5;
	
	var ataqueOgro=10;
	var defensaOgro=12;
	var vidaOgro=20;
	var dañoOgro=10;
	
	var xEnemigo1=30;
	var yEnemigo1=130;
	var vidaEnemigo1=40;
	
	function movimientoEnemigo1(){
		if(yEnemigo1<300){
			yEnemigo1=yEnemigo1+5;
			$("#enemigo1").css({"top":yEnemigo1+"px"});
		}else{
			movimientoEnemigo2();
		}

	}
	
	function movimientoEnemigo2(){
		if(yEnemigo1>130){
			yEnemigo1=yEnemigo1-5;
			$("#enemigo1").css({"top":yEnemigo1+"px"});
		}else{
			movimientoEnemigo1();
		}

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
		ctx.fillStyle="#FFFFFF";
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