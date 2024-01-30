const fs = require('fs');
const axios = require('axios');
var input = null;
const urlRE = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
var output = null;

function parse() {
    if (process.argv[2] === '--out') {
        input = process.argv[3];
        output = process.argv[4];
        if (urlRE.test(input)) {
            webCat(input);
        }
        else {
            cat(input);
        }
    }
    else {
        input = process.argv[2];
        if (urlRE.test(input)) {
            webCat(input);
        }
        else {
            cat(input);
        }
    }
}

function cat(file) {
    fs.readFile(file, "utf8", function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        write(data);
    });
}

function write(text) {
    if (process.argv[2] === '--out') {
        fs.writeFile(output, text, "utf8", function(err) {
            if (err) {
                console.error(err);
                process.exit(2);
            }
        });
    }
    else {
        console.log(text);
    }

}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        write(response.data);
    }
    catch (error) {
        console.log("Error fetching " + url + " : " + error.code);
    }
}

parse();