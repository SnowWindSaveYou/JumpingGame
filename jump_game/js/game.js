// const BACKGROUND_COLOR = '#999';
// const BOX_COLOR = '#999';
// const MOVEBOX_COLOR = '#999';
// const SWAMP_COLOR = '#222';
// const CONVEYORBELT_COLOR = '#cdb5cd';
// const SPRING_COLOR_ONE = '#8ad';
// const SPRING_COLOR_TWO = '#999';
// const HIDEBOX_COLOR = 'rgba(205,198,115,1)';
// const PANDULUM_COLOR = '#999';
// const ENEMY_COLOR = '#d08';
// const ICE_COLOR =  '#B9CDF6';

const BACKGROUND_COLOR = '#66cccc';
const BOX_COLOR = '#999';
const MOVEBOX_COLOR = '#999';
const SWAMP_COLOR = '#666699';
const CONVEYORBELT_COLOR = '#cdb5cd';
const SPRING_COLOR_ONE = '#ff99cc';
const SPRING_COLOR_TWO = '#fff';
const HIDEBOX_COLOR = '255,153,102';
const PANDULUM_COLOR = '#fff';
const ENEMY_COLOR = '#ff6666';
const ICE_COLOR =  '#fff';
var playerimg = new Image();
playerimg.src = "./img/player";
var walkcount = 0;
var walkLeft = false;
var walkRight = true;
var walkStay = true;



