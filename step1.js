const fs = require('fs');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('file contents: ' + data);
    })

    console.log('reading file');
}


cat(argv[2]);