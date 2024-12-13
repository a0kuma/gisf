const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, '2.csv');
const jsonFilePath = path.join(__dirname, '2v1.json');

const results = [];

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2), 'utf8');
        console.log('CSV file successfully processed and saved as JSON.');
    });