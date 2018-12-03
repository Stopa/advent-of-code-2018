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
});
