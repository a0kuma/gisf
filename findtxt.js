const fs = require('fs');
const path = require('path');

const directoryPath = '.';
const searchTerm = 'Organs';

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.log('Unable to read file: ' + err);
            }

            if (data.includes(searchTerm)) {
                console.log(`Found "${searchTerm}" in file: ${file}`);
            }
        });
    });
});