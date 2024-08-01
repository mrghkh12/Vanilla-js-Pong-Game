let SPEED;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  reset() {
    this.position = 50;
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  update(delta, ballHeight, ballWidth, gameDifficulty) {
    let computerVision;
    if (gameDifficulty == "Hard") {
      computerVision = 50;
      SPEED = 0.02;
    } else if (gameDifficulty == "Normal") {
      computerVision = 60;
      SPEED = 0.009;
    } else {
      computerVision = 70;
      SPEED = 0.006;
    }

    if (ballWidth > computerVision) {
      this.position += SPEED * delta * (ballHeight - this.position);
    }
  }
}
