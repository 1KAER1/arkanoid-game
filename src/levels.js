import Brick from "/src/brick";

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 70 * brickIndex + 50,
          y: 70 + 25 * rowIndex
        };
        let type = 1;
        let image = document.getElementById("brick");
        bricks.push(new Brick(game, position, type, image));
      } else if (brick === 2) {
        let position = {
          x: 70 * brickIndex + 50,
          y: 70 + 25 * rowIndex
        };
        let type = 2;
        let image = document.getElementById("brickB");
        bricks.push(new Brick(game, position, type, image));
      }
    });
  });

  return bricks;
}

export const level2 = [
  [
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3)
  ],
  [
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3)
  ],
  [
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3),
    randomInt(1, 3)
  ]
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
