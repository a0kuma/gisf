const fs = require('fs');

let newMain;
fs.readFile('medWorganv5.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    newMain = JSON.parse(data);

    newMain.forEach(item => {
       if(item.organ.length===0){
              console.log(item.context);
       }
    });
});