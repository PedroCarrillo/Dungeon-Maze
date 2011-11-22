	var nick="";
	var ataqueJugador=0;
	var defensaJugador=0;
	var dañoJugador=0;
	var vidaJugador=0;
	var scoreJugador=0;
	var muerte=false;
	var imgPlayer= new Image();
	var level=1;
	var level3=1;
	var win=1;
	
   $(document).ready(function(){

		var clase=$("input[name=clase]:checked").val();

		$("#boton1").click(function() {

		if(validarCampo("#nick") & validarCampoAlerta("input[name=clase]:checked","#alerta_tipo")
			){collectParams();
			init();}
			return false;

		});

		$("#guerrero_elegido").click(function(){
			$("#imagenClase").removeClass();
			ataqueJugador = 10;
			defensaJugador = 14;
			dañoJugador = 15;
			vidaJugador = 100;
			$("#mAttack").text("Attack: "+ataqueJugador);
			$("#mDefense").text("Defense: "+defensaJugador);
			$("#mDamage").text("Damage: "+dañoJugador);
			$("#mHealth").text("Health: "+vidaJugador);
			imgPlayer.src="guerrero.png";
			$("#imagenClase").addClass("guerreroImagen");
			
		});

		$("#clerigo_elegido").click(function(){
			$("#imagenClase").removeClass();
			ataqueJugador = 5;
			defensaJugador = 16;
			dañoJugador = 5;
			vidaJugador = 150;
			$("#mAttack").text("Attack: "+ataqueJugador);
			$("#mDefense").text("Defense: "+defensaJugador);
			$("#mDamage").text("Damage: "+dañoJugador);
			$("#mHealth").text("Health: "+vidaJugador);
			imgPlayer.src="clerigo.png";
			$("#imagenClase").addClass("clerigoImagen");
		});


		$("#valkiria_elegido").click(function(){
			$("#imagenClase").removeClass();
			ataqueJugador = 10;
			defensaJugador = 12;
			dañoJugador = 20;
			vidaJugador = 50;
			$("#mAttack").text("Attack: "+ataqueJugador);
			$("#mDefense").text("Defense: "+defensaJugador);
			$("#mDamage").text("Damage: "+dañoJugador);
			$("#mHealth").text("Health: "+vidaJugador);
			imgPlayer.src="valkiria.png";
			$("#imagenClase").addClass("valkiriaImagen");
		});

	
		$("#lanzarDados").attr("disabled", "disabled");
		$("#lanzarDados").click(function(){
			var e=encontrarAtacante();
			
			ataqueJugadorT(e);
			if(enemigos[e].vida <=0){
				
				borrarEnemigo(e);
				var a="";
				for(var i=0;i<enemigos.length;i++){
				
				colision();
				}
					
				col=false;
				$("#lanzarDados").attr("disabled", "disabled");
				 setTimeout('borrarDatosEnemigos()',1000);
			}else{
				ataqueEnemigo(e);
			}
		});
	});
	
	function collectParams(){
		nick=document.inicioDatos.nick.value;
		var clase=$("input[name=clase]:checked").val();
		$("#datos").hide("fast");
		$("#mapa").show("slow");
		$("#mapa").show("slow");
		$("#zonaDados").fadeIn();
		$("#tablero").show("slow");
		$("#noticias").show("slow");
		$("#imagenJuego").hide("fast");
		mostrarDatos();
}

function mostrarDatos(){
	$("#jugadorNick").text(nick);
	$("#jugadorVida").text("health: "+vidaJugador);
	$("#jugadorAtaque").text("Attack: "+ataqueJugador);
	$('#jugadorDaño').text("Damage: "+dañoJugador);
	$('#jugadorDefensa').text("Defense: "+defensaJugador);
	$('#monedaCant').text(": "+scoreJugador);
	$('#eventos').text("Empieza la batalla >D"); 
}

function mostrarDatosEnemigos(f){
	
	$("#datosEnemigos").show("fast");
	$("#eTipo").text(enemigos[f].tipo);
	$("#eVida").text("health: "+getVidaE(f));
	$("#eAtaque").text("Attack: "+ataqueJugador);
	$('#eDaño').text("Damage: "+dañoJugador);
	$('#eDefensa').text("Defense: "+defensaJugador);
	$('#eventos').text("Encontraste un "+enemigos[f].tipo); 
	
}

