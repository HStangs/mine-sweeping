var startBtn = document.getElementById("btn");
var container = document.getElementsByClassName("container")[0];
var last = document.getElementsByClassName("last")[0];
var timer = document.getElementsByClassName("timer")[0];
var last = document.getElementsByClassName("last")[0];
var lastSpan = last.getElementsByTagName("span")[0];
var timer = document.getElementsByClassName("timer")[0];
var timerSpan = timer.getElementsByTagName("span")[0];
var time;
var key = true;
var minesNum;
var mineOver;
var block;
var mineMap = [];

bindEvent();
function bindEvent() {
    startBtn.onclick = function(){
        if(key){
            last.style.display = "block";
            timer.style.display = "blcok";
            timeStart();
            int();
            key = false;    
        }
    }
    container.oncontextmenu = function(){
        return false;
    }
    container.onmousedown = function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if(e.which == 1){
            leftClick(target);
        }else if(e.which == 3){
            rightClick(target);
        }
    }
}

function timeStart(){
    time = setInterval(function(){
    timerSpan.innerText = Number(timerSpan.innerText) + 1; 
    },1000)
}

function int(){
    minesNum = 10;
    mineOver = 10;
    // flagOver = 10;
    lastSpan.innerHTML = mineOver;
    // lastSpan.innerHTML = flagOver;
    for(var i = 0;i < 10;i++){
        for(var j = 0;j < 10;j++){
            var con =  document.createElement("div");
            con.classList.add("block");
            con.setAttribute("id",i +"-"+ j);
            container.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    block = document.getElementsByClassName("block");  
    while(minesNum){
        var mineIndex = Math.floor(Math.random()*100);    
        if(mineMap[mineIndex].mine === 0){
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add("islei");
            minesNum --;
        }
    }
}

function leftClick(dom){
    var islei = document.getElementsByClassName("islei");
    if(dom && dom.classList.contains("islei")){
        clearInterval(time); 
        for(var i = 0; i < islei.length; i ++){
            islei[i].classList.add("show");
        }
        setTimeout(function(){
            alert("╮(╯﹏╰）╭  Game over!!!");
            container.innerHTML = "";
            timerSpan.innerText = 0;
            key = true;
        },500)
    }else{
        var n = 0;
        var posArr = dom && dom.getAttribute("id").split("-");
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add("num");
        for(var i = posX-1; i <= posX+1; i++){
            for(var j = posY-1; j <= posY+1; j++){
                var arroundBox = document.getElementById(i+"-"+j);
                if(arroundBox && arroundBox.classList.contains("islei")){
                    n ++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if( n == 0){
            for(var i = posX-1; i <= posX+1; i++){
                for(var j = posY-1; j <= posY+1; j++){
                    var nearBox = document.getElementById(i+"-"+j);                
                    if(nearBox && nearBox.length != 0){
                        if(!nearBox.classList.contains("check")){
                            nearBox.classList.add("check");
                            leftClick(nearBox);        
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom){
    if(dom.classList.contains("num")){
        return;
    }
    dom.classList.toggle("flag");
    if(dom.classList.contains("islei") && dom.classList.contains("flag")){
        mineOver --;
    }
    if(dom.classList.contains("islei") && !dom.classList.contains("flag")){
        mineOver ++;
    }
    lastSpan.innerHTML = mineOver;
    if(mineOver == 0){
        clearInterval(time); 
        setTimeout(function(){
            alert("ヾ(✿ﾟ▽ﾟ)ノ  ,You win!!!");
            container.innerHTML = "";
            timerSpan.innerText = 0;
            key = true;
        },500)
    }
}

// function rightClick(dom){
//     var flagOver = 10;
//     if(dom.classList.contains("num")){
//         return;
//     }
//     dom.classList.toggle("flag");
//     if(dom.classList.contains("flag")){
//         flagOver --;
//     }
//     if(!dom.classList.contains("flag")){
//         flagOver ++;
//     }
//     if(dom.classList.contains("islei") && dom.classList.contains("flag")){
//         mineOver --;
//     }
//     if(dom.classList.contains("islei") && !dom.classList.contains("flag")){
//         mineOver ++;
//     }
//     lastSpan.innerHTML = flagOver;
//     if(mineOver == 0 && flagOver == 0){
//         clearInterval(time); 
//         setTimeout(function(){
//             alert("ヾ(✿ﾟ▽ﾟ)ノ  ,You win!!!");
//             container.innerHTML = "";
//             timerSpan.innerText = 0;
//             key = true;
//         },500)
//     }
// }
 