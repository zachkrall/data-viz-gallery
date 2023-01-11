import 'https://d3js.org/d3.v7.min.js';

// Incoming data
const data = [
  'yellow', 'blue',   'blue',   'yellow', 'yellow', 'yellow', 'yellow',
  'blue',   'red',    'blue',   'blue',   'blue',   'yellow', 'red',
  'blue',   'blue',   'red',    'yellow', 'blue',   'blue',   'yellow',
  'blue',   'blue',   'red',    'yellow', 'red',    'yellow', 'yellow',
  'yellow', 'red',    'red',    'blue',   'red',    'red',    'yellow',
  'red',    'red',    'blue',   'yellow', 'yellow', 'yellow', 'blue',
  'blue',   'blue',   'yellow', 'blue',   'blue',   'red',    'red',
  'yellow', 'red',    'yellow', 'blue',   'red',    'yellow', 'blue',
  'red',    'yellow', 'red',    'yellow', 'blue',   'red',    'red',
  'yellow', 'red',    'red',    'red',    'yellow', 'red',    'blue',
  'blue',   'blue',   'red',    'red',    'blue',   'blue',   'red',
  'red',    'blue',   'red',    'red',    'blue',   'yellow', 'yellow',
  'yellow', 'red',    'yellow', 'blue',   'red',    'yellow', 'blue',
  'blue',   'blue',   'red',    'blue',   'blue',   'yellow', 'red',
  'blue',   'red'
];

const iconMap = {
  'red':    '🔴',
  'blue':   '🔵',
  'yellow': '🟡'
}

const chart = d3.select('#chart')

const cleanedData = d3.rollup(data, v => v.length, d => d)

const dataResults = d3.select('#dataset')
  .append('code')
  .append('pre')
  .style('display', 'block')
  .style('width', '100%')
  .style('min-height', '10rem')
  .text(JSON.stringify(Object.fromEntries(cleanedData), null, 4))


chart
  .append('table')
  .selectAll('tr')
  .data(cleanedData)
  .join('tr')
  .call(row => {
    row.append('td').text(d => d[0])
  })
  .call(row => {
    row
    .append('td')
    .selectAll('span')
    .data(d => Array.from({length: d[1] }).map(() => d[0]))
    .join('span')
    .text(d => iconMap[d])
  })