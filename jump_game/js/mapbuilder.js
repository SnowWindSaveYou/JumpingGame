var flag = false;
var selectTool = false;
var boxTool = false;
var moveBoxTool = false;
var hideBoxTool = false;
var springTool = false;
var conveyorBeltTool = false;
var iceTool = false;
var swampTool = false;
var playerTool = false;
var doorTool = false;
var transferTool = false;
var enemyTool = false;
var circleEnemyTool = false;

var pointTool = false;

var drawHori = false;
var drawVert = false;
var drawCir = false;


var x = 0, y = 0;
var x_anchor = 0;
var y_anchor = 0;
var w = 0, h = 0;
var xy_buffer = 0;

var stages = [[[],[],[["box",0,0,0,0]]]];
var currStage = 0;
var elements = [["box",0,0,0,0]];
var currElement;
var player = [];
var door = [];
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var c = $("#canvas");           // components
var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");
var c2 = $("#canvas2");         // buffer
var canvas3 = document.getElementById("canvas3");
var context3 = canvas3.getContext("2d");
var c3 = $("#canvas3");         // event
var cur = c.css('cursor');

var elemType = $("#elem_type");
var elemPro = $("#elem_pro");

// const BOX_COLOR = '#999';
// const MOVEBOX_COLOR = '#999';
// const SWAMP_COLOR = '#222';
// const CONVEYORBELT_COLOR = '#cdb5cd';
// const SPRING_COLOR = '#8ad';
// const HIDEBOX_COLOR = 'rgba(205,198,115,1)';
// const ENEMY_COLOR = '#d08';
 const ICE_COLOR =  '#B9CDF6';

const BACKGROUND_COLOR = '#66cccc';
const BOX_COLOR = '#999';
const MOVEBOX_COLOR = '#999';
const SWAMP_COLOR = '#666699';
const CONVEYORBELT_COLOR = '#cdb5cd';
const SPRING_COLOR = '#ff99cc';
const HIDEBOX_COLOR = '255,153,102';
const PANDULUM_COLOR = '#fff';
const ENEMY_COLOR = '#ff6666';
//const ICE_COLOR =  '#fff';

$(':radio[name="tool"]').click(function(){
    var tool = $(this).val();  //获取选中的radio的值
    selectTool = false, boxTool = false,enemyTool = false,playerTool = false, doorTool = false, transferTool = false, pointTool = false;
    moveBoxTool = false, hideBoxTool = false, springTool = false, conveyorBeltTool = false, iceTool = false, swampTool = false;
    switch(tool){
        case "select":
            selectTool = true;
            break;
        case "box":
            boxTool = true;
            break;
        case "moveBox":
            moveBoxTool = true;
            break;
        case "hideBox":
            hideBoxTool = true;
            break;
        case "spring":
            springTool = true;
            break;
        case "conveyorBelt":
            conveyorBeltTool = true;
            break;
        case "ice":
            iceTool = true;
            break;
        case "swamp":
            swampTool = true;
            break;
        case "door":
            doorTool = true;
            break;
        case "player":
            playerTool = true;
            break;
        case "enemy":
            enemyTool = true;
            break;
        case "transfer":
            transferTool = true;
            break;
        case "circleEnemy":
            circleEnemyTool = true;
            break;
    }
});