function borrarDatosEnemigos()
{
	$("#datosEnemigos").hide("fast");
	$("#eTipo").text(" ");
	$("#eVida").text(" ");
	$("#eAtaque").text(" ");
	$('#eDaño').text(" ");
	$('#eDefensa').text(" ");

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
	

	var mapax = 0;
    var mapay = 0;
    var mapWidth = 1000;
    var mapHeight = 400;
    var radioP = 20;
    var mapaLimRight =  mapWidth + mapax -radioP;
    var mapaLimBot = mapHeight + mapay - radioP;
    var mapaLimLeft = mapax + radioP;
    var mapaLimTop = mapay + radioP;
    var playerX;
    var playerY;
    var ctx;
	var enemigos=[];
	var objetos=[];
    var img = new Image();
    img.src="goblin.png";
	var imgOrco=new Image();
	imgOrco.src="orco.png";
	var imgWall= new Image();
	imgWall.src="wall.jpg";
	var imgKey=new Image();
	imgKey.src="llave.png";
	var imgCoin=new Image();
	imgCoin.src="moneda.png";
	var imgPuerta=new Image();
	imgPuerta.src="puerta.gif";
	
	var nivelT=false;
	var j;
	var jota;
	var col=false;
	var posE=[];
	var captura=99;
	var atacante;
	//Orco
	
	function Orco(){
		this.posX=0;
		this.posY=0;
		this.ataque=10;
		this.defensa=12;
		this.vida=20;
		this.daño=10;
		this.draw=dibujarOrco;
		this.draw2=dibujarOrco2;
		this.tipo="orco";
	}
	
	function dibujarOrco(){
		for(j=0;j<enemigos.length;j++){
			var resultado= false
			while(resultado==false){
				this.posX=generarAbcisas()+radioP;
				this.posY=generarOrdenadas()+radioP;
				if((compruebaPosicion(this.posX,this.posY)==true)&(compruebaParedes_nivel1(this.posX,this.posY)==true)){
					resultado=true;
				}
			}
		}
		ctx.drawImage(imgOrco,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
	}
	
	function dibujarOrco2(){
		ctx.drawImage(imgOrco,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
	}
	
	var orco1=new Orco(100,200);
	
	//Goblin
	
	function getPosEnemigoX(i){
		return enemigos[i].posX;
	}

	
	function Goblin(){
		this.posX=0;
		this.posY=0;
		this.ataque=5;
		this.defensa=10;
		this.vida=10;
		this.daño=5;
		this.draw=dibujarGoblin3;
		this.draw2=dibujarGoblin2;
		this.tipo="goblin";
	}
	
	function dibujarGoblin3(){	
		for(j=0;j<enemigos.length;j++){
			var resultado= false
			while(resultado==false){
				this.posX=generarAbcisas()+radioP;
				this.posY=generarOrdenadas()+radioP;
				if((compruebaPosicion(this.posX,this.posY)==true)&(compruebaParedes_nivel1(this.posX,this.posY)==true)){
					resultado=true;
				}
			}
		}
		ctx.drawImage(img,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
	}
			
	function getVidaE(i){
		return enemigos[i].vida;
	}
	
	function setVidaE(i,t){
		enemigos[i].vida=t;
	}
	
	function getPosXE(i){
		return enemigos[i].posX;
	}
	
	function setPosXE(i,t){
		enemigos[i].posX=t;
	}
	
	function getPosYE(i){
		return enemigos[i].posY;
	}
	
	function setPosYE(i,t){
		enemigos[i].posY=t;
	}
			
	var goblin1=new Goblin();
	var goblin2=new Goblin();
	var goblin3=new Goblin();
	

	enemigos[0]=orco1;
	enemigos[1]=goblin1;
	enemigos[2]=goblin2;
	enemigos[3]=goblin3;

	
	function Moneda(){
		this.cantidad=25;
		this.valor=1;
		this.draw=dibujarMoneda;
		this.draw2=dibujarMoneda2;
		this.tipo="moneda";
	}
	
	function dibujarMoneda(){
		for(j=0;j<enemigos.length;j++){
			var resultado= false
			while(resultado==false){
				this.posX=generarAbcisas()+radioP;
				this.posY=generarOrdenadas()+radioP;
				if((compruebaPosicion(this.posX,this.posY)==true)&(compruebaParedes_nivel1(this.posX,this.posY)==true)){
					resultado=true;
				}
			}
		}
		if(this.valor>0){
			ctx.drawImage(imgCoin,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
		}
	}
	
	function dibujarMoneda2(){
		if(this.valor>0){
			ctx.drawImage(imgCoin,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
		}
	}
	
	function key(posX,posY){
		this.posX=posX;
		this.posY=posY;
		this.draw=drawKey;
		this.draw2=drawKey;
		this.valor=1;
		this.tipo="key";
	}
	function drawKey(){
		if(this.valor>0){
			ctx.drawImage(imgKey,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
		}
	}
	function Puerta(){
		this.posX=500;
		this.posY=20;
		this.valor=0;
		this.draw=dibujarPuerta;
		this.draw2=dibujarPuerta;
		this.tipo="puerta";
	}
	
	function drawPuerta(){
		if(door.valor>0){
			ctx.drawImage(imgPuerta,door.posX-radioP,door.posY-radioP,2*radioP,2*radioP);
		}
	}
	function gane(){
		if(playerX==door.posX & playerY==door.posY & door.valor!=0){
			level++;
			if(level==2){
				alert("Preparate para el 2do Nivel");
				iniciar2nivel();
				level3=2;
			}else{
				
				
				if(win==2){
					youwin();
				}else{
					if(level3==2){
						alert("Preparate para el 3er Nivel");
						iniciar3nivel();
						win=2;
					}
				}
			}
		}
	}		
			
	function youwin(){
		location.href="ganaste.html";
	}	
				
		
	
	function reiniciarVariables(){
		nkey=new key(980,380);
		playerX=20;
		playerY=20;
	}
	
	function reiniciarVariables2(){
		nkey=new key(980,20);
		playerX=20;
		playerY=380;
	}
	
	var moneda1=new Moneda();
	var nkey=new key(60,100);
	var moneda2=new Moneda();
	var moneda3=new Moneda();
	var moneda4=new Moneda();
	var door=new Puerta();
	objetos.push(nkey);
	objetos.push(moneda1);
	objetos.push(moneda2);
	objetos.push(moneda3);
	objetos.push(moneda4);
	
	function drawallstart(){
		ctx.clearRect(0,0,mapWidth,mapHeight);
		var m;
		
		for(m=0;m<enemigos.length;m++){
			enemigos[m].draw();
		}		
		for(m=0;m<objetos.length;m++){
			objetos[m].draw();
		}
		drawKey();
	}
	
	function cogerObjeto(){
		var d;
		var ñ;
		for(ñ=0;ñ<objetos.length;ñ++){
			d=Math.sqrt(Math.pow((objetos[ñ].posX-playerX),2)+Math.pow(objetos[ñ].posY-playerY,2));
			
			
				if(playerX==objetos[ñ].posX & playerY==objetos[ñ].posY){
					if(objetos[ñ].tipo=="key"){
						door.valor=22;
						$('#eventos').text("Puedes escapar por la puerta"); 		
						drawPuerta();
					}if(objetos[ñ].tipo=="moneda"){
						scoreJugador=scoreJugador+objetos[ñ].cantidad;
						$('#monedaCant').text(": "+scoreJugador);
						$('#eventos').text("Cogiste 25 de oro"); 		
						objetos[ñ].cantidad=0;
					}
					objetos[ñ].valor=0;
				}
		}
	}
	
	function drawall(){
		ctx.clearRect(0,0,mapWidth,mapHeight);
		drawKey();
		drawPuerta();
		var m;
		for(m=0;m<enemigos.length;m++){
			enemigos[m].draw2();
		}
		for(m=0;m<objetos.length;m++){
			objetos[m].draw2();
		}
		if(nivelT){
		dibujarPuerta();
		}
	}
    //jugador

	
	function init(){
		ctx = document.getElementById('canvasMapa').getContext('2d');
		drawallstart();
		movePlayer();
		dibujaPlayer(0+radioP,380);
		
     }
	
	function dibujaPlayer(x,y){
		
		ctx.drawImage(imgPlayer,x-radioP,y-radioP,2*radioP,2*radioP);
		playerX=x;
		playerY=y;
	}
	
	function compruebaPosicion(x,y){
		if(x==playerX&y==playerY){
			return false;
		}else{
			var uv;
			for(uv=0;uv<=enemigos.length;uv++){
				if(x==enemigos[uv]&y==enemigos[uv]){
					return false;
				}
			}
		}
		return true;
	}
	
	function compruebaParedes_nivel1(x,y){
		if((x==140||x==820)&(y>=100&y<=300)){
			return false;
		}else{
			if(y==220&(x>=180&x<=780)){
				return false;
			}else{
				return true;
			}
		}		
	}
	

	
	function generarAbcisas(){
		var a=Math.round(Math.random()*24);
			a=a-(a%1);
			a=a*40;
		return a;
	}
	
	function generarOrdenadas(){
		var b=Math.round(Math.random()*9);
			b=b-(b%1);
			b=b*40;
		return b;
	}
	

	
	function movePlayer(){
			$(document).keypress(function(e) {
				
				if(!col){
					if (e.which == 115) {
					//DOWN - S
					ctx.clearRect(playerX-radioP,playerY-radioP,2*radioP,2*radioP);
					playerY = playerY + 40;
					if (playerY > 380){ 
						playerY = 380;
					}
					// alert(xEnemigo1,yEnemigo1);
					/*movimientoEnemigo1(xEnemigo1,yEnemigo1);*/

					}
					if (e.which == 119) {
					ctx.clearRect(playerX-radioP,playerY-radioP,2*radioP,2*radioP);
					//UP - W
					playerY = playerY - 40;
					if (playerY < 20){ 
						playerY = 20;
					}


					}
					if (e.which == 100) {
					ctx.clearRect(playerX-radioP,playerY-radioP,2*radioP,2*radioP);
					//RIGHT - D
					playerX = playerX + 40;
					if (playerX > 980){
						playerX = 980;
					}

					}
					if (e.which == 97) {
					ctx.clearRect(playerX-radioP,playerY-radioP,2*radioP,2*radioP);
					//LEFT - A
					playerX = playerX - 40;
					if (playerX < 20){
						playerX = 20;}
					}
					colision();
					movimientoEnemigo();
					colision();
					cogerObjeto();
					gane();
					ctx.drawImage(imgPlayer,playerX-radioP,playerY-radioP,2*radioP,2*radioP);
					
					if(col){
						$("#lanzarDados").attr("disabled", false);
					}
					
				}
			});
	 }
	 	function dibujarGoblin2(){
			ctx.drawImage(img,this.posX-radioP,this.posY-radioP,2*radioP,2*radioP);
		}


	function movimientoEnemigo(){
		for(k=0;k<enemigos.length;k++){
			x=enemigos[k].posX;
			y=enemigos[k].posY;
			ctx.clearRect(x-radioP,y-radioP,2*radioP,2*radioP);
			if(Math.sqrt(Math.pow((x-playerX),2))>Math.sqrt(Math.pow((y-playerY),2))){
				if((x-playerX)>0){
					x=x-40;
				}else {
					x=x+40;
				}
			}if(Math.sqrt(Math.pow((x-playerX),2))<Math.sqrt(Math.pow((y-playerY),2))){
				if((y-playerY)>0){
					y=y-40;
				}else {
					y=y+40;
				}
			}
			enemigos[k].posX=x;
			enemigos[k].posY=y;
			drawall();


		}

		
		
}


function colision(){
	jota=0;
	while(!col && jota<enemigos.length ){
		if(getPosXE(jota) == playerX && getPosYE(jota) == playerY){
			col=true;
			$("#datosEnemigos").show("slow");
			mostrarDatosEnemigos(jota);
		}
		jota++;
		
	}		

	

}

// colision enemigo

// DADOS

	var cwidth=400;
	var cheight=300;
	var dicex=50;
	var dicey=50;
	var dicewidth=100;
	var diceheight=100;
	var dotrad=6;
	var ctd;
	var dx=100;
	var dy=100;
	var firstturn=true;
	var point;
	var numberCh;

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
		numberCh=sum;
		drawface(ch);
		

	
	function draw1(){
		var dotx;
		var doty;
		ctd.beginPath();
		dotx=dx+.5*dicewidth;
		doty=dy+.5*diceheight;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctd.closePath();
		ctd.fill();
	}
	
	function draw2(){
		var dotx;
		var doty;
		ctd.beginPath();
		dotx=dx+3*dotrad;
		doty=dy+3*dotrad;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+diceheight-3*dotrad;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctd.closePath();
		ctd.fill();
	}
	
	function draw4(){
		var dotx;
		var doty;
		ctd.beginPath();
		dotx=dx+3*dotrad;
		doty=dy+3*dotrad;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+diceheight-3*dotrad;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctd.closePath();
		ctd.fill();
		ctd.beginPath();
		
		dotx=dx+3*dotrad;
		doty=dy+diceheight-3*dotrad;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+3*dotrad;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctd.closePath();
		ctd.fill();
	}
	
	function draw2mid(){
		var dotx;
		var doty;
		ctd.beginPath();
		dotx=dx+3*dotrad;
		doty=dy+.5*diceheight;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		dotx=dx+dicewidth-3*dotrad;
		doty=dy+.5*diceheight;
		ctd.arc(dotx,doty,dotrad,0,Math.PI*2,true);
		ctd.closePath();
		ctd.fill();
	}
	
	function drawface(n){
		ctd=document.getElementById('canvasDados').getContext('2d');
		ctd.lineWidth=5;
		ctd.clearRect(dx,dy,dicewidth,diceheight);
		ctd.strokeRect(dx,dy,dicewidth,diceheight);
		var dotx;
		var doty;
		ctd.fillStyle="#0";
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
	
	function encontrarAtacante(){
		atacante=0;
		for(variable=0;variable<enemigos.length;variable++){
			if(enemigos[variable].posX == playerX && enemigos[variable].posY == playerY){
				atacante=variable;
			}
		}

		return atacante;
	}
	
	function borrarEnemigo(borrar){
		enemigos.splice(borrar,1);
	}
	
	function borrarObjeto(borrar){
		objeto.splice(borrar,1);
	}
	
	

	
	function ataqueJugadorT(par){
		throwdice();
		var golpe=0;
		var before=numberCh+ataqueJugador;
		if(before > enemigos[par].defensa){
			$('#eventos').text("La suma de los dados y tu ataque supero la defensa de tu enemigo"); 
			golpe=dañoJugador;
		}else{
			$('#eventos').text("No podras atacar"); 
			golpe=0;
		}
		enemigos[par].vida=enemigos[par].vida-golpe;
		if(getVidaE(par)<=0){
			$("#eVida").text("health: "+0);
		}else{
			$("#eVida").text("health: "+getVidaE(par));
		}
	}
	
	function ataqueEnemigo(par){
		throwdice();
		var golpe;
		var before=numberCh+enemigos[par].ataque;
		if(before > defensaJugador){
			golpe=enemigos[par].daño;
			$('#eventos').text("Recibes "+golpe+" de daño"); 
		}else{
			golpe=0;
			$('#eventos').text("No recibes daño"); 
		}
		vidaJugador=vidaJugador-golpe;
		$("#jugadorVida").text("health: "+vidaJugador);

	}
	
	function dibujarPuerta(){
		ctx.drawImage(imgOrco,40-radioP,480-radioP,2*radioP,2*radioP);
	}
	
	function abrirPuerta(){
		alert("puerta");
		ctx.drawImage(imgOrco,40-radioP,480-radioP,2*radioP,2*radioP);
	}
	
	function iniciar2nivel(){
		reiniciarVariables();
		var goblin1=new Goblin();
		var goblin2=new Goblin();

		var orco1=new Orco();
		var orco2=new Orco();
		var moneda1=new Moneda();
		var moneda2=new Moneda();
		var moneda3=new Moneda();
		var moneda4=new Moneda();
		
		enemigos[0]=orco1;
		enemigos[1]=orco2;
		enemigos[2]=goblin1;
		enemigos[3]=goblin2;

		
		objetos[0]=nkey;
		objetos[1]=moneda1;
		objetos[2]=moneda2;
		objetos[3]=moneda3;
		objetos[4]=moneda4;
		
		door=new Puerta();
		ctx.drawImage(imgPlayer,playerX-radioP,playerY-radioP,2*radioP,2*radioP);
		drawallstart();

	}
	function iniciar3nivel(){
		reiniciarVariables2();
	
		var orco1=new Orco();
		var orco2=new Orco();
		var orco3=new Orco();
		var orco4=new Orco();
		var moneda1=new Moneda();
		var moneda2=new Moneda();
		var moneda3=new Moneda();
		var moneda4=new Moneda();
		
		enemigos[0]=orco1;
		enemigos[1]=orco2;
		enemigos[2]=orco3;
		enemigos[3]=orco4;
	
		
		
		objetos[0]=nkey;
		objetos[1]=moneda1;
		objetos[2]=moneda2;
		objetos[3]=moneda3;
		objetos[4]=moneda4;
		
		door=new Puerta();
		ctx.drawImage(imgPlayer,playerX-radioP,playerY-radioP,2*radioP,2*radioP);
		drawallstart();

	}