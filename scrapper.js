const fs = require('fs')
const axios = require('axios');
const https = require('https'); // Import the 'https' module

const apiUrl = 'https://api.ktu.edu.in/ktu-web-portal-api/anon/announcemnts';

const requestData = {
  number: 0,
  searchText: '',
  size: 10,
};

const config = {
  headers: {
    'Accept': 'application/json, text/plain, */*',

  },
  referrer: 'https://www.ktu.edu.in/',
  referrerPolicy: 'strict-origin-when-cross-origin',
  method: 'post',
  data: requestData,
  url: apiUrl,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Bypass SSL certificate verification
  }),
};

async function fetchData() {
  try {
    const response = await axios(config);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = response.data;
    if (jsonData && jsonData.content) {
      const notifications = [];

      jsonData.content.slice(0, 10).forEach((item) => {
        const date = item.announcementDate;
        const title = item.subject;
        const description = item.message;

        // Extract attachment information
        const attachmentList = item.attachmentList;
        const links = [];

        attachmentList.forEach((attachment) => {
          const url_title = attachment.title;
          const url = `https://www.ktu.edu.in/Menu/announcements`; // Modify the URL as needed

          links.push({
            url_title,
            url,
          });
        });

        const notification = {
          date,
          title,
          description,
          links,
        };

        notifications.push(notification);
      });

      // Create the result object
      const result = {
        last_updated: new Date().toISOString(),
        is_ktusite_online: true, // You can set this value based on your logic
        notifications,
      };

      // Save the result to notifications.json
      fs.writeFileSync('./notifications.json', JSON.stringify(result, null, 2), 'utf8');
    } else {
      // Handle the case where there's no content in the JSON data
      console.log('No content found in JSON data.');
    }

    // You can manipulate or extract information from 'data' as needed

  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch and process the data
module.exports = {
  fetchData,
};