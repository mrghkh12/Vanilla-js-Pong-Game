import Ball from "./ball.js";
import Paddle from "./paddle.js";

const $ = document;

let isFinish = false

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
        computerPaddle.update(delta, ball.y,ball.x , gameDifficulty)
        changeBgColor(delta)
        if(lose()) handleLose()
    }

    lastTime = time
    if(!isFinish){
        window.requestAnimationFrame(updateApp)
    }

}

function movePlayerPaddle(e){
    playerPaddle.position = (e.y / window.innerHeight) * 100
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
    if(gamePoint <= computerScore.innerHTML || gamePoint <= playerScore.innerHTML){
        
        isFinish = true
        $.removeEventListener('mousemove', movePlayerPaddle)
        menuWrapper.style.display = 'block'
        difficultyWrapper.innerHTML = ''
        const selectPointsection = $.querySelector('.action .point')
        selectPointsection.style.display = 'none'
        playBtn.innerHTML = 'Play Again<span style="color: #ffffff;">&#9654</span>'
        playBtn.addEventListener('click' , () => location.reload())
        if(playerScore.innerHTML > computerScore.innerHTML){
            difficultyWrapper.innerHTML = '<h2>Congratulations, you were able to <span style="color: rgb(79, 202, 79);">Win🎉</span></h2>'
        }else{
            difficultyWrapper.innerHTML = '<h2>Sorry, you <span style="color: red;">lost😔</span></h2>'
        }
    }
}

function changeBgColor(delta){
    let hue = parseFloat(getComputedStyle($.documentElement).getPropertyValue('--hue'))

    $.documentElement.style.setProperty('--hue', hue + delta * 0.01)
}


/////////////dyanmic menu////////////////

let gameDifficulty = 'Normal'
let gamePoint = 5

const difficultyWrapper = $.querySelector('.difficulty')
difficultyWrapper.addEventListener('click' , e => {
    if(e.target.tagName === 'DIV'){
      for(let item of difficultyWrapper.children) item.classList.remove('active')
        
        e.target.classList.add('active')
        gameDifficulty = e.target.innerHTML
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

const menuWrapper = $.querySelector('.menu-wrapper')

const playBtn = $.querySelector('.play-btn button')
playBtn.addEventListener('click' , e => {

    menuWrapper.style.display = 'none'

    $.addEventListener('mousemove', movePlayerPaddle)
    window.requestAnimationFrame(updateApp)
})


