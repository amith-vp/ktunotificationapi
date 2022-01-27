const fs = require('fs');

const tabletojson = require('tabletojson').Tabletojson;
const jsonfile= require('./notifications.json');

const ktu_url = "https://www.ktu.edu.in/eu/core/announcements.htm";
let is_ktusite_online = null;
let limit = 10  // fetch last 10 notifications announcement page 
module.exports = {
  fetch: function () {

    try {
      tabletojson.convertUrl(
        ktu_url, {
          limitrows: limit, 
          stripHtmlFromCells: false
        },
        function (tablesAsJson) {
          if (tablesAsJson.length === 0) { //check site offline 
            console.log("KTU Site Down");
            jsonfile.is_ktusite_online=false;
            fs.writeFile('notifications.json', JSON.stringify(jsonfile), function writeJSON(err) {
              if (err) return console.log(err);
            });
    
            return;
          }
          const notifications = [];
    
          is_ktusite_online = true;
    
          for (let k = 0; k < limit; k++) { 
    
            const links = [];
            let description;
            const notificationTime = JSON.stringify(tablesAsJson[0][k][0]).replace(/\\t|\\n|<p>|  /g, '');
            const notificationData = JSON.stringify(tablesAsJson[0][k][1]).replace(/\\t|\\n|<p>|  /g, '');
    
    
            let date = getFromBetween.get(notificationTime, "<strong>", "</strong>")[0];
            let title = getFromBetween.get(notificationData, "<b>", "</b>")[0].replace(/&amp;/g, '&');
            let desc = getFromBetween.get(notificationData, "</b>", "<!-- </a> -->")[0];
            if (desc) description = desc.replace(/<\/p>|<br>/g, ' ')
            let link = getFromBetween.get(notificationData, "<a href=\\\"", "</a>");
    
    
    
            link.forEach(element => {
              try {
    
                url = "https://ktu.edu.in/eu" + getFromBetween.get(element, "/eu", "\\\"")[0].replace(/&amp;/g, '&').replace(/ /g,"%20");
                url_title = "" + getFromBetween.get(element, "><b>", "</b>");
                const urlData = {
                  url_title,
                  url,
                };
                links.push(urlData);
              } catch (error) {
                console.log(error);
                return;
    
              }
    
    
            });
            const notification = {
              date,
              title,
              description,
              links
    
            };
            notifications.push(notification);
    
          }
          let last_updated = new Date().toISOString();
          // var last_updated = new Date(new Date()-3600*1000*3).toISOString(); 
             const apidata = {
            last_updated,
            is_ktusite_online,
            notifications
          };
          const jsonContent = JSON.stringify(apidata);
    
    
          fs.writeFileSync("./notifications.json", jsonContent, 'utf8', function (err) {
            if (err) {
              return console.log(err);
            }
    
            console.log("The file was saved!");
          });
      
        }
      );
    
    } catch (error) {
      console.log(error);
      return;
    }
  }
};






var getFromBetween = {
  results: [],
  string: "",
  getFromBetween: function (sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
    var SP = this.string.indexOf(sub1) + sub1.length;
    var string1 = this.string.substr(0, SP);
    var string2 = this.string.substr(SP);
    var TP = string1.length + string2.indexOf(sub2);
    return this.string.substring(SP, TP);
  },
  removeFromBetween: function (sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
    var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
    this.string = this.string.replace(removal, "");
  },
  getAllResults: function (sub1, sub2) {
    // first check to see if we do have both substrings
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

    // find one result
    var result = this.getFromBetween(sub1, sub2);
    // push it to the results array
    this.results.push(result);
    // remove the most recently found one from the string
    this.removeFromBetween(sub1, sub2);

    // if there's more substrings
    if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
      this.getAllResults(sub1, sub2);
    } else return;
  },
  get: function (string, sub1, sub2) {
    this.results = [];
    this.string = string;
    this.getAllResults(sub1, sub2);
    return this.results;
  }
};
