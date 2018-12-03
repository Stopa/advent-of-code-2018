const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const changes = data.split('\n').map(a => parseInt(a, 10)).filter(a => !Number.isNaN(a));

  const results = {};

  let latestResult = 0;

  let foundAnswers = 0;

  for (let i = 0; ; i += 1) {
    const currentChange = changes[i % changes.length];

    const currentResult = latestResult + currentChange;

    if (results[currentResult]) {
      console.log(`Frequency found twice: ${currentResult}`);
      foundAnswers += 1;
    }

    results[currentResult] = true;
    latestResult = currentResult;

    if (i === changes.length - 1) {
      console.log(`Frequency after one cycle of given changes: ${currentResult}`);
      foundAnswers += 1;
    }

    if (foundAnswers === 2) {
      break;
    }
  }
});