$(document).ready(function(e) {
    
    var selectRange = []

    c.mousedown(function(e){
        flag = true;
        x = e.offsetX; // 鼠标落下时的X
        y = e.offsetY; // 鼠标落下时的Y
        console.log(x + ", "+y);
        selectElement(e);
        setEvent(e)

    }).mouseup(function(e){
        drawElements(e);
        flag = false;
        context2.clearRect(0,0,canvas2.width,canvas2.height);
        context2.strokeStyle= '#f00';
        context2.beginPath();
        context2.strokeRect(selectRange[0],selectRange[1],selectRange[2],selectRange[3]);
        
        if(playerTool||doorTool){
            // 更新事件层
            context3.clearRect(0,0,canvas2.width,canvas2.height);
            context3.beginPath();
            context3.strokeStyle= 'rgb(34,136,221)';
            context3.strokeRect(door[0],door[1],20,20);
            context3.beginPath();
            context3.fillStyle= '#ff0';
            context3.fillRect(player[0],player[1],20,20);
        }
    }).mousemove(function(e){
        drawMouse(e); 
        
    });

    // 选择元素
    function selectElement(e){
        if(flag&&selectTool){
            currElement = null;
            selectRange = [];
            elements.forEach(function(element,index){
                if(x>element[1] && x<element[1]+element[3] && y>element[2]&&y<element[2]+element[4]){
                    currElement = index;
                    context2.clearRect(0,0,canvas2.width,canvas2.height);
                    context2.beginPath();
                    context2.lineWidth = 1;
                    selectRange = [element[1],element[2],element[3],element[4]]
                    context2.strokeRect(element[1],element[2],element[3],element[4]);
                    console.log("yes: "+ index +"/"+elements.length);
                    console.log("elem: "+ elements[currElement]);
                    return;
                }
            })
            editSelect();
        }
    }

    function editSelect(){
        if(!currElement){
            elemType.empty();
            elemPro.empty();
            $("#elem_x").val(0);
            $("#elem_y").val(0);
            $("#elem_w").val(0);
            $("#elem_h").val(0);
            return;
        }
        var ce = elements[currElement];
        if(ce[0]=="box"||ce[0]=="ice"||ce[0]=="swamp"||ce[0]=="moveBox"||ce[0]=="hideBox"||ce[0]=="conveyorBelt"||ce[0]=="spring"){
            elemType.empty();
            elemPro.empty();
            elemType.append("<option value='box'>box</option>");
            elemType.append("<option value='ice'>ice</option>");
            elemType.append("<option value='swamp'>swamp</option>");
            elemType.append("<option value='moveBox'>moveBox</option>");
            elemType.append("<option value='hideBox'>hideBox</option>");
            elemType.append("<option value='conveyorBelt'>conveyorBelt</option>");
            elemType.append("<option value='spring'>spring</option>");

            $("#elem_x").val(ce[1]);
            $("#elem_y").val(ce[2]);
            $("#elem_w").val(ce[3]);
            $("#elem_h").val(ce[4]);

            switch(ce[0]){
                case "box":
                    elemType.val("box");
                    break;
                case "ice":
                    elemType.val("ice");
                    break;
                case "swamp":
                    elemType.val("swamp");
                    break;
                case "moveBox":
                    elemType.val("moveBox");
                    break;
                case "hideBox":
                    elemType.val("hideBox");
                    break;
                case "conveyorBelt":
                    elemType.val("conveyorBelt");
                    break;
                case "spring":
                    elemType.val("spring");
                    break;
            }  
        }else{
            elemType.empty();
            elemPro.empty();
            elemType.append("<option value='enemy'>enemy</option>");
            elemType.append("<option value='moveEnemy'>moveEnemy</option>");
            elemType.append("<option value='circleEnemy'>circleEnemy</option>");
            elemType.append("<option value='fallingEnemy'>fallingEnemy</option>");
            elemType.append("<option value='pandulumEnemy'>pandulumEnemy</option>");
            elemType.append("<option value='jumpEnemy'>jumpEnemy</option>");
            elemType.append("<option value='hideEnemy'>hideEnemy</option>");
            elemType.val(ce[0]);

            $("#elem_x").val(ce[1]);
            $("#elem_y").val(ce[2]);
            $("#elem_w").val(ce[3]);
            $("#elem_h").val(ce[4]);         
        }
        refreshMenu();
    }
    elemType.change(function(){if(currElement){refreshMenu();}});
    

    // 追踪鼠标
    function drawMouse(e){
        if(flag){
            context2.clearRect(0,0,canvas2.width,canvas2.height);
            context2.beginPath();
            context2.lineWidth = 1;
            context2.strokeRect(x,y,e.offsetX-x,e.offsetY-y);
        }
        if(drawCir){
            context2.clearRect(0,0,canvas2.width,canvas2.height);
            context2.beginPath();
            context2.lineWidth = 1;
            context2.arc(e.offsetX,e.offsetY,Math.pow(Math.pow((x_anchor - e.offsetX),2)+ Math.pow((y_anchor - e.offsetY),2), 0.5),0,2*Math.PI);
            context2.stroke();
        }
        
    }
    
    function setEvent(e){
        if(playerTool){
            // 设置玩家初始位置
            context3.beginPath();
            context3.fillStyle= '#ff0';
            context3.fillRect(x,y,20,20);
            player = [x,y];

        }else if(doorTool){
            // 设置通关出口位置
            context3.beginPath();
            context3.strokeStyle= 'rgb(34,136,221)';
            context3.strokeRect(x,y,20,20);
            door = [x,y,20,20];

        }else if(drawCir){
            elements[currElement][5] = x;
            elements[currElement][6] = y;
            editSelect();
        }
    }

    // draw the elements
    function drawElements(e){
        if(e.offsetX-x == 0||e.offsetY-y==0)return;
        w = e.offsetX-x;
        h = e.offsetY-y;
        if(e.offsetX<x){
            x = e.offsetX;
            w = -w;
        }
        if(e.offsetY<y){
            y = e.offsetY;
            h = -h;
        }
        
        if(boxTool){
            context.beginPath();
            context.fillStyle= BOX_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["box",x,y,w,h])
            currElement = elements.length-1;
            editSelect();
        }else if(enemyTool){
            context.beginPath();
            context.fillStyle= ENEMY_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["enemy",x,y,w,h])
            currElement = elements.length-1;
            editSelect();
        }else if(moveBoxTool){
            context.beginPath();
            context.fillStyle= MOVEBOX_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["moveBox",x,y,w,h,'y',10,500,4,1,0,.2])
            currElement = elements.length-1;
            editSelect();
            refreshDraw();
        }else if(hideBoxTool){
            context.beginPath();
            context.fillStyle= HIDEBOX_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["hideBox",x,y,w,h,.05,5,1,false])
            currElement = elements.length-1;
            editSelect();
        }else if(iceTool){
            context.beginPath();
            context.fillStyle= ICE_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["ice",x,y,w,h,3])
            currElement = elements.length-1;
            editSelect();
        }else if(swampTool){
            context.beginPath();
            context.fillStyle= SWAMP_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["swamp",x,y,w,h])
            currElement = elements.length-1;
            editSelect();
        }else if(springTool){
            context.beginPath();
            context.fillStyle= SPRING_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["spring",x,y,w,h,12,true])
            currElement = elements.length-1;
            editSelect();
        }else if(conveyorBeltTool){
            context.beginPath();
            context.fillStyle= CONVEYORBELT_COLOR;
            context.fillRect(x,y,w,h);
            elements.push(["conveyorBelt",x,y,w,h,1,true])
            currElement = elements.length-1;
            editSelect();
        }else if(circleEnemyTool){
            context.beginPath();
            context.fillStyle= ENEMY_COLOR;
            context.fillRect(x,y,w,h);
            x_anchor = x + (e.offsetX-x)/2;
            y_anchor = y + (e.offsetY-y)/2;
            drawCir = true;
            elements.push(["circleEnemy",x,y,w,h,0,0,1,pi2,0.03])
            currElement = elements.length-1;
            editSelect();
        }
    }

})

