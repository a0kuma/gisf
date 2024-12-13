const fs = require('fs');
const pdf = require('pdf-parse');

/*const findWordInPDF = async (filePath, word) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    const pages = data.text.split('\n\n');
    const pageNumbers = [];
    var theWords=""
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].includes(word)) {
            pageNumbers.push(i);
            theWords+=pages[i];
        }
    }
    return {p:pageNumbers,w:theWords}; // Return array of page numbers
};*/

const filePath = 'a.pdf';
const word = '品項目次';

/*findWordInPDF(filePath, word).then((o) => {
    if (o.p.length > 0) {
        console.log(`The word '${word}' was found on pages: ${o.p.join(', ')}.`);
        console.log(o.w);
    } else {
        console.log(`The word '${word}' was not found in the document.`);
    }
}).catch(err => {
    console.error('Error reading PDF:', err);
});*/

/*const getBookmarks = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    console.log(data);
    return data.outline;
};

getBookmarks(filePath).then((bookmarks) => {
    if (bookmarks && bookmarks.length > 0) {
        console.log('Bookmarks:', bookmarks);
    } else {
        console.log('No bookmarks found in the document.');
    }
}).catch(err => {
    console.error('Error reading PDF bookmarks:', err);
});*/

//const findWordInPDF = async (filePath, word) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    const pages = data.text.split('\n\n');
    const pageNumbers = [];
    var theWords=""
    for (let i = 156; i <= 160; i++) {
        if (pages[i].includes(word)) {
            pageNumbers.push(i);
            theWords+=pages[i];
        }
    }
    //return {p:pageNumbers,w:theWords}; // Return array of page numbers
//};

console.log(theWords);  