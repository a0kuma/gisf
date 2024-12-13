var filename = 'medWorganv9.json';
fs.writeFile(filename, JSON.stringify(newMain), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    let newMain;
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        newMain = JSON.parse(data);

        newMain.forEach(item => {
            if (item.organ.length === 0) {
                console.log(item.context);
            }
        });
    });
});