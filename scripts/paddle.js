const SPEED = 0.008

export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem
        this.reset()
    }
    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--position'))
    }
    set position(value){
        this.paddleElem.style.setProperty('--position' , value)
    }

    reset(){
        this.position = 50
    }

    rect(){
        return this.paddleElem.getBoundingClientRect()
    }

    update(delta , ballHeight, ballWidth){
        if(ballWidth > 60){
            this.position += SPEED * delta * (ballHeight - this.position)
            console.log(this.position);
        }

    }
}