const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

/*{"id":1,"name":"玉泉","lat":64.02393502,"lng":6.328126,"text":"味甘平。主治五臟百病。柔筋強骨、安魂魄、長肌肉、益氣，久服耐寒暑，不饑渴，不老神仙。人臨死服五斤，死三年色不變。一名玉札。","url":"https://example.com","img":"https://upload.wikimedia.org/wikipedia/en/4/48/Blank.JPG","markerColor":"#ddb98b","markerLine":1,"markerSize":18,"markerIconChar":"🌱","muti":"心、肝、脾、肺、腎","exp":"na","hash":"f1534392279bddbf9d43dde8701cb5be14b82f76ec6607bf8d6ad557f60f304e","organ":"[\"五臟\",\"骨\",\"筋\",\"肌肉\"]"}*/
const inputFilePath = path.join(__dirname, 'medCv3.json');
const outputFilePath = path.join(__dirname, 'medCv5.tsv');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const json2tsv = new Parser({ delimiter: '\t' });
        let tsv = json2tsv.parse(jsonData);

        fs.writeFile(outputFilePath, tsv, 'utf8', (err) => {
            if (err) {
                console.error('Error writing the CSV file:', err);
                return;
            }
            console.log('CSV file has been saved.');
        });
    } catch (err) {
        console.error('Error parsing JSON data:', err);
    }
});