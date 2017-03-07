var express = require('express');
var app = express();
var path = require ('path');
const PORT = 3000;


app.listen(PORT, function(){
    console.log('server start at http://localhost:' + PORT);
});


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});