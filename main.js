let cheerio = require('cheerio')
let fs = require('fs');
let axios = require('axios');

let html = fs.readFileSync('index.html');
console.log(html);

axios.get('https://en.wikipedia.org/wiki/Set_(deity)')
.then(function (response) {
    //console.log(response.data);
    fs.writeFile("index.html", response.data, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
    let $ = cheerio.load(fs.readFileSync('index.html'));
    let jsonframe = require('jsonframe-cheerio');
    jsonframe($) // initializing the plugin
    
    let frame = {
        "allA": {
            "_s": "p",
            "_d": [{
                "link": "a | left(5)"
            }]
     } // this is an inline selector
    }
    
    console.log( $('html').scrape(frame, { string: true } ));
})
.catch(function (error) {
  console.log(error);
});


