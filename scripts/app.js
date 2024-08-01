import Ball from "./ball.js";
import Paddle from "./paddle.js";

const $ = document;

const ball = new Ball($.getElementById('ball'))
const playerPaddle = new Paddle($.getElementById('player-paddle'))
const computerPaddle = new Paddle($.getElementById('computer-paddle'))
const playerScore = $.getElementById('player-score')
const computerScore = $.getElementById('computer-score')

let lastTime = null
function updateApp(time){
    if(lastTime){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y,ball.x)
        changeBgColor(delta)
        if(lose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(updateApp)
}

function lose(){
    const rect = ball.rect()
    return rect.left > window.innerWidth || rect.right < 0
}
function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }else{
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

function changeBgColor(delta){
    let hue = parseFloat(getComputedStyle($.documentElement).getPropertyValue('--hue'))

    $.documentElement.style.setProperty('--hue', hue + delta * 0.01)
}

// $.addEventListener('mousemove', e => {
//     playerPaddle.position = (e.y / window.innerHeight) * 100
// })


/////////////dyanmic menu////////////////

let gameDifficulty = 'Normal'
let gamePoint = 5

const difficultyWrapper = $.querySelector('.difficulty')
difficultyWrapper.addEventListener('click' , e => {
    if(e.target.tagName === 'DIV'){
      for(let item of difficultyWrapper.children) item.classList.remove('active')
        
        e.target.classList.add('active')
        gameDifficulty = e.target.innerHTML
        console.log(gameDifficulty);
    }
})

const selectGamePoint = $.querySelector('.select-game-point')
selectGamePoint.addEventListener('click' , e => {
    let option = selectGamePoint.querySelector('.option')
    option.classList.toggle('show')
    let gamePointElem = selectGamePoint.querySelector('.game-point')
    if(e.target.tagName == 'P') gamePointElem.innerHTML = e.target.innerHTML
    gamePoint = gamePointElem.innerHTML
})

// window.requestAnimationFrame(updateApp)
