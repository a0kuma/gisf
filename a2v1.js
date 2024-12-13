const fs = require('fs');
const crypto = require('crypto');
function hashString(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}
fs.readFile('2v1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const jsonArray = JSON.parse(data);
        jsonArray.forEach(o => {
            if (o.lng === 0 && o.lat === 0) {
                 const hashedMuti =hashString(o.muti);
                 o['hash'] =hashedMuti;
            }else{
                const hashedMuti =hashString(o.lat + o.lng);
                o['hash'] =hashedMuti;
            }
        });

        fs.writeFile('2v3.json', JSON.stringify(jsonArray), err => {
            if (err) {
                console.error('Error writing file:', err);
            }
        });
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});