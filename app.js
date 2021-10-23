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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


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
