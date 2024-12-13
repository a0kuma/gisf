const imageSearch = require('image-search');

const options = {
  query: 'bear',
  limit: 1,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

imageSearch.search(options)
  .then(images => {
    console.log('First image result:', images[0]);
  })
  .catch(error => {
    console.error('Error:', error);
  });
