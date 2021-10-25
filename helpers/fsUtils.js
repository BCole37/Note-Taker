const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

// write file to JSON object from miniproject
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

// reads edits and pushes from miniproject
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// reads the file and deletes anything with mathcing id
const readAndDelete = (file, id) => {
    fs.readFile(file, 'utf8', (err, data) => {
        console.log(id)
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            // takes out the id from the parsedData
            parsedData.splice(id,1);

             writeToFile(file, parsedData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };