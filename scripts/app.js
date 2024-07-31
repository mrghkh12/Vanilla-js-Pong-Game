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
        ball.update(delta);
        computerPaddle.update(delta, ball.y)

        if(lose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(updateApp)
}

function lose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
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


$.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(updateApp)
