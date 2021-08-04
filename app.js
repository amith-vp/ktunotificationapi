const express = require('express')
const app = express()
const port =(process.env.PORT || 3000);
const scrapper = require('./scrapper');
const fs = require('fs');
const dataPath = 'notifications.json';


scrapper.fetch()

setInterval(() => {
  scrapper.fetch()
}, 300000);

var expressGoogleAnalytics = require('express-google-analytics');
 
// Insert your Google Analytics Id, Shoule be something like 'UA-12345678-9'
var analytics = expressGoogleAnalytics('G-GT5SR5CWPR');
 
//Add to express before your routes
app.use(analytics);


app.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
