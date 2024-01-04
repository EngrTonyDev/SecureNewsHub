
const xml2js = require('xml2js');
const axios = require('axios');
const News = require('../models/news');

// Define the URL of the XML feed to fetch
const XML_FEED_URL = 'http://www.example.com/feed.xml';

// Define the URL of the API endpoint to save the news to
const SAVE_NEWS_URL = 'http://localhost:4000/news';

// Fetch the XML feed and parse it using xml2js
axios.get(XML_FEED_URL)
  .then(response => {
    xml2js.parseString(response.data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        // Extract the relevant data from the parsed XML object
        const title = result.rss.channel[0].item[0].title[0];
        const description = result.rss.channel[0].item[0].description[0];
        const permanlink = result.rss.channel[0].item[0].link[0];
        const date = new Date(result.rss.channel[0].item[0].pubDate[0]);
        const category = result.rss.channel[0].item[0].category.map(c => ({ name: c }));
        const user = { /* Define the user data */ };
        const source = { /* Define the source data */ };
        const tags = { /* Define the tags data */ };
        const imagen = result.rss.channel[0].item[0].description[0].match(/src="([^"]*)"/)[1];

        // Create a new instance of the News model with the extracted data
        const news = new News({
          title,
          description,
          permanlink,
          date,
          category,
          user,
          source,
          tags,
          imagen
        });

        // Save the news to the database
        axios.post(SAVE_NEWS_URL, news)
          .then(response => {
            console.log('News saved:', response.data);
          })
          .catch(error => {
            console.error('Error saving news:', error);
          });
      }
    });
  })
  .catch(error => {
    console.error('Error fetching XML feed:', error);
  });