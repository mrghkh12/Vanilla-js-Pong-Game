import Ball from "./ball.js";

const $ = document;

const ball = new Ball($.getElementById('ball'))


let lastTime = null
function updateApp(time){
    if(lastTime){
        const delta = time - lastTime
        ball.update(delta);

    }

    lastTime = time
    window.requestAnimationFrame(updateApp)
}

window.requestAnimationFrame(updateApp)
