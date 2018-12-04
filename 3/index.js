const fs = require('fs');
const { createCanvas } = require('canvas');

const c = createCanvas(1000, 1000);
const ctx = c.getContext('2d');

ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

const out = fs.createWriteStream(`${__dirname}/result.png`);

const data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

const cuts = data.split('\n').filter(a => a !== '');

cuts.forEach((cut) => {
  const [id, sep, coords, size] = cut.split(' ');

  const [x, y] = coords.substring(0, coords.length - 1).split(',');

  const [width, height] = size.split('x');

  ctx.fillRect(x, y, width, height);
});

const stream = c.createPNGStream();

stream.pipe(out);

out.on('finish', () => console.log('The PNG file was created.'))
