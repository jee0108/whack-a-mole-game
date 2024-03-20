var requestId;
var html ;
var clicked = false; 

//배경음
var audio = new Audio('../sound/cruising-down-8bit-lane-159615.mp3');
audio.autoplay = true;
audio.loop = true;
audio.play();

window.onload = function() {
    let storedBestScore = localStorage.getItem('bestScore');

    if(storedBestScore === null){
        storedBestScore = 0;
    }
    else{
        //console.log('storedBestScore : '+storedBestScore);
        document.getElementById('final-bestScore').innerHTML = 'BEST SCORE : ' + storedBestScore;
        document.getElementById('bestScore').innerHTML = 'BEST SCORE : ' +  storedBestScore;
    }

};

var scoreElement = document.getElementById('score').innerHTML;

// 기본 bestScore
var bestScoreElement = document.getElementById('bestScore').innerHTML;

// 모달창 bestScore
var bestScoreText = document.getElementById('final-bestScore').innerHTML;
var bestScore = localStorage.getItem('bestScore');

if(bestScore === null){
    bestScore = 0;
}else{
    bestScore = parseInt(bestScore);
}

var holes = document.querySelectorAll('.hole');
var score = document.querySelector('#score');

function loadPage(requestId){

    if(requestId === 'GM-001'|| requestId === 'lose'){
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

function ready(){
    requestId = 'GM-008';
    loadPage(requestId);
}

function closePage(){
    clearTimeout(timerId);
    requestId = 'GM-007';
    loadPage(requestId);
}

function continueGame(){
    score.textContent = 'SCORE ' + result;
    document.querySelector('#modalPage').classList.add('display-none');
    moveMole(); 
}
function loseScore(){
    bestScore = 0;
    storedBestScore = 0;
    result = 0;

    requestId = 'lose';
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
    var audio3 = new Audio('../sound/blip01.mp3'); //효과음
    audio3.play();
     clearInterval(timerId);
     //console.log("게임오버");
     requestId = 'GM-006';
     //document.getElementById('modalPage2').removeClass('display-none');
     $("#modalPage2").removeClass('display-none');

     document.getElementById('final-score').innerHTML = 'SCORE : '+ result;
     document.getElementById('final-bestScore').innerHTML =  'BEST SCORE : ' + bestScore;

     document.getElementById('bestScore').innerHTML =  'BEST SCORE : ' + bestScore;
     //console.log(finalScore);
}

function missMole(){
    clearInterval(timerId); 
    gameOver();
}

var result = 0;

var img = new Image();
img.src = "../img/mole1-removebg-preview.png";
img.width = "150";
img.height = "150";

function randomHole() { // 번호 랜덤 생성

    holes.forEach(function (hole) {
        hole.innerHTML = '';
    });

    let randomIndex = Math.floor(Math.random() * holes.length);
    let randomHole = holes[randomIndex];

    const imgElement = document.createElement('img'); 
    imgElement.src = img.src; 
    imgElement.width = img.width; 
    imgElement.height = img.height;

    imgElement.style.position = 'relative';
    imgElement.style.left = '22%';
    imgElement.style.bottom = '90%';

    randomHole.appendChild(imgElement); 

    hitPosition = randomHole.id;
    clicked = false;    // 두더지를 놓쳤을 경우
}

function handleMoleClick(event) { // 두더지를 클릭했을때
   
    const moleElement = this;

    clicked = true;
    if (moleElement.id == hitPosition) { // hitPosition 두더지가 나오는 포지션

        var audio2 = new Audio('../sound/flying_pan.mp3'); //효과음
        audio2.play();

        result += 100;
        score.textContent = 'SCORE '+ result;

        if(result >= bestScore){
            bestScore = result;
            bestScoreText.innerHTML = 'BEST SCORE : ' + bestScore;
        }
        //console.log("현재 점수: " + result);

        var imgElement2 = new Image(); 
        imgElement2.src = "../img/mole2-removebg-preview.png"; 
        imgElement2.width = "150"; 
        imgElement2.height = "150"; 
    
        imgElement2.style.position = 'relative';
        imgElement2.style.left = '22%';
        imgElement2.style.bottom = '90%';

        var currentImage = moleElement.querySelector('img');
        moleElement.removeEventListener('click', handleMoleClick);

        if (currentImage) {
            moleElement.replaceChild(imgElement2, currentImage);
            
            setTimeout(() => {
                moleElement.removeChild(imgElement2);
                moleElement.addEventListener('click', handleMoleClick);
            }, 250);
            
        }

        moveMole();
        clicked = true;
    }
    else{
        gameOver();
    }
}

holes.forEach(function(hole) {
    clicked = true;
    hole.addEventListener('click', handleMoleClick);
});

var timerId;

function moveMole() { // 점수가 높아질수록 빨라짐

    let interval = 3000; 

    if (result > 2000) {
        interval = 500; 
    } 
    else if (result > 1000) {
        interval = 1000; 
    } 
    else if (result > 500) {
        interval = 2000; 
    }

    clearInterval(timerId);

    timerId = setInterval(function() {

    if(!clicked){
        missMole();
    }
    else{
        randomHole();
    } 

    }, interval);
}

moveMole();

