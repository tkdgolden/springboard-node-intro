const fs = require('fs');
const axios = require('axios');
const input = process.argv[2];
var urlRE = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

function cat(input) {
    if (urlRE.test(input)) {
        webCat(input);
    }
    else {
        fs.readFile(input, "utf8", function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log('file contents: ' + data);
        })
    
        console.log('reading file');
    }
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    }
    catch (error) {
        console.log("Error fetching " + url + " : " + error.code);
    }
}

cat(input);