const fs = require('fs');

// Read the file
fs.readFile('or.txt', 'utf8', (err, data) => {
    if (err) throw err;

    // Split the file into lines
    const lines = data.split('\n');
    const filteredLines = [];

    // Process each line
    lines.forEach(line => {
        if (line.includes('部')) {
            console.log(line);
        } else {
            filteredLines.push(line);
        }
    });

    // Save the filtered lines to a new file
    fs.writeFile('or1.txt', filteredLines.join('\n'), (err) => {
        if (err) throw err;
        console.log('File has been saved as or1.txt');
    });
});