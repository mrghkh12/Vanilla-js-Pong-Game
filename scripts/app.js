

const $ = document;

let lastTime = null
function updateApp(time){
    if(lastTime){
        const delta = time - lastTime
        console.log(delta);
    }

    lastTime = time
    window.requestAnimationFrame(updateApp)
}

window.requestAnimationFrame(updateApp)
