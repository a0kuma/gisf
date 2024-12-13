const fs = require('fs');
const crypto = require('crypto');
var filename = 'medWorganv9.json';
var filename2 = '2v3.json';
let ddb;
var newM = [];
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.readFile("prise.json", 'utf8', (err0, dpa) => {
        if (err0) {
            console.error(err0);
            return;
        }
        var dpap = JSON.parse(dpa);
        ddb = JSON.parse(data);
        fs.readFile(filename2, 'utf8', (err2, data2) => {
            if (err2) {
                console.error(err2);
                return;
            }
            ddb2 = JSON.parse(data2);
            var itt = 0;
            ddb.forEach(item => {
                var fd={
                    "name": "na",
                    "price": "1"
                  };
                dpap.forEach(da => {
                        if (da.name === item.name) {
                            fd = da;
                            console.log(da);
                        }
                    });
                item.organ.forEach(ioio => {
                    var found;
                    ddb2.forEach(ilo => {
                        if (ilo.name === ioio) {
                            found = ilo;
                        }
                    });
                    // console.log(ioio,found);
                    if (found.muti === 'na') {
                        itt++;
                        newM.push({
                            'id': itt,
                            'name': item.name,
                            'lat': Number(found.lat) + itt / 100000.0,
                            'lng': Number(found.lng) + itt / 100000.0,
                            'text': item.context,
                            'url': `https://a0kuma.github.io/gisf/b.html#${(parseInt(fd.price)).toString().padStart(3, '0')}`,
                            'img': `https://a0kuma.github.io/gisf/imgs/${item.name}中藥.jpg`,
                            'markerColor': '#ddb98b',
                            'markerLine': 1,
                            'markerSize': 18,
                            'markerIconChar': '🌱',
                            'muti': found.muti, 'exp': found.exp, 'hash': found.hash, 'organ': JSON.stringify(item.organ)
                        });
                    } else {
                        found.muti.split('、').forEach(mutiItem => {
                            itt++;
                            var found2 = ddb2.find(element => element.name === mutiItem);
                            // console.log(mutiItem, found2);
                            newM.push({
                                'id': itt,
                                'name': item.name,
                                'lat': Number(found2.lat) + itt / 100000.0,
                                'lng': Number(found2.lng) + itt / 100000.0,
                                'text': item.context,
                                'url': `https://a0kuma.github.io/gisf/b.html#${(parseInt(fd.price)).toString().padStart(3, '0')}`,
                                'img': `https://a0kuma.github.io/gisf/imgs/${item.name}中藥.jpg`,
                                'markerColor': '#ddb98b',
                                'markerLine': 1,
                                'markerSize': 18,
                                'markerIconChar': '🌱',
                                'muti': found.muti, 'exp': found.exp, 'hash': found.hash, 'organ': JSON.stringify(item.organ)
                            });
                        });
                    }

                });
            });
            fs.writeFile('medCv8.json', JSON.stringify(newM), err => {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
});