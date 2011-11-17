var nick="";
var attack = 0;
var defense = 0;
var health = 0;
var damage = 0;
var muerte=false;

var xEnemigo1=130;
var yEnemigo1=130;

var xEnemigo2=90;
var yEnemigo2=630;


$(document).ready(function(){
		var clase=$("input[name=clase]:checked").val(); 
		
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
	var derecha=false;
	
	$(document).keypress(function(e) {

		if (e.which == 115) {
			//DOWN - S
			yJugador = yJugador + 5;
			if (yJugador > 398) yJugador = 398;
			$("#jugador").css({ "top": yJugador + "px"});
			//			alert(xEnemigo1,yEnemigo1);
			/*movimientoEnemigo1(xEnemigo1,yEnemigo1);*/
		
		}
		if (e.which == 119) {
			//UP - W
			yJugador = yJugador - 5;
			if (yJugador < 0) yJugador = 0;
			$("#jugador").css({ "top": yJugador + "px"});
				//		alert(xEnemigo1,yEnemigo1);
			//movimientoEnemigo1(xEnemigo1,yEnemigo1);
			
		}
		if (e.which == 100) {
			//RIGHT - D
			xJugador = xJugador + 5;
			if (xJugador > 1212) xJugador = 1212;        
			$("#jugador").css({ "left": xJugador + "px"});
			//alert(xEnemigo1,yEnemigo1)

			//movimientoEnemigo1(xEnemigo1,yEnemigo1);
		
		}
		if (e.which == 97) {
			//LEFT - A
			xJugador = xJugador - 5;
			if (xJugador < 0) xJugador = 0;
			$("#jugador").css({ "left": xJugador + "px"});
			//alert(xEnemigo1,yEnemigo1)
			
			
		}
		movimientoEnemigo1(xEnemigo1,yEnemigo1);
		colision(xEnemigo1,yEnemigo1);

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
	

	var vidaEnemigo1=40;
	var movementE=false;
	function setxEnemigo1(x){xEnemigo1=x;}
	function setyEnemigo1(y){yEnemigo1=y;}
	
	function movimientoEnemigo1(x,y){
		if(Math.sqrt(Math.pow((x-xJugador),2))>Math.sqrt(Math.pow((y-yJugador),2))){
			if((x-xJugador)>0){
				x=x-5;	
				
			}else {
				x=x+5;
			}
			setxEnemigo1(x);
			
				$("#enemigo1").css({"top":yEnemigo1+"px"});
				$("#enemigo1").css({"left":xEnemigo1+"px"});
		}else{
			if((y-yJugador)>0){
				y=y-5;	
			}else {
				y=y+5;
			}
			setyEnemigo1(y);
			
				$("#enemigo1").css({"top":yEnemigo1+"px"});
				$("#enemigo1").css({"left":xEnemigo1+"px"});		
		}
	}
	
	function colision(x,y){
		if((xJugador==(x+50))&((y>=yJugador-50)&(y<=yJugador+50))){
			alert("Chocaste");
		}else{
			if(((xJugador+50)==x)&((y>=yJugador-50)&(y<=yJugador+50))){
			alert("Chocaste");
			}else{
				if(((yJugador+50)==y)&((x>=xJugador-50)&(x<=xJugador+50))){
				alert("Chocaste");
				}else{
					if(((yJugador-50)==y)&((x>=xJugador-50)&(x<=xJugador+50))){
						alert("Chocaste");
					}
				}
			}
		}
		
	}
		


	
	
		
		
		/*if(!movementE){
			if(y!=yJugador){
				y=y+5;
				x=x+5;
				setxEnemigo1(x);
				setyEnemigo1(y);
				$("#enemigo1").css({"top":yEnemigo1+"px"});
				$("#enemigo1").css({"left":xEnemigo1+"px"});
			}else{
				x=x-5;
				setxEnemigo1(x);
				movementE=true;
				$("#enemigo1").css({"left":xEnemigo1+"px"});
				$("#enemigo1").css({"top":yEnemigo1+"px"});
			}
			if(x==xJugador){
				y=y+5;
				x=x-5;
				setxEnemigo1(x);
				setyEnemigo1(y);
				$("#enemigo1").css({"top":yEnemigo1+"px"});
				$("#enemigo1").css({"left":xEnemigo1+"px"});
			}
		}else{
			y=yJugador;
			setyEnemigo1(y);
			$("#enemigo1").css({"top":yEnemigo1+"px"});

		}*/
	
	
	
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