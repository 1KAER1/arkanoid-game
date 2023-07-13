import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import { buildLevel, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.balls = [];
    new InputHandler(this.paddle, this);

    this.lives = 3;
    this.score = 0;
    this.destroyedB = 0;
    this.scoreBonus2 = false;
    this.scoreBonus5 = false;
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    ) {
      return;
    }

    this.bricks = buildLevel(this, level2);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  restart() {
    if (
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.MENU
    ) {
      this.lives = 3;
      this.score = 0;
      this.gamestate = GAMESTATE.MENU;
      this.start();
    }
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.lives++;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gamestate === GAMESTATE.RUNNING) {
      ctx.font = "30px Germania One";
      ctx.fillStyle = "rgba(227, 163, 36,.95)";
      ctx.textAlign = "center";
      ctx.fillText("Score: " + this.score, 60, 30);

      ctx.font = "30px Germania One";
      ctx.fillStyle = "rgba(252, 65, 3,.95)";
      ctx.textAlign = "center";
      ctx.fillText("Lives: " + this.lives, this.gameWidth / 2 - 20, 30);
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "60px Germania One";
      ctx.fillStyle = "rgba(255, 255, 255,1)";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);

      ctx.font = "30px Germania One";
      ctx.fillStyle = "rgba(227, 163, 36,.5)";
      ctx.textAlign = "center";
      ctx.fillText("Score: " + this.score, 60, 30);

      ctx.font = "30px Germania One";
      ctx.fillStyle = "rgba(252, 65, 3,.5)";
      ctx.textAlign = "center";
      ctx.fillText("Lives: " + this.lives, this.gameWidth / 2 - 20, 30);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(190,190,210,1)";
      ctx.fill();

      ctx.font = "60px Germania One";
      ctx.fillStyle = "rgba(55, 84, 99,1)";
      ctx.textAlign = "center";
      ctx.fillText("ARKANOID", this.gameWidth / 2, 100);

      ctx.font = "30px Germania One";
      ctx.fillText(
        "Use arrows to move left and right",
        this.gameWidth / 2,
        200
      );
      ctx.fillText(
        "Destroying 1 block grants you 1 point",
        this.gameWidth / 2,
        250
      );
      ctx.fillText(
        "Silver blocks have a chance to drop special bonuses",
        this.gameWidth / 2,
        350
      );
      ctx.fillText("Press SPACEBAR to start the game", this.gameWidth / 2, 500);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "80px Times New Roman";
      ctx.fillStyle = "rgba(79, 0, 1,1)";
      ctx.textAlign = "center";
      ctx.fillText("YOU DIED", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "30px Germania One";
      ctx.fillText("Press SPACEBAR to start again!", this.gameWidth / 2, 450);
    }
  }

  checkBBricks() {
    this.destroyedB++;
    if (this.destroyedB === 5) {
      this.balls.push(new Ball(this));
      this.balls.forEach((ball) => {
        ball.reset();
      });
      console.log("Spawn new ball");
    }
  }

  bonus() {
    let randomBonus = randomInt(1, 5);
    //let randomBonus = 3;
    switch (randomBonus) {
      case 1:
        console.log("x5");

        this.bricks.forEach((brick) => {
          brick.scoreBonus5 = true;
          console.log("Score bonus: " + brick.scoreBonus5);
          setTimeout(function () {
            brick.scoreBonus5 = false;
            console.log("TIMEOUT x5");
          }, 5000);
        });
        break;
      case 2:
        console.log("x2");

        this.bricks.forEach((brick) => {
          brick.scoreBonus2 = true;
          setTimeout(function () {
            brick.scoreBonus2 = false;
            console.log("TIMEOUT x2");
          }, 5000);
        });
        break;
      case 3:
        console.log("larger pad");

        this.paddle.width = this.paddle.width + this.paddle.width * 0.2;

        this.bricks.forEach((brick) => {
          setTimeout(function () {
            brick.game.paddle.width = 150;
            console.log("TIMEOUT largePad");
          }, 5000);
        });

        break;
      case 4:
        console.log("smaller pad");

        this.paddle.width = this.paddle.width - this.paddle.width * 0.2;

        this.bricks.forEach((brick) => {
          setTimeout(function () {
            brick.game.paddle.width = 150;
            console.log("TIMEOUT smallPaddle");
          }, 5000);
        });

        break;
      case 5:
        console.log("switch movement");
        //switch movement
        break;
      default:
        break;
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