function refreshDraw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context3.clearRect(0,0,canvas2.width,canvas2.height);
    context3.beginPath();
    context3.strokeStyle= 'rgb(34,136,221)';
    context3.strokeRect(door[0],door[1],20,20);
    context3.beginPath();
    context3.fillStyle= '#ff0';
    context3.fillRect(player[0],player[1],20,20);

    elements.forEach(function(elem){
        switch(elem[0]){
            case "box":
            case "moveBox":
                context.fillStyle= MOVEBOX_COLOR;
                break;
            case "ice":
                context.fillStyle= ICE_COLOR;
                break;
            case "swamp":
                context.fillStyle= SWAMP_COLOR;
                break;
            case "conveyorBelt":
                context.fillStyle= CONVEYORBELT_COLOR;
                break;
            case "spring":
                context.fillStyle= SPRING_COLOR;
                break;
            case "hideBox":
                context.fillStyle= HIDEBOX_COLOR;
                break;
            case "enemy":
            case "moveEnemy":
            case "circleEnemy":
            case "fallingEnemy":
            case "pandulumEnemy":
            case "jumpEnemy":
            case "hideEnemy":
                context.fillStyle= ENEMY_COLOR;
                break;
        }
        context.beginPath();
        context.fillRect(elem[1],elem[2],elem[3],elem[4]);
        console.log("reff");

        switch(elem[0]){
            case "moveBox"||"moveEnemy"||"fallingEnemy"||"jumpEnemy":
                context3.setLineDash([5,15]); 
                context3.lineWidth = 1; 
                context3.strokeStyle = '#f36'; 
                context3.beginPath();
            case "moveEnemy":
            case "moveBox":
                context3.fillRect(elem[1],elem[2],elem[3],elem[4]);
                switch(elem[5]){               // x/ y
                    case 'y':
                        context3.moveTo(Number(elem[1])+Number(elem[3]/2),elem[6]); 
                        context3.lineTo(Number(elem[1])+Number(elem[3]/2),elem[7]); 
                        break;
                    case 'x':
                        context3.moveTo(elem[6], Number(elem[2])+Number(elem[4]/2)); 
                        context3.lineTo(elem[7], Number(elem[2])+Number(elem[4]/2)); 
                        break;
                }
                context3.stroke();
                console.log("reff2");
                break;

            case "fallingEnemy":
                context3.moveTo(Number(elem[1])+Number(elem[3]/2),elem[2]); 
                context3.lineTo(Number(elem[1])+Number(elem[3]/2),Number(elem[2])+Number(elem[5])); 
                context3.stroke();
                break;
            case "jumpEnemy":
                context3.moveTo(elem[8],Number(elem[2])+Number(elem[4]/2)); 
                context3.lineTo(elem[9],Number(elem[2])+Number(elem[4]/2)); 
                context3.stroke();
                break;
                
 
        }
    })
}
function refreshMenu(){
    elemPro.empty();
    var ce = elements[currElement];
    switch(elemType.children('option:selected').val()){
        case "box":
        case "enemy":
        case "swamp":
            break;
        case "ice":
            elemPro.append('<li>Slide <input type="text" id = "slide"></li>');
            if(ce.length>5)$("#slide").val(ce[5]);
            break;
        case "moveEnemy":
        case "moveBox":
            elemPro.append('<li>Max Speed <input type="text" id = "maxsp"></li>');
            elemPro.append('<li>Min Speed <input type="text" id = "minsp"></li>');
            
            elemPro.append('<li>Distance Range <input type="text" id = "range1">'+
                                                '<input type="text" id = "range2"></li>');
            
            elemPro.append('<li>Accel <input type="text" id = "acc"></li>');
            
            elemPro.append('<li>Direction <select id = "dire">'+
                            '<option value="up">up</option>'+
                            '<option value="down">down</option>'+
                            '<option value="left">left</option>'+
                            '<option value="right">right</option>'+
                            '<select></li>');
            if(ce.length>5){
                $("#range1").val(ce[6]);
                $("#range2").val(ce[7]);
                $("#maxsp").val(ce[8]);
                $("#minsp").val(ce[10]);
                $("#acc").val(ce[11]);  
                if(ce[5]=='x'){
                    if(ce[9]>0)$("#dire").val("right")
                    else $("#acc").val("left"); 
                }else{
                    if(ce[9]>0)$("#dire").val("down")
                    else $("#acc").val("up");
                }
            };
            break;
        case "hideEnemy":
        case "hideBox":
            elemPro.append('<li>Hide Speed <input type="text" id = "hidesp"></li>');
            elemPro.append('<li>Hide Time <input type="text" id = "hidetime"></li>');
            if(ce.length>5){
                $("#hidesp").val(ce[5]);
                $("#hidetime").val(ce[6]);
            };
            break;
        case "conveyorBelt":
            elemPro.append('<li>Direction <select id = "dire">'+
                            '<option value="left">left</option>'+
                            '<option value="right">right</option>'+
                            '<select></li>');
            if(ce.length>5){
                switch(ce[5]){
                    case -1:
                        $("#dire").val("left"); 
                        break;
                    case 1:
                        $("#dire").val("right"); 
                        break;
                }
            };
            break;
        case "spring":
            elemPro.append('<li>Speed <input type="text" id = "spe"></li>');
            if(ce.length>5)$("#spe").val(ce[5]);
            break;
        case "circleEnemy":
            elemPro.append('<li>Speed <input type="text" id = "spe"></li>');
            if(ce.length>5)$("#spe").val(ce[5]);
            break;
        case "fallingEnemy":
            elemPro.append('<li>Distance <input type="text" id = "dist"></li>');
            elemPro.append('<li>Accel <input type="text" id = "acc"></li>');
            elemPro.append('<li>Stay <input type="text" id = "stay"></li>');
            elemPro.append('<li>Init Speed <input type="text" id = "insp"></li>');
            if(ce.length>5){
                $("#dist").val(ce[5]);
                $("#acc").val(ce[6]);
                $("#stay").val(ce[7]);
                $("#insp").val(ce[8]);
            }
            break;
        case "pandulumEnemy":
            break;
        case "jumpEnemy":
            elemPro.append('<li>X Speed <input type="text" id = "xspe"></li>');
            elemPro.append('<li>Y Speed <input type="text" id = "yspe"></li>');
            elemPro.append('<li>Direction <select id = "dire">'+
                            '<option value="left">left</option>'+
                            '<option value="right">right</option>'+
                            '<select></li>');
            elemPro.append('<li>Range x1<input type="text" id = "range1"></li>');
            elemPro.append('<li>Range x2<input type="text" id = "range2"></li>');
            if(ce.length>5){
                $("#xspe").val(ce[5]);
                $("#yspe").val(ce[6]);
                switch(ce[7]){
                    case -1:
                        $("#dire").val("left"); 
                        break;
                    case 1:
                        $("#dire").val("right"); 
                        break;
                }
                $("#range1").val(ce[8]);
                $("#range2").val(ce[9]);
            }
            break;

        
    }
}

