var requestId;
var html ;
var audio=  new Audio('../sound/cruising-down-8bit-lane-159615.mp3');//배경음
audio.pause();
audio.autoplay = true;
audio.loop = true;
audio.play();

function loadPage(requestId){

    if(requestId === 'GM-001'){
        html = 'index.html';
    }
    else if(requestId === 'GM-002'){
        html = 'gameStart.html';
    }
    else if(requestId ==='GM-007'){
        document.querySelector('#modalPage').classList.remove('display-none');
        return;
    }
    else if(requestId === 'GM-008'){
        html = 'howTo.html';
    }

    location.href= html;
}

function mainPage(){
    requestId = 'GM-001';
    loadPage(requestId);
}

function startGame(){
    requestId = 'GM-002';
    loadPage(requestId);
}

function ready(){
    requestId = 'GM-008';
    loadPage(requestId);
}