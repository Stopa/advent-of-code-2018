const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

const cuts = {};

let xMax = 0;

let yMax = 0;

data.split('\n').filter(a => a !== '').forEach((cut) => {
  const [id, , coords, size] = cut.split(' ');

  const [x, y] = coords.substring(0, coords.length - 1).split(',').map(a => parseInt(a, 10));

  const [w, h] = size.split('x').map(a => parseInt(a, 10));

  const currentXMax = x + w;
  const currentYMax = y + h;

  if (currentXMax > xMax) {
    xMax = currentXMax;
  }

  if (currentYMax > yMax) {
    yMax = currentYMax;
  }

  cuts[id] = {
    x, y, w, h,
  };
});

const SQUARE_STATUS = {
  EMPTY: undefined,
  FILLED: 1,
  OVERLAPPING: 2,
};

/*
 Suppressing ESLint because it wants me to use Array(...{ length: yMax}), but whines that it's
 non-iterable
*/
// eslint-disable-next-line
const canvas = Array.apply(null, { length: yMax }).map(() => Array.apply(null, { length: xMax }));

let overlapping = 0;

Object.values(cuts).forEach((cut) => {
  for (let { y } = cut; y < cut.y + cut.h; y += 1) {
    for (let { x } = cut; x < cut.x + cut.w; x += 1) {
      if (canvas[y][x] === SQUARE_STATUS.EMPTY) {
        canvas[y][x] = SQUARE_STATUS.FILLED;
      } else if (canvas[y][x] === SQUARE_STATUS.FILLED) {
        canvas[y][x] = SQUARE_STATUS.OVERLAPPING;
        overlapping += 1;
      }
    }
  }
});

console.log(`Overlapping space: ${overlapping} square whatevers`);