function changeElem(){
    if(currElement){
        elements[currElement] = [elemType.children('option:selected').val(),
                $("#elem_x").val(),
                $("#elem_y").val(),
                $("#elem_w").val(),
                $("#elem_h").val()];

        switch(elements[currElement][0]){
            case "box":
                break;
            case "ice":
                elements[currElement].push($("#slide").val());
                break;
            case "swamp":
                break;
            case "moveEnemy":
            case "moveBox":
                var elemDire = $("#dire").val();
                switch(elemDire){               // x/ y
                    case "up":
                    case "down":
                        elements[currElement].push('y');
                        break;
                    case "left":
                    case "right":
                        elements[currElement].push("x");
                        break;
                    default:
                        console.log(elemDire);
                        console.log(elemDire=="right")
                        elements[currElement].push('y');
                        break;
                }
                elements[currElement].push($("#range1").val());
                elements[currElement].push($("#range2").val());  // distance range
                elements[currElement].push($("#maxsp").val());
                switch(elemDire){               // direction
                    case "up":
                    case "left":
                        elements[currElement].push(-1);
                        break;
                    case "down":
                    case "right":
                        elements[currElement].push(1);
                        break;
                    default:
                        elements[currElement].push(1);
                        break;
                }
                elements[currElement].push($("#minsp").val());   // min speed
                elements[currElement].push($("#acc").val());     // acceleration
                
                break;
            case "hideEnemy":
            case "hideBox":
                elements[currElement].push($("#hidesp").val());
                elements[currElement].push($("#hidetime").val());
                elements[currElement].push(1);
                elements[currElement].push(false);
                break;
            case "conveyorBelt":
                switch($("#dire").val()){               // direction
                    case "left":
                        elements[currElement].push(-1);
                        break;
                    case "right":
                        elements[currElement].push(1);
                        break;
                }
                elements[currElement].push(true);
                break;
            case "spring":
                elements[currElement].push($("#spe").val());
                elements[currElement].push(true);
                break;
            case "circleEnemy":
            case "fallingEnemy":
                elements[currElement].push($("#dist").val());
                elements[currElement].push($("#acc").val());
                elements[currElement].push($("#stay").val());
                elements[currElement].push($("#insp").val());
                elements[currElement].push(true);
            case "pandulumEnemy":
            case "jumpEnemy":
                elements[currElement].push($("#xspe").val());
                elements[currElement].push($("#yspe").val());
                switch($("#dire").val()){
                    case "left":
                        elements[currElement].push(-1);
                        break;
                    case "right":
                        elements[currElement].push(1);
                        break;
                }
                elements[currElement].push($("#range1").val());
                elements[currElement].push($("#range2").val());
                elements[currElement].push(true);
  
        }
        refreshDraw();
        console.log("new elem: "+ elements[currElement]);
    }    
}

