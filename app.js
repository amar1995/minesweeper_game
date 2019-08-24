const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     
    extended: true
}));
const Router = express.Router();

app.use('/js', express.static(path.join(__dirname+'/js')));
app.use('/images', express.static(path.join(__dirname+'/images')));
app.use('/',express.static(path.join(__dirname+'/')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/home.html'));
});

app.post('/',(req,res) => {
    // console.log(req.body);
    res.sendFile(path.join(__dirname+'/gamePage.html'));
});

app.listen(8080);