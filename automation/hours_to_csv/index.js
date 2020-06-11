const axios = require('axios');
const { PROJECT_URL } = require('./config');

const mapToCSVRow = (projects) => {
  return projects.map(project => {
    let date = new Date(project.createdAt);
    date = date.toString()
      .split(' ')
      .slice(0, 3)
      .join(' ');

    let hours = project.tasks
      .map(t => t.recordedTime)
      .reduce((a, b) => a + b, 0) / 3600;

    return { date, hours }
  });
};

const makeSumFormulaRow = (numRows) => {
  let formulaStr = `=sum(b2:b${numRows +1})`;
  return { date: 'Total', hours: formulaStr }
}

const writeRows = (rows) => {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './hours.csv',
    header: [
      { id: 'date', title: 'Date' },
      { id: 'hours', title: 'Hours' }
    ]
  });

  csvWriter.writeRecords(rows)
    .then(() => {
      console.log('...Done');
    });
};


const main = async () => {
  const { data } = await axios(PROJECT_URL);
  let rows = mapToCSVRow(data.projects);
  const lastRow = makeSumFormulaRow(rows.length)
  rows = [...rows, lastRow];
  writeRows(rows)
};

main();

