import { detectCollision } from "/src/collisionDetection";

export default class Brick {
  constructor(game, position, type, image) {
    this.image = image;
    this.game = game;
    this.type = type;

    this.position = position;
    this.width = 50;
    this.height = 15;

    this.scoreBonus5 = false;
    this.scoreBonus2 = false;
    this.largePad = false;

    this.markedForDeletion = false;
  }

  update() {
    if (this.largePad) {
    }

    if (detectCollision(this.game.ball, this)) {
      if (this.type === 1) {
        if (randomInt(1, 5) === 1) {
          this.game.bonus();
        }
      } else {
        this.game.checkBBricks();
        //bricks.push(new Brick(game, position, type, image));
        //console.log("B destroyed");
      }

      let speedBonus1 = 1.15;
      let speedBonus2 = 1.2;
      let speedBonus3 = 1.3;

      if (
        this.game.ball.speed.x === speedBonus3 * this.game.ball.dx ||
        this.game.ball.speed.x === -speedBonus3 * this.game.ball.dx
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x / speedBonus3;
        this.game.ball.speed.y = this.game.ball.speed.y / speedBonus3;
      } else if (
        this.game.ball.speed.x === speedBonus2 * this.game.ball.dx ||
        this.game.ball.speed.x === -speedBonus2 * this.game.ball.dx
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x / speedBonus2;
        this.game.ball.speed.y = this.game.ball.speed.y / speedBonus2;
      } else if (
        this.game.ball.speed.x === speedBonus1 * this.game.ball.dx ||
        this.game.ball.speed.x === -speedBonus1 * this.game.ball.dx
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x / speedBonus1;
        this.game.ball.speed.y = this.game.ball.speed.y / speedBonus1;
      }

      if (this.game.ball.direction === 1) {
        this.game.ball.speed.y = -this.game.ball.dy;
        this.game.ball.direction = -1;
      } else {
        this.game.ball.speed.y = this.game.ball.dy;
        this.game.ball.direction = 1;
      }

      if (
        this.game.ball.position.x >= this.position.x &&
        this.game.ball.position.x < this.position.x + 0.1 * this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x * speedBonus3;
        this.game.ball.speed.y = this.game.ball.speed.y * speedBonus3;
      }

      if (
        this.game.ball.position.x >= this.position.x + this.width * 0.1 &&
        this.game.ball.position.x < this.position.x + 0.3 * this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x * speedBonus2;
        this.game.ball.speed.y = this.game.ball.speed.y * speedBonus2;
      }

      if (
        this.game.ball.position.x >= this.position.x + this.width * 0.3 &&
        this.game.ball.position.x < this.position.x + 0.4 * this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x * speedBonus1;
        this.game.ball.speed.y = this.game.ball.speed.y * speedBonus1;
      }

      if (
        this.game.ball.position.x >= this.position.x + this.width * 0.4 &&
        this.game.ball.position.x < this.position.x + 0.6 * this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x;
        this.game.ball.speed.y = this.game.ball.speed.y;
      }

      if (
        this.game.ball.position.x >= this.position.x + this.width * 0.6 &&
        this.game.ball.position.x < this.position.x + 0.7 * this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x * speedBonus1;
        this.game.ball.speed.y = this.game.ball.speed.y * speedBonus1;
      }

      if (
        this.game.ball.position.x >= this.position.x + this.width * 0.7 &&
        this.game.ball.position.x < this.position.x + 0.9 * this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x * speedBonus2;
        this.game.ball.speed.y = this.game.ball.speed.y * speedBonus2;
      }

      if (
        this.game.ball.position.x >= this.position.x + this.width * 0.9 &&
        this.game.ball.position.x <= this.position.x + this.width
      ) {
        this.game.ball.speed.x = this.game.ball.speed.x * speedBonus3;
        this.game.ball.speed.y = this.game.ball.speed.y * speedBonus3;
      }

      this.markedForDeletion = true;

      if (this.scoreBonus5) {
        console.log("SCOREBONUS5");
      }

      if (this.scoreBonus2) {
        console.log("SCOREBONUS2");
      }

      if (this.scoreBonus2) {
        this.game.score += 2;
      } else if (this.scoreBonus5) {
        this.game.score += 5;
      } else {
        this.game.score++;
      }
    }
  }

  resetBonus2() {
    this.scoreBonus2 = false;
  }
  resetBonus5() {
    this.scoreBonus5 = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
