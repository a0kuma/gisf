let request = require('request');
let fs = require('fs');
let path = require('path');
var ok={};

const downloadImage = (imageUrl, imageStream, imageName, body) => {
    return new Promise((resolve, reject) => {
        request(imageUrl)
            .on('error', function (err) {
                console.error('Request error:', err);
                reject(err);
            })
            .pipe(imageStream)
            .on('close', function () {
                console.log('Image downloaded:', imageName);

                let textFileName = './urlog/' + body.queryContext.originalQuery + '.txt';
                try {
                    fs.writeFileSync(textFileName, imageUrl, 'utf8');
                    console.log('Text file saved:', textFileName);
                    ok[body.queryContext.originalQuery] = true;
                    resolve();
                } catch (err) {
                    console.error('File write error:', err);
                    reject(err);
                }
            });
    });
};

async function qq(st, tf) {
    if (tf === true) {
        st.shift();
        if (st.length === 0) {
            console.log('No query string!');
            return;
        }
    }
    var query = st[0]+'中藥';
    let subscriptionKey = ///////////////////////////////////////////////////////////
    let endpoint = 'https://api.bing.microsoft.com/v7.0/images/search';

    let mkt = 'zh-TW'

    let request_params = {
        method: 'GET',
        uri: endpoint,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        qs: {
            q: query,
            mkt: mkt
        },
        json: true
    }

    request(request_params, async function (error, response, body) {

        if (!response || response.statusCode !== 200) {
            console.log(`${query} 404!`);
            qq(st, false);
            return;
        }
        for (let o of body.value) {
            if(!ok[query]){
            try {
                let imageUrl = o.contentUrl;
                let imageName = './imgs/' + body.queryContext.originalQuery + path.extname(imageUrl);
                if (path.extname(imageUrl).toLowerCase() !== '.jpg') {
                    console.log('Image is not a JPG file, skipping:', imageUrl);
                    continue;
                }
                let imageStream = fs.createWriteStream(imageName);

                imageStream.on('error', function (err) {
                    console.error('Image stream error:', err);
                });

                await downloadImage(imageUrl, imageStream, imageName, body);
            } catch (err) {
                console.error('Failed to download image:', err);
            }}
        }
        qq(st, true);
    });
}

fs.readFile('newMainv4.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let ddb = JSON.parse(data);
    let names = [];
    for (let o of ddb) {
        names.push(o.name);
    }
    console.log(names);
    let index = names.indexOf('蘭草');
    if (index !== -1) {
        names = names.slice(index);
    } else {
        console.log('蘭草 not found in the list');
        return;
    }
    qq(names, false);
});
