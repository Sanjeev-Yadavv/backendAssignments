const fs = require('fs');

const operation = process.argv[2];
const fileName = process.argv[3];
const content = process.argv[4];

switch (operation) {
    case 'read':
        readFile(fileName);
        break;
    case 'delete':
        deleteFile(fileName);
        break;
    case 'create':
        createFile(fileName);
        break;
    case 'append':
        appendToFile(fileName, content);
        break;
    case 'rename':
        renameFile(fileName, content); // Assuming new name is passed as content
        break;
    case 'list':
        listFiles(fileName); // Assuming directory path is passed as fileName
        break;
    default:
        console.log(`Invalid operation '${operation}'`);
}

function readFile(file) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Error reading file: ${err}`);
            return;
        }
        console.log(data);
    });
}

function deleteFile(file) {
    fs.unlink(file, (err) => {
        if (err) {
            console.log(`Error deleting file: ${err}`);
            return;
        }
        console.log(`File '${file}' deleted successfully`);
    });
}

function createFile(file) {
    fs.writeFile(file, '', (err) => {
        if (err) {
            console.log(`Error creating file: ${err}`);
            return;
        }
        console.log(`File '${file}' created successfully`);
    });
}

function appendToFile(file, content) {
    fs.appendFile(file, `${content}\n`, (err) => {
        if (err) {
            console.log(`Error appending data to file: ${err}`);
            return;
        }
        console.log(`Content appended to file '${file}' successfully`);
    });
}

function renameFile(file, newName) {
    fs.rename(file, newName, (err) => {
        if (err) {
            console.log(`Error renaming file: ${err}`);
            return;
        }
        console.log(`File '${file}' renamed to '${newName}' successfully`);
    });
}

function listFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(`Error listing directory: ${err}`);
            return;
        }
        files.forEach(file => {
            console.log(file);
        });
    });
}
