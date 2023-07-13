import { detectCollision } from "/src/collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("ballImage");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.dx = 12;
    this.dy = 9;
    this.direction = -1;

    this.size = 24;
    this.reset();
  }

  reset() {
    this.position = {
      x: randomInt(this.size * 2, this.gameWidth - this.size * 2),
      y: randomInt(200, 500)
    };
    let xDirection = randomInt(1, 2);
    if (xDirection === 1) {
      this.speed = { x: this.dx, y: -this.dy };
    } else {
      this.speed = { x: -this.dx, y: -this.dy };
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    let speedBonus1 = 1.15;
    let speedBonus2 = 1.2;
    let speedBonus3 = 1.3;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall on left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
      this.direction = 1;
    }

    // bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // paddle
    if (detectCollision(this, this.game.paddle)) {
      if (
        this.speed.x === speedBonus3 * this.dx ||
        this.speed.x === -speedBonus3 * this.dx
      ) {
        this.speed.x = this.speed.x / speedBonus3;
      } else if (
        this.speed.x === speedBonus2 * this.dx ||
        this.speed.x === -speedBonus2 * this.dx
      ) {
        this.speed.x = this.speed.x / speedBonus2;
      } else if (
        this.speed.x === speedBonus1 * this.dx ||
        this.speed.x === -speedBonus1 * this.dx
      ) {
        this.speed.x = this.speed.x / speedBonus1;
      }

      this.speed.y = this.dy;

      if (
        this.position.x >= this.game.paddle.position.x &&
        this.position.x <
          this.game.paddle.position.x + 0.1 * this.game.paddle.width
      ) {
        this.speed.x = this.speed.x * speedBonus3;
        this.speed.y = -this.speed.y * speedBonus3;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }

      if (
        this.position.x >=
          this.game.paddle.position.x + this.game.paddle.width * 0.1 &&
        this.position.x <
          this.game.paddle.position.x + 0.3 * this.game.paddle.width
      ) {
        this.speed.x = this.speed.x * speedBonus2;
        this.speed.y = -this.speed.y * speedBonus2;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }

      if (
        this.position.x >=
          this.game.paddle.position.x + this.game.paddle.width * 0.3 &&
        this.position.x <
          this.game.paddle.position.x + 0.4 * this.game.paddle.width
      ) {
        this.speed.x = this.speed.x * speedBonus1;
        this.speed.y = -this.speed.y * speedBonus1;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }

      if (
        this.position.x >=
          this.game.paddle.position.x + this.game.paddle.width * 0.4 &&
        this.position.x <
          this.game.paddle.position.x + 0.6 * this.game.paddle.width
      ) {
        this.speed.x = this.speed.x;
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }

      if (
        this.position.x >=
          this.game.paddle.position.x + this.game.paddle.width * 0.6 &&
        this.position.x <
          this.game.paddle.position.x + 0.7 * this.game.paddle.width
      ) {
        this.speed.x = this.speed.x * speedBonus1;
        this.speed.y = -this.speed.y * speedBonus1;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }

      if (
        this.position.x >=
          this.game.paddle.position.x + this.game.paddle.width * 0.7 &&
        this.position.x <
          this.game.paddle.position.x + 0.9 * this.game.paddle.width
      ) {
        this.speed.x = this.speed.x * speedBonus2;
        this.speed.y = -this.speed.y * speedBonus2;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }

      if (
        this.position.x >=
          this.game.paddle.position.x + this.game.paddle.width * 0.9 &&
        this.position.x <= this.game.paddle.position.x + this.game.paddle.width
      ) {
        this.speed.x = this.speed.x * speedBonus3;
        this.speed.y = -this.speed.y * speedBonus3;
        this.position.y = this.game.paddle.position.y - this.size;
        this.direction = -1;
      }
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
