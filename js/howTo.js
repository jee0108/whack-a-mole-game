var requestId;
var html ;

var bestScoreText = document.getElementById('chageBestScore').innerHTML;
var bestScore = localStorage.getItem('bestScore') || 0;

if(bestScore === null || isNaN(bestScore)){
    bestScore = 0;
}else{
    bestScore = parseInt(bestScore);
}

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

    if (requestId !== 'lose') {
        localStorage.setItem('bestScore', bestScore);
    }

    location.href= html;
}


window.onload = function() {
    var storedBestScore = localStorage.getItem('bestScore');

    if(storedBestScore === null || isNaN(storedBestScore)){
        storedBestScore = 0;
    }
    else{
        document.getElementById('chageBestScore').innerHTML = 'BEST SCORE : ' + (storedBestScore ? storedBestScore : 0);
    }

};

function ready(){
    requestId = 'GM-008';
    loadPage(requestId);
}

function mainPage(){
    requestId = 'GM-001';
    loadPage(requestId);
}

function startGame(){
    requestId = 'GM-002';
    loadPage(requestId);
}

function gameOver(){
    clearInterval(timerId);

    requestId = 'GM-006';

    $("#modalPage2").removeClass('display-none');

    document.getElementById('score').innerHTML = 'SCORE : '+ result;
    document.getElementById('chageBestScore').innerHTML = bestScore;

}