function deleteElem(){
    if(currElement){
        delete elements[currElement];
        currElement = null;
        refreshDraw();
        if(!currElement){
            elemType.empty();
            elemPro.empty();
            $("#elem_x").val(0);
            $("#elem_y").val(0);
            $("#elem_w").val(0);
            $("#elem_h").val(0);
            return;
        }
    }
}

function clearDraw(){
    currElement = null;
    elements = [["box",0,0,0,0]];
    player = [];
    door = [];
    refreshDraw();
    elemType.empty();
    elemPro.empty();
    $("#elem_x").val(0);
    $("#elem_y").val(0);
    $("#elem_w").val(0);
    $("#elem_h").val(0);
    return;
}

function saveStage(){
    stages[currStage][0] = player;
    stages[currStage][1] = door;
    stages[currStage][2] = elements;
}
function lastStage(){
    if(currStage-1<0)return;
    saveStage();
    readStage(currStage-1);
    return;
}
function nextStage(){
    if(currStage==stages.length-1){
        stages.push([[],[],[["box",0,0,0,0]]]); // player, door, mapdata
    }
    saveStage();
    readStage(currStage+1);
    return;
}
function readStage(stageNum){
    currStage = stageNum;
    player = stages[currStage][0];
    door = stages[currStage][1];
    elements = stages[currStage][2];
    
    refreshDraw();
    elemType.empty();
    elemPro.empty();
    $("#elem_x").val(0);
    $("#elem_y").val(0);
    $("#elem_w").val(0);
    $("#elem_h").val(0);
    return;
}

function saveMap(){
    saveStage();
    // generate the xml file
    var xmlDom="<?xml version=\"1.0\" encoding=\"utf-8\" ?>"+"<map>";

    stages.forEach(function(stage,i){
        xmlDom += "<stage level = '"+Number(i+1)+"'>";
        xmlDom += "<player>"+stage[0][0]+","+stage[0][1]+"</player>";
        xmlDom += "<door>"+stage[1][0]+","+stage[1][1]+"</door>";
        stage[2].forEach(function(item){
            item.forEach(function(data,index){
                if(index==0){
                    xmlDom += "<"+item[0]+">";
                }else if(index == item.length-1){
                    xmlDom += data + "</"+item[0]+">";
                }else{
                    xmlDom += data+",";
                }
            })
        })
        xmlDom += "</stage>";
    })
    xmlDom += "</map>";
    $.post("http://localhost:3000/post_mapdata",{xmldata: xmlDom, mapname: $('#mapname').val()},function(result){
        alert("Map is saved");
        return;
    });
}