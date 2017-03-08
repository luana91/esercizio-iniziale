var express = require('express');
var app = express();
var path = require ('path');
var bodyParser = require('body-parser');
const PORT = 3000;


app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

var utenti = require('./utenti/utenti.js');
app.use('/users', utenti);





app.listen(PORT, function(){
    console.log('server start at http://localhost:' + PORT);
});