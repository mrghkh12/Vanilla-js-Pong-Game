import Ball from "./ball.js";
import Paddle from "./paddle.js";

const $ = document;

const ball = new Ball($.getElementById('ball'))
const playerPaddle = new Paddle($.getElementById('player-paddle'))
const computerPaddle = new Paddle($.getElementById('computer-paddle'))


let lastTime = null
function updateApp(time){
    if(lastTime){
        const delta = time - lastTime
        ball.update(delta);
        computerPaddle.update(delta, ball.y)
    }

    lastTime = time
    window.requestAnimationFrame(updateApp)
}


$.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(updateApp)
