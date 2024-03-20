var requestId;
var html ;
var clicked = false; 

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

const scoreElement = document.getElementById('score').innerHTML;
var scoreElementNum = parseInt(scoreElement.replace('SCORE&nbsp; &nbsp;', ''));

// 기본 bestScore
const bestScoreElement = document.getElementById('bestScore').innerHTML;
var bestScoreElementNum = parseInt(bestScoreElement.replace('BEST SCORE : ', ''));

// 모달창 bestScore
var bestScoreText = document.getElementById('final-bestScore').innerHTML;
var bestScore = localStorage.getItem('bestScore');

if(bestScore === null){
    bestScore = 0;
}else{
    bestScore = parseInt(bestScore);
}

const holes = document.querySelectorAll('.hole');
const score = document.querySelector('#score');

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

let result = 0;

const img = new Image();
img.src = "../img/mole1-removebg-preview.png";
img.width = "150";
img.height = "150";

function randomHole() { // 번호 랜덤 생성

    holes.forEach(hole => {
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
}

function handleMoleClick(event) { // 두더지를 클릭했을때
   
    const moleElement = this;

    if (moleElement.id == hitPosition) { // hitPosition 두더지가 나오는 포지션
        result += 100;
        score.textContent = 'SCORE '+ result;

        if(result >= bestScore){
            bestScore = result;
            bestScoreText.innerHTML = 'BEST SCORE : ' + bestScore;
        }

        //console.log("현재 점수: " + result);

        const imgElement2 = new Image(); 
        imgElement2.src = "../img/mole2-removebg-preview.png"; 
        imgElement2.width = "150"; 
        imgElement2.height = "150"; 
    
        imgElement2.style.position = 'relative';
        imgElement2.style.left = '22%';
        imgElement2.style.bottom = '90%';

        const currentImage = moleElement.querySelector('img');
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

holes.forEach(hole => {
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

    timerId = setInterval(() => {

    if(!clicked){
        missMole();
    }
    else{
        randomHole();
    } 

    }, interval);
}

moveMole();

