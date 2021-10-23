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
            //var filteredData = parsedData.slice(i => i.id !== id);
            // trying to get the ids to work but can only get it to delete all
            var filteredData = parsedData.pop();
            writeToFile(file, filteredData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };