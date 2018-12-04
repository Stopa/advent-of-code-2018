const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, 'utf8', (error, data) => {
  const ids = data.split('\n').filter(a => a !== '');

  let twoCount = 0;

  let threeCount = 0;

  ids.forEach((id) => {
    const letters = id.split('');

    const letterCounts = letters.map(letter => letters.filter(l => l === letter).length);

    if (letterCounts.indexOf(2) >= 0) {
      twoCount += 1;
    }

    if (letterCounts.indexOf(3) >= 0) {
      threeCount += 1;
    }
  });

  console.log(`Checksum is: ${twoCount * threeCount}`);

  function distance(a, b) {
    return a.split('').reduce((total, letter, index) => (b[index] === letter ? total : total + 1), 0);
  }

  ids.forEach((id) => {
    ids.forEach((id2) => {
      if (distance(id, id2) === 1) {
        const similarity = id.split('').filter((letter, index) => id2[index] === letter);
        console.log(`Suitable IDs: \n${id}, \n${id2}`);
        console.log(`${similarity.join('')}`);
      }
    });
  });
});
