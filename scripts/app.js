<<<<<<< Updated upstream


const $ = document;

=======
<<<<<<< Updated upstream
=======
import Ball from "./ball.js";

const $ = document;

const ball = new Ball($.getElementById('ball'))

>>>>>>> Stashed changes
let lastTime = null
function updateApp(time){
    if(lastTime){
        const delta = time - lastTime
<<<<<<< Updated upstream
        console.log(delta);
=======
        ball.update(delta);
>>>>>>> Stashed changes
    }

    lastTime = time
    window.requestAnimationFrame(updateApp)
}

window.requestAnimationFrame(updateApp)
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