$(document).ready(function(e) {
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var c = $("#canvas");
	var cur = c.css('cursor');
	var mapname = "testmap";
	var w = 600, h = 600, dx = 0, dy = 0, x_player = 0, y_player = 0;
	var x_org = x_player;
	var y_org = y_player;
	var w2 = w/2;
	var h2 = h/2;
	var mf = [w2,h2];
	var fadewh = 0;
	var level = 1;
	var levelTotal = 30;
	var tle = level;
	var levelTxt = '';
	var mr = 20;
	var mr2 = mr/2;
	var start = true, fade = false, baseLevel = false, lev = false, mov = false, choose = false, pause = false;
	var kaishisize = '20px';
	var transparency = 1;
	var box = [];
	var door = [];
	var enemy = [];
	var moveBox = [];
	var moveEnemy = [];
	var hideBox = [];
	var fullScreen = [];
	var circleEnemy = [];
	var pandulumEnemy = [];
	var hideEnemy = [];
	var fallingEnemy = [];
	var spring = [];
	var transfer = [];
	var conveyorBelt = [];
	var jumpEnemy = [];
	var ice = [];
	var swamp = [];
	var y_velocity = 0;
	var a = .2;
	var x_moveleft = 0, x_moveright = 0;
	var x_velocity = 2;
	var sv = -7;
	var sx = 0;
	var sy = 0;
	var sx2 = 0;
	var sy2 = 0;
	var xa = 0;
	var xaj = .2;
	var direction = 1;
	var pi2 = Math.PI/2;
	var jian = false;
	var air = false;
	var isStart = true;
	var gameComplete = false;
	var nanc = false;
	var fa = 10;
	var yi = true;
	var dAir = false;
	var choosestyle = '#fff';
	var menustyle = '#999';
	var restyle = '#999';
	var tingstyle = '#999';
	var backstyle = '#fff'; 
	var cox = 100, coy = 100, cow = 60, coh = 30, coxk = 85, coyk = 40;
	var coy2 = coy;
	var cox2 = cox;
	var cohang = 0;
	var choo = [];
	var bufferList = [];
	canvas.width = w;
	canvas.height = h;
	context.fillStyle= '#000';
	context.fillRect(0,0,w,h);

	function begin(){
		context.fillStyle= '#fff';
		context.fillRect(0,0,w,h);
		if(start)toStart();
		//if(choose)toChoose();
		if(baseLevel)draw();
		if(lev)toLev();
		if(mov)playerControl();
		if(gameComplete)over();
		if(fade)toFade();
		if(pause)toPause();
		if(isStart)window.requestAnimationFrame(begin);
	}
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	mapname = getUrlParam("id");


	c.mousemove(function(e){
		dx = e.pageX - c.offset().left - parseInt(c.css('border-left-width'));
		dy = e.pageY - c.offset().top - parseInt(c.css('border-top-width'));
		mouseOver();
	});
	function mouseOver(){
		if(pause){
			if(Math.sqrt(Math.pow(dx-300,2)+Math.pow(dy-300,2)) <= 100){
				c.css('cursor','pointer');
			}else{
				c.css('cursor',cur);
			}
		}
	}
	c.click(function(){
		if(start){
			if(dx >= 250 && dx <= 350 && dy >= 288 && dy <= 318){
				start = false;
				kaishisize = '20px';
				c.css('cursor',cur);
				fade = true;
			}
			// else if(dx >= 270 && dx <= 330 && dy >= 362 && dy <= 386){
			// 	start = false;
			// 	kaishisize = '20px';
			// 	choosestyle = '#fff';
			// 	c.css('cursor',cur);
			// 	choose = true;
			// }
		}
		// if(choose && choo.length){
		// 	for(var i=0;i<levelTotal;i++){
		// 		if(dx >= choo[i].x && dx <= choo[i].x+cow && dy >= choo[i].y && dy <= choo[i].y+coh){
		// 			level = i+1;
		// 			c.css('cursor',cur);
		// 			fade = true;
		// 			choose = false;
		// 			break;
		// 		}
		// 	}
		// 	if(dx >= 270 && dx <= 330 && dy >= 482 && dy <= 506){
		// 		choose = false;
		// 		start = true;
		// 	}
		// }
		if(baseLevel){
			if(dx >= 560 && dx <= 590 && dy >= 10 && dy <= 35){
				start = true;
				mov = false;
				baseLevel = false;
				lev = false;
				level = 1;
				tle = 1;
			}else if(dx >= 520 && dx <= 540 && dy >= 12 && dy <= 32){
				build();
			}else if(dx >= 478 && dx <= 502 && dy >= 9 && dy <= 37){
				isStart = false;
				pause = true;
			}
		}
		if(pause){
			if(Math.sqrt(Math.pow(dx-300,2)+Math.pow(dy-300,2)) <= 100){
				isStart = true;
				pause = false;
				baseLevel = true;
				mov = true;
				begin();
			}
		}
	});

	function toPause(){
		baseLevel = false;
		mov = false;
		context.fillStyle= 'rgba(0,0,0,.5)';
		context.fillRect(0,0,w,h);
		context.beginPath();
		context.fillStyle= '#000';
		context.arc(300,300,100,0,4*pi2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.fillStyle= '#fff';
		context.arc(300,300,96,0,4*pi2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.fillStyle= '#000';
		context.moveTo(370,300);
		context.lineTo(250,230);
		context.lineTo(250,370);
		context.closePath();
		context.fill();
	}

	function toStart(){
		context.fillStyle= '#999';
		context.fillRect(0,0,w,h);
		context.font = kaishisize+' 微软雅黑';
		context.fillStyle= '#fff';
		context.textAlign = 'center';
		context.fillText("Start Game", 300, 310);
		context.beginPath();
		context.strokeStyle= '#fff';
		context.strokeRect(250,288,100,30);
		context.closePath();
	}
	function toFade(){
		context.fillStyle= '#fff';
		context.fillRect(0,0,w,h);
		if(tle != 1){
			if(yi){
				fadewh = Math.max.apply(null, mf) - fa;
				fa*=-1;
				yi = false;
			}
			if(fadewh <= 0)fa*=-1;
			fadewh += fa;
		}else{
			fadewh += fa;
		}
		context.fillStyle= '#999';
		context.fillRect(0-fadewh,0-fadewh,w2,h2);
		context.fillRect(w2+fadewh,0-fadewh,w2,h2);
		context.fillRect(0-fadewh,h2+fadewh,w2,h2);
		context.fillRect(w2+fadewh,h2+fadewh,w2,h2);
		if(fadewh >= w2 && fadewh >= h2){
			yi = true;
			fadewh = 0;
			build();
		}
	}
	/**
	 * read map xml data 
	 */
	function readMap() {
		var strHTML = "";
		$.ajax({
			url: './mapDatas/'+mapname+'.xml',
			type: 'GET',
			dataType: 'xml',
			error: function(xml){
				alert('error in loading map');
			},
			success: function (xml) {
				if($(xml).find("stage[level = '"+level+"']").length>0 && level!=0){
					$(xml).find("stage[level = '"+level+"']").each(function(i){
						bufferList = []
						
						$(this).children("box").each(function(i){
							bufferList = $(this).text().split(",");
							box.push((bufferList.map(function(data){  
								return Number(data);  
							})  )); 
						})
						$(this).children("ice").each(function(i){
							bufferList = $(this).text().split(",");
							ice.push((bufferList.map(function(data){  
								return Number(data);  
							})  )); 
						})
						$(this).children("swamp").each(function(i){
							bufferList = $(this).text().split(",");
							swamp.push((bufferList.map(function(data){  
								return Number(data);  
							})  )); 
						})
						$(this).children("conveyorBelt").each(function(i){
							bufferList = $(this).text().split(",");
							conveyorBelt.push((bufferList.map(function(data){  
								if(data == 'true' ){
									return true;  
								}else if(data == 'false' ){
									return false;  
								}
								return Number(data);  
							})  )); 
						})
						$(this).children("hideBox").each(function(i){
							bufferList = $(this).text().split(",");
							hideBox.push((bufferList.map(function(data){  
								if(data == 'true' ){
									return true;  
								}else if(data == 'false' ){
									return false;  
								}
								return Number(data);  
							})  )); 
						})
						$(this).children("hideEnemy").each(function(i){
							bufferList = $(this).text().split(",");
							hideEnemy.push((bufferList.map(function(data){  
								if(data == 'true' ){
									return true;  
								}else if(data == 'false' ){
									return false;  
								}
								return Number(data);  
							})  )); 
						})
						$(this).children("spring").each(function(i){
							bufferList = $(this).text().split(",");
							spring.push((bufferList.map(function(data){  
								if(data == 'true' ){
									return true;  
								}else if(data == 'false' ){
									return false;  
								}
								return Number(data);  
							})  )); 
						})

						$(this).children("moveBox").each(function(i){
							bufferList = $(this).text().split(",");
							moveBox.push((bufferList.map(function(data){  
								if(data == 'x' ){
									return 'x';  
								}else if (data=='y'){
									return 'y';
								}
								return Number(data);
							})  )); 
						})
						$(this).children("moveEnemy").each(function(i){
							bufferList = $(this).text().split(",");
							moveEnemy.push((bufferList.map(function(data){  
								if(data == 'x' ){
									return 'x';  
								}else if (data=='y'){
									return 'y';
								}
								return Number(data);
							})  )); 
						})
						$(this).children("enemy").each(function(i){
							bufferList = $(this).text().split(",");
							enemy.push((bufferList.map(function(data){  
								return Number(data);  
							})  )); 
						})
						$(this).children("jumpEnemy").each(function(i){
							bufferList = $(this).text().split(",");
							jumpEnemy.push((bufferList.map(function(data){  
								if(data == 'true' ){
									return true;  
								}else if(data == 'false' ){
									return false;  
								}
								return Number(data);  
							})  )); 
						})
						$(this).children("fallingEnemy").each(function(i){
							bufferList = $(this).text().split(",");
							fallingEnemy.push((bufferList.map(function(data){  
								if(data == 'true' ){
									return true;  
								}else if(data == 'false' ){
									return false;  
								}
								return Number(data);  
							})  )); 
						})
						$(this).children("circleEnemy").each(function(i){
							bufferList = $(this).text().split(",");
							circleEnemy.push((bufferList.map(function(data){  
								if(data == 'pi2' ){
									return pi2;  
								}
								return Number(data);  
							})  )); 
						})
						console.log(circleEnemy[0]);

						$(this).children("pandulumEnemy").each(function(i){
							bufferList = $(this).text().split(",");
							pandulumEnemy.push((bufferList.map(function(data){  
								return Number(data);  
							})  )); 
						})

						$(this).children("door").each(function(i){
							bufferList = $(this).text().split(",");
							door = [Number(bufferList[0]),Number(bufferList[1]), mr,mr];
						})
						
						var startPos = $(this).children("player").text().split(",");
						x_player = Number(startPos[0]);
						y_player = Number(startPos[1]);
						
					});
				}else{
					gameComplete = true;
				}
			}
		});
	};
	/**
	 * init draw data, read new data for build map
	 */
	function build(){
		fade = false;
		lev = true;
		baseLevel = true;
		mov = true;
		fullScreen = []; // 全屏

		box = [];	// 实体
		door = [];	// 出口
		enemy = [];	// 敌人
		moveEnemy = []; 
		circleEnemy = []; // 圆圈
		fallingEnemy = []; // 落体
		pandulumEnemy = []; // 钟摆
		jumpEnemy = []; // 跳跃
		hideEnemy = []; // 

		moveBox = []; // 移动
		hideBox = []; // 隐藏
		spring = []; // 弹簧
		transfer = []; // 传送
		conveyorBelt = []; // 传送带
		ice = []; // 滑冰
		swamp = []; // 沼泽
		
		transparency = 1;
		y_velocity = 0;
		levelTxt = level;
		readMap();
		x_org = x_player;
		y_org = y_player;
	}
	function draw(){
		context.fillStyle= BACKGROUND_COLOR;
		context.fillRect(0,0,w,h);

		context.fillStyle= BOX_COLOR;
		for(var i=0;i<box.length;i++){
			context.fillRect(box[i][0],box[i][1],box[i][2],box[i][3]);
		}
		context.fillStyle= ICE_COLOR;
		for(var i=0;i<ice.length;i++){
			context.fillRect(ice[i][0],ice[i][1],ice[i][2],ice[i][3]);
		}
		context.fillStyle= SWAMP_COLOR;
		for(var i=0;i<swamp.length;i++){
			context.fillRect(swamp[i][0],swamp[i][1],swamp[i][2],swamp[i][3]);
		}
		//context.fillStyle= 'rgba('+HIDEBOX_COLOR+','+hideBox[i][6]+')';
		for(var i=0;i<hideBox.length;i++){
			if(hideBox[i][7]){
				hideBox[i][6]-=hideBox[i][4];
			}
			if(hideBox[i][6] < -hideBox[i][5]){
				hideBox[i][6] = 1;
				hideBox[i][7] = false;
			}
			if(hideBox[i][6] >= 0 ){
				context.fillStyle= 'rgba('+HIDEBOX_COLOR+','+hideBox[i][6]+')';
				context.fillRect(hideBox[i][0],hideBox[i][1],hideBox[i][2],hideBox[i][3]);
			}
		}
		for(var i=0;i<conveyorBelt.length;i++){
			context.fillStyle= CONVEYORBELT_COLOR;
			context.fillRect(conveyorBelt[i][0],conveyorBelt[i][1],conveyorBelt[i][2],conveyorBelt[i][3]);
			context.fillStyle= '#ad85ad';
			if(conveyorBelt[i][4]>=0){
				if(conveyorBelt[i][5]){
					conveyorBelt[i][5]=false;
					conveyorBelt[i][6]=conveyorBelt[i][0];
					conveyorBelt[i][7]=conveyorBelt[i][0]+(conveyorBelt[i][2]/2);
					conveyorBelt[i][8]=conveyorBelt[i][2]/4;
				}
				conveyorBelt[i][6]+=conveyorBelt[i][4];
				conveyorBelt[i][7]+=conveyorBelt[i][4];
				if(conveyorBelt[i][6]>=conveyorBelt[i][0]+(conveyorBelt[i][2]/2)){
					conveyorBelt[i][6]=conveyorBelt[i][0];
					conveyorBelt[i][7]=conveyorBelt[i][0]+(conveyorBelt[i][2]/2);
				}
				if(conveyorBelt[i][7]>conveyorBelt[i][0]+(3*conveyorBelt[i][2]/4)){
					conveyorBelt[i][8] = conveyorBelt[i][0]+conveyorBelt[i][2]-conveyorBelt[i][7];
					context.fillRect(conveyorBelt[i][0],conveyorBelt[i][1],(conveyorBelt[i][2]/4)-conveyorBelt[i][8],5);
				}else{
					conveyorBelt[i][8] = conveyorBelt[i][2]/4;
				}
				context.fillRect(conveyorBelt[i][6],conveyorBelt[i][1],conveyorBelt[i][2]/4,5);
				context.fillRect(conveyorBelt[i][7],conveyorBelt[i][1],conveyorBelt[i][8],5);
			}else{
				if(conveyorBelt[i][5]){
					conveyorBelt[i][5]=false;
					conveyorBelt[i][6]=conveyorBelt[i][0]+conveyorBelt[i][2]/4;
					conveyorBelt[i][7]=conveyorBelt[i][0]+(3*conveyorBelt[i][2]/4);
					conveyorBelt[i][8]=conveyorBelt[i][2]/4;
				}
				conveyorBelt[i][6]+=conveyorBelt[i][4];
				conveyorBelt[i][7]+=conveyorBelt[i][4];
				if(conveyorBelt[i][7]<=conveyorBelt[i][0]+conveyorBelt[i][2]/4){
					conveyorBelt[i][6]=conveyorBelt[i][0]+conveyorBelt[i][2]/4;
					conveyorBelt[i][7]=conveyorBelt[i][0]+(3*conveyorBelt[i][2]/4);
				}
				if(conveyorBelt[i][6]<conveyorBelt[i][0]){
					conveyorBelt[i][6] = conveyorBelt[i][0];
					conveyorBelt[i][8]+=conveyorBelt[i][4];
					context.fillRect(conveyorBelt[i][0]+(3*conveyorBelt[i][2]/4)+conveyorBelt[i][8],conveyorBelt[i][1],conveyorBelt[i][2]/4-conveyorBelt[i][8],5);
				}else{
					conveyorBelt[i][8]=conveyorBelt[i][2]/4;
				}
				context.fillRect(conveyorBelt[i][6],conveyorBelt[i][1],conveyorBelt[i][8],5);
				context.fillRect(conveyorBelt[i][7],conveyorBelt[i][1],conveyorBelt[i][2]/4,5);
			}
		}
		context.fillStyle= SPRING_COLOR_ONE;
		for(var i=0;i<spring.length;i++){
			if(spring[i][5]){
				spring[i][5] = false;
				spring[i][6] = spring[i][3];
				spring[i][7] = spring[i][1];
				spring[i][8] = true;
			}
			context.fillRect(spring[i][0],spring[i][1],spring[i][2],10);
			context.fillRect(spring[i][0],spring[i][1]+spring[i][3]-10,spring[i][2],10);
			context.strokeStyle= SPRING_COLOR_TWO;
			context.lineWidth = 2;
			context.lineCap = 'round';
			context.beginPath();
			context.moveTo(spring[i][0]+5,spring[i][1]+5);
			context.lineTo(spring[i][0]+spring[i][2]-5,spring[i][1]+spring[i][3]-5);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.moveTo(spring[i][0]+5,spring[i][1]+spring[i][3]-5);
			context.lineTo(spring[i][0]+spring[i][2]-5,spring[i][1]+5);
			context.stroke();
			context.closePath();
		}
		for(var i=0;i<transfer.length;i++){
			// fill the text for transfer door
			context.lineWidth = 2;
			context.strokeStyle= '#F08080';
			context.strokeRect(transfer[i][0],transfer[i][1],transfer[i][2],transfer[i][3]);
			context.strokeRect(transfer[i][4],transfer[i][5],transfer[i][6],transfer[i][7]);
			context.font = '14px 微软雅黑';
			context.fillStyle= '#F08080';
			context.fillText(i+1, transfer[i][0]+10, transfer[i][1]+16);
			context.fillText(i+1, transfer[i][4]+10, transfer[i][5]+16);
		}
		
		context.fillStyle= ENEMY_COLOR;
		for(var i=0;i<enemy.length;i++){
			context.fillStyle= ENEMY_COLOR;
			context.fillRect(enemy[i][0],enemy[i][1],enemy[i][2],enemy[i][3]);
		}
		for(var i=0;i<hideEnemy.length;i++){
			hideEnemy[i][6]-=hideEnemy[i][4];
			if(hideEnemy[i][6] < -hideEnemy[i][5]){
				hideEnemy[i][6] = 1;
			}
			if(hideEnemy[i][6] > 0){
				context.fillRect(hideEnemy[i][0],hideEnemy[i][1],hideEnemy[i][2],hideEnemy[i][3]);
			}
		}
		for(var i=0;i<circleEnemy.length;i++){
			context.fillStyle= ENEMY_COLOR;
			circleEnemy[i][6]+=circleEnemy[i][7]*circleEnemy[i][5];
			circleEnemy[i][8] = circleEnemy[i][0]+(circleEnemy[i][2]*Math.cos(circleEnemy[i][6]))-(circleEnemy[i][3]/2);
			circleEnemy[i][9] = circleEnemy[i][1]+(circleEnemy[i][2]*Math.sin(circleEnemy[i][6]))-(circleEnemy[i][4]/2);
			context.fillRect(circleEnemy[i][8],circleEnemy[i][9],circleEnemy[i][3],circleEnemy[i][4]);
			drawEye(circleEnemy[i][0],circleEnemy[i][1]);
		}
		for(var i=0;i<pandulumEnemy.length;i++){
			context.fillStyle= ENEMY_COLOR;
			pandulumEnemy[i][10] = Math.abs((Math.abs(pandulumEnemy[i][6]-pi2)-Math.abs(pandulumEnemy[i][7] - pi2))*pandulumEnemy[i][8])/Math.abs(pandulumEnemy[i][7] - pi2);
			if(pandulumEnemy[i][10]<=pandulumEnemy[i][9]){
				pandulumEnemy[i][10] = pandulumEnemy[i][9];
			}
			if(Math.abs(pandulumEnemy[i][6]-pi2)>=Math.abs(pandulumEnemy[i][7]-pi2)){
				pandulumEnemy[i][5]*=-1;
			}
			pandulumEnemy[i][6]+=pandulumEnemy[i][10]*pandulumEnemy[i][5];
			pandulumEnemy[i][11] = pandulumEnemy[i][0]+(pandulumEnemy[i][2]*Math.cos(pandulumEnemy[i][6]))-(pandulumEnemy[i][3]/2);
			pandulumEnemy[i][12] = pandulumEnemy[i][1]+(pandulumEnemy[i][2]*Math.sin(pandulumEnemy[i][6]))-(pandulumEnemy[i][4]/2);
			context.fillRect(pandulumEnemy[i][11],pandulumEnemy[i][12],pandulumEnemy[i][3],pandulumEnemy[i][4]);
			context.beginPath();
			context.strokeStyle= PANDULUM_COLOR;
			context.lineWidth = (pandulumEnemy[i][3]+pandulumEnemy[i][4])/20;
			context.lineCap = 'round';
			context.moveTo(pandulumEnemy[i][0],pandulumEnemy[i][1]);
			context.lineTo(pandulumEnemy[i][0]+(pandulumEnemy[i][2]*Math.cos(pandulumEnemy[i][6])),pandulumEnemy[i][1]+(pandulumEnemy[i][2]*Math.sin(pandulumEnemy[i][6])));
			context.stroke();
			context.closePath();
		}
		for(var i=0;i<fullScreen.length;i++){
			fullScreen[i][0]+=fullScreen[i][4];
			fullScreen[i][1]+=fullScreen[i][5];
			if(fullScreen[i][0] < 0){
				fullScreen[i][0]*=-1;
				fullScreen[i][4]*=-1;
			}else if(fullScreen[i][0]+fullScreen[i][2] > w){
				fullScreen[i][0] = 2*(w-fullScreen[i][2]) - fullScreen[i][0];
				fullScreen[i][4]*=-1;
			}
			if(fullScreen[i][1] < 0){
				fullScreen[i][1]*=-1;
				fullScreen[i][5]*=-1;
			}else if(fullScreen[i][1]+fullScreen[i][3] > h){
				fullScreen[i][1] = 2*(h-fullScreen[i][3]) - fullScreen[i][1];
				fullScreen[i][5]*=-1;
			}
			context.fillRect(fullScreen[i][0],fullScreen[i][1],fullScreen[i][2],fullScreen[i][3]);
		}
		context.fillStyle= MOVEBOX_COLOR;
		for(var i=0;i<moveBox.length;i++){
			if(moveBox[i][4] == 'x'){
				moveBox[i][9] = moveBox[i][7]*moveBox[i][8]*Math.min.apply(null, [moveBox[i][6]-moveBox[i][0],moveBox[i][0]-moveBox[i][5]])/(moveBox[i][6]-moveBox[i][5]);
				if(Math.abs(moveBox[i][9]) <= moveBox[i][10])moveBox[i][9]=moveBox[i][10]*moveBox[i][8];
				if(moveBox[i][0]+moveBox[i][9] >= moveBox[i][6] || moveBox[i][0]+moveBox[i][9] <= moveBox[i][5])moveBox[i][8]*=-1;
				moveBox[i][11] = moveBox[i][0];
				moveBox[i][0]+=moveBox[i][9];
				context.fillRect(moveBox[i][0],moveBox[i][1],moveBox[i][2],moveBox[i][3]);
			}else{
				moveBox[i][9] = moveBox[i][7]*moveBox[i][8]*Math.min.apply(null, [moveBox[i][6]-moveBox[i][1],moveBox[i][1]-moveBox[i][5]])/(moveBox[i][6]-moveBox[i][5]);
				if(Math.abs(moveBox[i][9]) <= moveBox[i][10])moveBox[i][9]=moveBox[i][10]*moveBox[i][8];
				if(moveBox[i][1]+moveBox[i][9] >= moveBox[i][6] || moveBox[i][1]+moveBox[i][9] <= moveBox[i][5])moveBox[i][8]*=-1;
				moveBox[i][11] = moveBox[i][1];
				moveBox[i][1]+=moveBox[i][9];
				context.fillRect(moveBox[i][0],moveBox[i][1],moveBox[i][2],moveBox[i][3]);
			}
		}
		context.fillStyle= ENEMY_COLOR;
		for(var i=0;i<jumpEnemy.length;i++){
			context.fillStyle= ENEMY_COLOR;
			if(jumpEnemy[i][9]){
				jumpEnemy[i][9] = false;
				jumpEnemy[i][10] = jumpEnemy[i][1];
				jumpEnemy[i][11]=-1*jumpEnemy[i][5];
			}
			jumpEnemy[i][0]+=(jumpEnemy[i][4]*jumpEnemy[i][6]);
			jumpEnemy[i][11]+=a;
			jumpEnemy[i][1]+=jumpEnemy[i][11];
			if(jumpEnemy[i][1]>=jumpEnemy[i][10]){
				jumpEnemy[i][1] = jumpEnemy[i][10];
				jumpEnemy[i][11]=-1*jumpEnemy[i][5];
			}
			if(jumpEnemy[i][0]<=jumpEnemy[i][7]){
				jumpEnemy[i][6]*=-1;
				jumpEnemy[i][0] = 2*jumpEnemy[i][7]-jumpEnemy[i][0];
			}else if(jumpEnemy[i][0]+jumpEnemy[i][2]>=jumpEnemy[i][8]){
				jumpEnemy[i][6]*=-1;
				jumpEnemy[i][0] = 2*(jumpEnemy[i][8]-jumpEnemy[i][2])-jumpEnemy[i][0];
			}
			context.fillRect(jumpEnemy[i][0],jumpEnemy[i][1],jumpEnemy[i][2],jumpEnemy[i][3]);
			drawEye(jumpEnemy[i][0],jumpEnemy[i][1]);
		}
		for(var i=0;i<fallingEnemy.length;i++){
			context.fillStyle= ENEMY_COLOR;
			if(fallingEnemy[i][8]){
				fallingEnemy[i][8] = false;
				fallingEnemy[i][9] = fallingEnemy[i][1];
				fallingEnemy[i][10] = fallingEnemy[i][7];
				fallingEnemy[i][11] = fallingEnemy[i][6];
			}
			fallingEnemy[i][6]-=0.01;
			if(fallingEnemy[i][6]<=0){
				fallingEnemy[i][7]+=fallingEnemy[i][5];
				fallingEnemy[i][1]+=fallingEnemy[i][7];
			}
			if(fallingEnemy[i][1]+fallingEnemy[i][3]>fallingEnemy[i][4]){
				fallingEnemy[i][1] = fallingEnemy[i][9];
				fallingEnemy[i][7] = fallingEnemy[i][10];
				fallingEnemy[i][6] = fallingEnemy[i][11];
			}
			context.fillRect(fallingEnemy[i][0],fallingEnemy[i][1],fallingEnemy[i][2],fallingEnemy[i][3]);
		}
		for(var i=0;i<moveEnemy.length;i++){
			context.fillStyle= ENEMY_COLOR;
			if(moveEnemy[i][4] == 'x'){
				moveEnemy[i][9] = moveEnemy[i][7]*moveEnemy[i][8]*Math.min.apply(null, [moveEnemy[i][6]-moveEnemy[i][0],moveEnemy[i][0]-moveEnemy[i][5]])/(moveEnemy[i][6]-moveEnemy[i][5]);
				if(Math.abs(moveEnemy[i][9]) <= moveEnemy[i][10])moveEnemy[i][9]=moveEnemy[i][10]*moveEnemy[i][8];
				if(moveEnemy[i][0]+moveEnemy[i][9] >= moveEnemy[i][6] || moveEnemy[i][0]+moveEnemy[i][9] <= moveEnemy[i][5])moveEnemy[i][8]*=-1;
				moveEnemy[i][11] = moveEnemy[i][0];
				moveEnemy[i][0]+=moveEnemy[i][9];
				context.fillRect(moveEnemy[i][0],moveEnemy[i][1],moveEnemy[i][2],moveEnemy[i][3]);
				drawEye(moveEnemy[i][0],moveEnemy[i][1]);
			}else{
				moveEnemy[i][9] = moveEnemy[i][7]*moveEnemy[i][8]*Math.min.apply(null, [moveEnemy[i][6]-moveEnemy[i][1],moveEnemy[i][1]-moveEnemy[i][5]])/(moveEnemy[i][6]-moveEnemy[i][5]);
				if(Math.abs(moveEnemy[i][9]) <= moveEnemy[i][10])moveEnemy[i][9]=moveEnemy[i][10]*moveEnemy[i][8];
				if(moveEnemy[i][1]+moveEnemy[i][9] >= moveEnemy[i][6] || moveEnemy[i][1]+moveEnemy[i][9] <= moveEnemy[i][5])moveEnemy[i][8]*=-1;
				moveEnemy[i][11] = moveEnemy[i][1];
				moveEnemy[i][1]+=moveEnemy[i][9];
				context.fillRect(moveEnemy[i][0],moveEnemy[i][1],moveEnemy[i][2],moveEnemy[i][3]);
				drawEye(moveEnemy[i][0],moveEnemy[i][1]);
			}
		}
		context.lineWidth = 2;
		context.strokeStyle= '#32CD32';
		context.strokeRect(door[0],door[1],door[2],door[3]);
		/*if(le == 1){
			context.font = '14px 微软雅黑';
			context.fillStyle= '#32CD32';
			context.fillText("出口", 510, 480);
			context.fillStyle= '#d08';
			context.fillText("不能碰", 475, 390);
		};*/
	}
	function toLev(){
		transparency-=.01;
		context.fillStyle= 'rgba(34,136,221,'+transparency+')';
		context.font = '30px 微软雅黑';
		context.textAlign = 'center';
		context.fillText("No. "+levelTxt+" Stage", 300, 310);
		if(transparency <= 0){
			transparency = 1;
			lev = false;
		}
	}

	/**
	 * control the move of player
	 * and control the status of player
	 */
	function playerControl(){
		sx = x_player;
		sy = y_player;
		// move control
		if(x_moveleft && !x_moveright){
			x_player-=x_moveleft;
			direction = -1;
		}else if(!x_moveleft && x_moveright){
			x_player+=x_moveright;
			direction = 1;
		}
		// air wall
		if(x_player < 0){
			x_player = 0;
		}else if(x_player+mr > w){
			x_player = w-mr;
		}
		air = true;
		dAir = true;
		// collision for box
		for(var i=0;i<box.length;i++){
			if(sx+mr <= box[i][0] && x_player+mr >= box[i][0] && y_player+mr > box[i][1] && y_player <= box[i][1]+box[i][3]){
				x_player = box[i][0]-mr;
			}else if(sx >= box[i][0]+box[i][2] && x_player <= box[i][0]+box[i][2] && y_player+mr > box[i][1] && y_player <= box[i][1]+box[i][3]){
				x_player = box[i][0]+box[i][2];
			}
			if(x_player+mr > box[i][0] && x_player < box[i][2]+box[i][0] && parseInt(y_player+mr) <= box[i][1] && parseInt(y_player+mr+y_velocity) >= box[i][1]){
				y_velocity = 0;
				y_player = box[i][1]-mr;
			}else if(x_player+mr > box[i][0] && x_player < box[i][2]+box[i][0] && parseInt(y_player) > box[i][1]+box[i][3] && parseInt(y_player+y_velocity) <= box[i][1]+box[i][3]){
				y_velocity = 0;
				y_player = box[i][1]+box[i][3];
			}
			if(y_player == box[i][1]-mr && y_velocity != sv){
				if(x_player+mr <= box[i][0] || x_player >= box[i][2]+box[i][0]){
					air = true;
				}else{
					y_velocity = 0;
					air = false;
					if(jian)y_velocity = sv;
				}
			}
			if(!air)dAir = false;
		}
		// collision for swamp
		for(var i=0;i<swamp.length;i++){
			if(sx+mr <= swamp[i][0] && x_player+mr >= swamp[i][0] && y_player+mr > swamp[i][1] && y_player <= swamp[i][1]+swamp[i][3]){
				x_player = swamp[i][0]-mr;
			}else if(sx >= swamp[i][0]+swamp[i][2] && x_player <= swamp[i][0]+swamp[i][2] && y_player+mr > swamp[i][1] && y_player <= swamp[i][1]+swamp[i][3]){
				x_player = swamp[i][0]+swamp[i][2];
			}
			if(x_player+mr > swamp[i][0] && x_player < swamp[i][2]+swamp[i][0] && parseInt(y_player+mr) <= swamp[i][1] && parseInt(y_player+mr+y_velocity) >= swamp[i][1]){
				y_velocity = 0;
				y_player = swamp[i][1]-mr;
			}else if(x_player+mr > swamp[i][0] && x_player < swamp[i][2]+swamp[i][0] && parseInt(y_player) > swamp[i][1]+swamp[i][3] && parseInt(y_player+y_velocity) <= swamp[i][1]+swamp[i][3]){
				y_velocity = 0;
				y_player = swamp[i][1]+swamp[i][3];
			}
			if(y_player == swamp[i][1]-mr && y_velocity != sv){
				if(x_player+mr <= swamp[i][0] || x_player >= swamp[i][2]+swamp[i][0]){
					air = true;
				}else{
					y_velocity = 0;
					air = false;
					if(jian)y_velocity = sv;
					x_player = sx;
				}
			}
			if(!air)dAir = false;
		}
		// collision for ice
		for(var i=0;i<ice.length;i++){
			if(sx+mr <= ice[i][0] && x_player+mr >= ice[i][0] && y_player+mr > ice[i][1] && y_player <= ice[i][1]+ice[i][3]){
				x_player = ice[i][0]-mr;
			}else if(sx >= ice[i][0]+ice[i][2] && x_player <= ice[i][0]+ice[i][2] && y_player+mr > ice[i][1] && y_player <= ice[i][1]+ice[i][3]){
				x_player = ice[i][0]+ice[i][2];
			}
			if(x_player+mr > ice[i][0] && x_player < ice[i][2]+ice[i][0] && parseInt(y_player+mr) <= ice[i][1] && parseInt(y_player+mr+y_velocity) >= ice[i][1]){
				y_velocity = 0;
				y_player = ice[i][1]-mr;
			}else if(x_player+mr > ice[i][0] && x_player < ice[i][2]+ice[i][0] && parseInt(y_player) > ice[i][1]+ice[i][3] && parseInt(y_player+y_velocity) <= ice[i][1]+ice[i][3]){
				y_velocity = 0;
				y_player = ice[i][1]+ice[i][3];
			}
			if(y_player == ice[i][1]-mr && y_velocity != sv){
				if(x_player+mr <= ice[i][0] || x_player >= ice[i][2]+ice[i][0]){
					air = true;
				}else{
					y_velocity = 0;
					air = false;
					if(jian)y_velocity = sv;
					x_player = sx + (ice[i][4]*direction);
					if(x_player < 0){
						x_player = 0;
					}else if(x_player+mr > w){
						x_player = w-mr;
					}
				}
			}
			if(!air)dAir = false;
		}
		// collision for conveyoubelt
		for(var i=0;i<conveyorBelt.length;i++){
			if(sx+mr <= conveyorBelt[i][0] && x_player+mr >= conveyorBelt[i][0] && y_player+mr > conveyorBelt[i][1] && y_player <= conveyorBelt[i][1]+conveyorBelt[i][3]){
				x_player = conveyorBelt[i][0]-mr;
			}else if(sx >= conveyorBelt[i][0]+conveyorBelt[i][2] && x_player <= conveyorBelt[i][0]+conveyorBelt[i][2] && y_player+mr > conveyorBelt[i][1] && y_player <= conveyorBelt[i][1]+conveyorBelt[i][3]){
				x_player = conveyorBelt[i][0]+conveyorBelt[i][2];
			}
			if(x_player+mr > conveyorBelt[i][0] && x_player < conveyorBelt[i][2]+conveyorBelt[i][0] && parseInt(y_player+mr) <= conveyorBelt[i][1] && parseInt(y_player+mr+y_velocity) >= conveyorBelt[i][1]){
				y_velocity = 0;
				y_player = conveyorBelt[i][1]-mr;
			}else if(x_player+mr > conveyorBelt[i][0] && x_player < conveyorBelt[i][2]+conveyorBelt[i][0] && parseInt(y_player) > conveyorBelt[i][1]+conveyorBelt[i][3] && parseInt(y_player+y_velocity) <= conveyorBelt[i][1]+conveyorBelt[i][3]){
				y_velocity = 0;
				y_player = conveyorBelt[i][1]+conveyorBelt[i][3];
			}
			if(y_player == conveyorBelt[i][1]-mr && y_velocity != sv){
				if(x_player+mr <= conveyorBelt[i][0] || x_player >= conveyorBelt[i][2]+conveyorBelt[i][0]){
					air = true;
				}else{
					x_player+=conveyorBelt[i][4];
					y_velocity = 0;
					air = false;
					if(jian)y_velocity = sv;
				}
			}
			if(!air)dAir = false;
		}

		// collision for spring
		for(var i=0;i<spring.length;i++){
			if(sx+mr <= spring[i][0] && x_player+mr >= spring[i][0] && y_player+mr > spring[i][1] && y_player <= spring[i][1]+spring[i][3]){
				x_player = spring[i][0]-mr;
			}else if(sx >= spring[i][0]+spring[i][2] && x_player <= spring[i][0]+spring[i][2] && y_player+mr > spring[i][1] && y_player <= spring[i][1]+spring[i][3]){
				x_player = spring[i][0]+spring[i][2];
			}
			if(x_player+mr > spring[i][0] && x_player < spring[i][2]+spring[i][0] && parseInt(y_player+mr) <= spring[i][1] && parseInt(y_player+mr+y_velocity) >= spring[i][1]){
				y_velocity = 0;
				y_player = spring[i][1]-mr;
			}else if(x_player+mr > spring[i][0] && x_player < spring[i][2]+spring[i][0] && parseInt(y_player) > spring[i][1]+spring[i][3] && parseInt(y_player+y_velocity) <= spring[i][1]+spring[i][3]){
				y_velocity = 0;
				y_player = spring[i][1]+spring[i][3];
			}
			if(y_player == spring[i][1]-mr && y_velocity != sv){
				if(x_player+mr <= spring[i][0] || x_player >= spring[i][2]+spring[i][0]){
					air = true;
				}else{
					if(spring[i][3]>=21 && spring[i][8]){
						spring[i][1]+=1;
						spring[i][3]-=1;
						y_player = spring[i][1]-mr;
					}else{
						if(spring[i][3]-10>=spring[i][6]){
							spring[i][3] = spring[i][6];
							spring[i][1] = spring[i][7];
							y_player = spring[i][1]-mr;
							y_velocity = -spring[i][4];
							spring[i][8] = true;
						}else{
							spring[i][1]-=10;
							spring[i][3]+=10;
							y_player = spring[i][1]-mr;
							y_velocity = 0;
							spring[i][8] = false;
						}
					}
					air = false;
					if(jian)y_velocity = sv;
				}
			}else{
				if(spring[i][3]+10>=spring[i][6]){
					spring[i][3] = spring[i][6];
					spring[i][1] = spring[i][7];
				}else{
					spring[i][1]-=10;
					spring[i][3]+=10;
				}
			}
			if(!air)dAir = false;
		}
		// collision for hidebox
		for(var i=0;i<hideBox.length;i++){
			if(hideBox[i][6] >= 0){
				if(sx+mr <= hideBox[i][0] && x_player+mr >= hideBox[i][0] && y_player+mr > hideBox[i][1] && y_player <= hideBox[i][1]+hideBox[i][3]){
					x_player = hideBox[i][0]-mr;
				}else if(sx >= hideBox[i][0]+hideBox[i][2] && x_player <= hideBox[i][0]+hideBox[i][2] && y_player+mr > hideBox[i][1] && y_player <= hideBox[i][1]+hideBox[i][3]){
					x_player = hideBox[i][0]+hideBox[i][2];
				}
				if(x_player+mr > hideBox[i][0] && x_player < hideBox[i][2]+hideBox[i][0] && parseInt(y_player+mr) <= hideBox[i][1] && parseInt(y_player+mr+y_velocity) >= hideBox[i][1]){
					y_velocity = 0;
					y_player = hideBox[i][1]-mr;
					hideBox[i][7] = true;
				}else if(x_player+mr > hideBox[i][0] && x_player < hideBox[i][2]+hideBox[i][0] && parseInt(y_player) > hideBox[i][1]+hideBox[i][3] && parseInt(y_player+y_velocity) <= hideBox[i][1]+hideBox[i][3]){
					y_velocity = 0;
					y_player = hideBox[i][1]+hideBox[i][3];
				}
				if(y_player == hideBox[i][1]-mr && y_velocity != sv){
					if(x_player+mr <= hideBox[i][0] || x_player >= hideBox[i][2]+hideBox[i][0]){
						air = true;
					}else{
						y_velocity = 0;
						air = false;
						if(jian)y_velocity = sv;
					}
				}
				if(!air)dAir = false;
			}
		}
		// collision for move box
		for(var i=0;i<moveBox.length;i++){
			if(moveBox[i][4] == 'x'){
				if(sx+mr <= moveBox[i][11] && x_player+mr >= moveBox[i][0] && y_player+mr > moveBox[i][1] && y_player <= moveBox[i][1]+moveBox[i][3]){
					x_player = moveBox[i][0]-mr;
				}else if(sx >= moveBox[i][11]+moveBox[i][2] && x_player <= moveBox[i][0]+moveBox[i][2] && y_player+mr > moveBox[i][1] && y_player <= moveBox[i][1]+moveBox[i][3]){
					x_player = moveBox[i][0]+moveBox[i][2];
				}
				if(x_player+mr > moveBox[i][0] && x_player < moveBox[i][2]+moveBox[i][0] && parseInt(y_player+mr) <= moveBox[i][1] && parseInt(y_player+mr+y_velocity) >= moveBox[i][1]){
					y_velocity = 0;
					y_player = moveBox[i][1]-mr;
				}else if(x_player+mr > moveBox[i][0] && x_player < moveBox[i][2]+moveBox[i][0] && parseInt(y_player) > moveBox[i][1]+moveBox[i][3] && parseInt(y_player+y_velocity) <= moveBox[i][1]+moveBox[i][3]){
					y_velocity = 0;
					y_player = moveBox[i][1]+moveBox[i][3];
				}
				if(y_player == moveBox[i][1]-mr && y_velocity != sv){
					if(x_player+mr <= moveBox[i][0] || x_player >= moveBox[i][2]+moveBox[i][0]){
						air = true;
					}else{
						x_player-=(moveBox[i][11]-moveBox[i][0]);
						y_velocity = 0;
						air = false;
						if(jian)y_velocity = sv;
					}
				}
				if(!air)dAir = false;
			}else{
				if(sx+mr <= moveBox[i][0] && x_player+mr >= moveBox[i][0] && y_player+mr > moveBox[i][1] && y_player <= moveBox[i][1]+moveBox[i][3]){
					x_player = moveBox[i][0]-mr;
				}else if(sx >= moveBox[i][0]+moveBox[i][2] && x_player <= moveBox[i][0]+moveBox[i][2] && y_player+mr > moveBox[i][1] && y_player <= moveBox[i][1]+moveBox[i][3]){
					x_player = moveBox[i][0]+moveBox[i][2];
				}
				if(x_player+mr > moveBox[i][0] && x_player < moveBox[i][2]+moveBox[i][0] && parseInt(y_player+mr) <= parseInt(moveBox[i][11]) && parseInt(y_player+mr+y_velocity) >= moveBox[i][1]){
					y_velocity = 0;
					y_player = moveBox[i][1]-mr;
					moveBox[i][12] = true;
				}else if(x_player+mr > moveBox[i][0] && x_player < moveBox[i][2]+moveBox[i][0] && parseInt(y_player) >= moveBox[i][1]+moveBox[i][3] && parseInt(y_player+y_velocity) <= moveBox[i][1]+moveBox[i][3]+moveBox[i][9]){
					y_velocity = 0;
					y_player = moveBox[i][1]+moveBox[i][3];
				}
				if(moveBox[i][12]){
					y_player = moveBox[i][1]-mr;
					if(y_velocity == sv){
						moveBox[i][12] = false;
					}
				}
				if(y_player == moveBox[i][1]-mr && y_velocity != sv){
					if(x_player+mr <= moveBox[i][0] || x_player >= moveBox[i][2]+moveBox[i][0]){
						moveBox[i][12] = false;
						air = true;
					}else{
						y_velocity = 0;
						air = false;
						if(jian)y_velocity = sv;
					}
				}
				if(!air)dAir = false;
			}
		}
		// transfer player position
		for(var i=0;i<transfer.length;i++){
			if(x_player > transfer[i][0]-mr2 && x_player < transfer[i][0]+mr2 && y_player > transfer[i][1]-mr2 && y_player < transfer[i][1]+mr2){
				if(transfer[i][8]){
					x_player = transfer[i][4];
					y_player = transfer[i][5];
					y_velocity = 0;
					transfer[i][8] = false;
				}
			}else if(x_player > transfer[i][4]-mr2 && x_player < transfer[i][4]+mr2 && y_player > transfer[i][5]-mr2 && y_player < transfer[i][5]+mr2){
				if(transfer[i][8]){
					x_player = transfer[i][0];
					y_player = transfer[i][1];
					y_velocity = 0;
					transfer[i][8] = false;
				}
			}else{
				transfer[i][8] = true;
			}
		}
		air = dAir;
		for(var i=0;i<enemy.length;i++){
			if(x_player+mr > enemy[i][0] && x_player < enemy[i][0]+enemy[i][2] && y_player+mr > enemy[i][1] && y_player < enemy[i][1]+enemy[i][3]){
				dea();
				break;
			}
		}
		for(var i=0;i<jumpEnemy.length;i++){
			if(x_player+mr > jumpEnemy[i][0] && x_player < jumpEnemy[i][0]+jumpEnemy[i][2] && y_player+mr > jumpEnemy[i][1] && y_player < jumpEnemy[i][1]+jumpEnemy[i][3]){
				dea();
				break;
			}
		}
		for(var i=0;i<moveEnemy.length;i++){
			if(x_player+mr > moveEnemy[i][0] && x_player < moveEnemy[i][0]+moveEnemy[i][2] && y_player+mr > moveEnemy[i][1] && y_player < moveEnemy[i][1]+moveEnemy[i][3]){
				dea();
				break;
			}
		}
		for(var i=0;i<hideEnemy.length;i++){
			if(x_player+mr > hideEnemy[i][0] && x_player < hideEnemy[i][0]+hideEnemy[i][2] && y_player+mr > hideEnemy[i][1] && y_player < hideEnemy[i][1]+hideEnemy[i][3] && hideEnemy[i][6] > 0){
				dea();
				break;
			}
		}
		for(var i=0;i<fullScreen.length;i++){
			if(x_player+mr > fullScreen[i][0] && x_player < fullScreen[i][0]+fullScreen[i][2] && y_player+mr > fullScreen[i][1] && y_player < fullScreen[i][1]+fullScreen[i][3]){
				dea();
				break;
			}
		}
		for(var i=0;i<circleEnemy.length;i++){
			if(x_player+mr > circleEnemy[i][8] && x_player < circleEnemy[i][8]+circleEnemy[i][3] && y_player+mr > circleEnemy[i][9] && y_player < circleEnemy[i][9]+circleEnemy[i][4]){
				dea();
				break;
			}
		}
		for(var i=0;i<fallingEnemy.length;i++){
			if(x_player+mr > fallingEnemy[i][0] && x_player < fallingEnemy[i][0]+fallingEnemy[i][2] && y_player+mr > fallingEnemy[i][1] && y_player < fallingEnemy[i][1]+fallingEnemy[i][3]){
				dea();
				break;
			}
		}
		for(var i=0;i<pandulumEnemy.length;i++){
			if(x_player+mr > pandulumEnemy[i][11] && x_player < pandulumEnemy[i][11]+pandulumEnemy[i][3] && y_player+mr > pandulumEnemy[i][12] && y_player < pandulumEnemy[i][12]+pandulumEnemy[i][4]){
				dea();
				break;
			}
		}
		// if player failling
		if(y_player < 0){
			y_player = 0;
			y_velocity = 0;
		}else if(y_player > h){
			dea();
		}
		// jump
		if(air){
			y_velocity+=a;
		}
		if(y_velocity == 0 && nanc && !air){
			jian = true;
			y_velocity = sv;
		}
		y_player+=y_velocity;
		sx2 = sx;
		sy2 = sy;
		sx2<x_player-2?sx2=x_player-2:sx2;
		sx2>x_player+2?sx2=x_player+2:sx2;
		sy2<y_player-2?sy2=y_player-2:sy2;
		sy2>y_player+2?sy2=y_player+2:sy2;
		context.fillStyle= '#f82';//身体

		if(walkStay){
			if(walkLeft){
				context.drawImage(playerimg,30,0,30,32,x_player,y_player,mr,mr); 
			}else{
				context.drawImage(playerimg,30,33,30,31,x_player,y_player,mr,mr);
			}

		}else if(walkLeft){
			switch(walkcount%3){
				case 0:context.drawImage(playerimg,0,0,30,32,x_player,y_player,mr,mr);  break;
				case 1:context.drawImage(playerimg,30,0,30,32,x_player,y_player,mr,mr);  break;
				case 2:context.drawImage(playerimg,60,0,30,32,x_player,y_player,mr,mr);  break;
			}
			
		}else{
			switch(walkcount%3){
				case 0:context.drawImage(playerimg,-2,33,30,31,x_player,y_player,mr,mr);  break;
				case 1:context.drawImage(playerimg,30,33,30,31,x_player,y_player,mr,mr);  break;
				case 2:context.drawImage(playerimg,60,33,30,31,x_player,y_player,mr,mr);  break;
			}
		}
		   
		if(x_player > door[0]-mr2 && x_player < door[0]+mr2 && y_player > door[1]-mr2 && y_player < door[1]+mr2){
			level++;
			tle = 0;
			fade = true;
			lev = false;
			mov = false;
		}
	}
	function drawEye(ex,ey){
		context.fillStyle= '#fff';
		context.beginPath();
		context.arc(ex+5,ey+7,5,Math.PI/7,8*Math.PI/7,false);
		context.fill();
		context.beginPath();
		context.arc(ex+15,ey+7,5,-Math.PI/7,6*Math.PI/7,false);
		context.fill();
		context.closePath();
		context.fillStyle= '#000';
		context.beginPath();
		context.arc(ex+5,ey+9,1,0,2*Math.PI);
		context.fill();
		context.beginPath();
		context.arc(ex+14,ey+9,1,0,2*Math.PI);
		context.fill();
		context.closePath();
	}

	// player dead
	function dea(){
		lev = true;
		x_player = x_org;
		y_player = y_org;
		y_velocity = 0;
	}

	// game complete
	function over(){
		fade = false;
		lev = false;
		mov = false;
		baseLevel = false;
		context.fillStyle= '#999';
		context.fillRect(0,0,w,h);
		context.font = kaishisize+' 微软雅黑';
		context.fillStyle= '#fff';
		context.textAlign = 'center';
		context.fillText("Congratulations~~", 300, 310);
	}
	function ranz(x1,x2){
		return Math.floor(Math.random()*(x2-x1+1)+x1);
	}
	function ran(x1,x2){
		return Math.random()*(x2-x1)+x1;
	}

	// Player Contorl
	c.keydown(function(event){
		switch(event.keyCode){
			case 37: 	// left key
				x_moveleft = x_velocity;
				walkLeft = true;
				walkRight = false;
				walkStay = false;
				walkcount++;
				break;
			case 39:	// right key
				x_moveright = x_velocity;
				walkLeft = false;
				walkRight = true;
				walkStay = false;
				walkcount++;
				break;
			case 38:	// up key
				if(!air){
					jian = true;
					y_velocity = sv;
				}
				nanc = true;
				break;
			case 82:	// R
				build();
				break;
			case 32:	// space
				if(baseLevel){
					isStart = false;
					pause = true;
				}else if(pause){
					isStart = true;
					pause = false;
					baseLevel = true;
					mov = true;
					begin();
				}
				break;

			return false;
		}
	});
	c.keyup(function(key){
		switch(event.keyCode){
			case 37:	// left
				x_moveleft = 0;
				walkStay = true;
				break;
			case 39:	// right
				x_moveright = 0;
				walkStay = true;
				break;
			case 38:	// up
				if(jian){
					jian = false;
					if(y_velocity < 0)y_velocity = y_velocity/2;
				}
				nanc = false;
				break;
			return false;
		}
	});
	(function() {
		var lastTime = 0;
		var vendors = ['webkit', 'moz'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
										  window[vendors[x] + 'CancelRequestAnimationFrame'];
		}
	
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}
		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	}());
	begin();
});

