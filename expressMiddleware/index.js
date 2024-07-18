const express = require("express");
const validate = require("./checkMiddleware/validate");
const app = express();


app.use(express.json());

app.post('/',validate,(req,res)=>{
    res.status(200).send('data received');
});

app.use((req,res)=>{
    res.status(404).send('not found')
})


app.listen(3001,()=>{
    console.log("port is running on 3001")
})