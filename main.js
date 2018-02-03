let cheerio = require('cheerio')
let fs = require('fs');
let Axios = require('axios');

let html = fs.readFileSync('index.html');
console.log(html);

Axios.request({
    url: "https://profile.intra.42.fr/",
    method: "get",
    headers:{
        Cookie: "_ga=GA1.2.1588442885.1515590264; _gid=GA1.2.255568917.1517651650; _intra_42_session_production=396271511d1ff247f1d81fc3bf864acb; user.id=MjE3NTQ%3D--84366a41c9fce9f88dc8dd3276e599a58f441047"
    } 
})
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
        "level": ".on-progress"
    }
    
    console.log( $('html').scrape(frame, { string: true } ));
})
.catch(function (error) {
  console.log(error);
});


