const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');


const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, 'src','access.log'),{flags: 'a'});

const customFunction = (tokens, req, res) =>{
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res, 'content-length'),
        `- ${tokens['response-time'](req,res)} ms`,
        `Date: ${new Date().toUTCString()}`,
        `HTTP Version: ${req.httpVersion}`
    ].join(' ');
}
app.use(express.json());
app.use(morgan(customFunction, {stream: logStream}));

app.get('/', (req,res)=>{
    res.status(200).send('this is home page');
});

app.get('/get-users', (req,res)=>{
    res.status(200).send('this is users page');
});

app.post('/add-user', (req,res)=>{
    res.status(201).send('this is post request');
});

app.put('/user/:id', (req,res)=>{
    res.status(201).send(`user with ID ${req.params.id} updated`);
});

app.delete('/user/:id', (req,res)=>{
    res.status(200).send(`user with ID ${req.params.id} deleted`);
});

app.listen(3000,()=>{
    console.log('server is running on 3000')
})