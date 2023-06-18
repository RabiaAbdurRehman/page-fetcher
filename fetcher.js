const fs = require('fs');
const request = require('request');
const readline = require('readline');
const url = process.argv[2];
const filePath = process.argv[3];
/*
The readline module in NodeJS provides
you with a way to read data stream from a
file or ask your user for an input.
 It allows the reading of input stream
 line by line and wraps up the process
 standard output
and process standard input objects.
*/
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fetcherFtn = function(url, filePath) {
    request(url, (error, response, body) => {
        console.log("connecting.....");
        if (error) {//1. typing error, 2. computer is not connected, 3. server took longer, 4.statuscode more than 200
            console.error(error);
            return;
        }
        if (response.statusCode !== 200) {
            console.error(`Request failed with status code ${response.statusCode}`);
            return;
        }
        if (!filePath) {
            console.error(`${filePath} is invalid`);
            return;
        }
        fs.writeFile(filePath, body, (error) => {
            if (error) {
                console.error(error);
                return;
            } else {
                console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
            }
        });
    });
};
if (fs.existsSync(filePath)) {
    r1.question(`Would you like to overwrite current ${filePath}? Enter "Y" or "ctrl+z" to exit.`, (answer) => {
        if (answer !== "Y") {
            process.exit();//doesnt want to overwrite.
        } else {
            fetcherFtn(url, filePath);//overwrite.
        }
    });
} else {
    fetcherFtn(url, filePath);//make the file.
}


