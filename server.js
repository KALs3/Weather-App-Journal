const express = require('express');
require('dotenv').config()

let projectData = {};

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// local server 


app.use(express.static('website')); // intialize the main project folder 

const PORT = 8000;

const server = app.listen(PORT,()=>{
    console.log(`local server running on localhost:${PORT}`);
})



app.get('/all', function(req,res){
    res.send(projectData);
});

app.post('/add',function(req,res){
    console.log(req.body);
    projectData={
        temp:req.body.temp,
        name:req.body.name,
        date:req.body.date,
        content:req.body.feelings,
        icon:req.body.icon,
    };
    res.send(projectData);
});

