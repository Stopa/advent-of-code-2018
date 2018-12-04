const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/testinput.txt`, 'utf8');

const stupidTimeRegex = /\[(.{4})-(.{2})-(.{2}) (.{2}):(.{2})\]/;

function parseDate(row) {
  const [, year, month, day, hour, minute] = row.match(stupidTimeRegex);

  return new Date(year, month, day, hour, minute);
}

const lines = data.split('\n').filter(a => a !== '').sort((a, b) => parseDate(a) - parseDate(b));

const guards = {};

let currentGuard;
let prevTime;

lines.forEach((line) => {
  if (line[19] === 'G') {
    // Guard begins shift
    [, currentGuard] = line.match(/#(\S+)/);

    if (!guards[currentGuard]) {
      // eslint-disable-next-line
      guards[currentGuard] = { minutes: Array.apply(null, {length: 60}), total: 0};
    }
  } else if (line[19] === 'f') {
    // guard falls asleep
    prevTime = parseDate(line);
  } else {
    // guard wakes up
    const wakeUpTime = parseDate(line);

    for (let i = prevTime.getMinutes(); i < wakeUpTime.getMinutes(); i += 1) {
      guards[currentGuard].minutes[i] = (guards[currentGuard].minutes[i] || 0) + 1;
      guards[currentGuard].total += 1;
    }
  }
});

// TODO: works okay with test input, but not with MY input

const sleepyhead = Object.entries(guards)
  .reduce((prev, curr) => (curr[1].total > prev[1].total ? curr : prev));

const sleepytime = sleepyhead[1].minutes.indexOf(
  sleepyhead[1].minutes.reduce((max, curr) => (curr === undefined || max > curr ? max : curr)),
);

console.log(`Guard number ${sleepyhead[0]} slept the most and they slept the most during minute ${sleepytime}`);
