var express = require('express');
var router = express.Router();
var listaUtenti = require('./database.json');
var jsonfile = require('jsonfile');
var path = require('path');

router.get('/', function(req,res){
    res.status(200).json(listaUtenti);
});

router.get('/id/:id', function(req,res){
    var id = req.params.id;
/*    var utente = {};*/
   /* loop1
    for(let i=0; i<listaUtenti.length; i++){
        if(id == listaUtenti[i].id){
           utente = listaUtenti[i];
           break loop1; 
        }
    }*/
    var utente = listaUtenti.find(function(el){
        return el.id == id;
    });
    if (utente){
        res.status(200).json(utente);
    }else{
        res.status(404).send("utente non trovato");
    }

});

router.get('/sesso',function(req,res){
    var sesso = req.query.sesso;
    var listaFiltrata = listaUtenti.filter(function(el){
        return el.sesso == sesso;
    });

    if(listaFiltrata.length){
        res.status(200).json(listaFiltrata);
    }else{
        res.status(404).send("nessun utente di sesso:" + sesso);
    }
});

router.get('/nome',function(req,res){
    var nome = req.query.nome;
    var listaNome = listaUtenti.filter(function(el){
        return el.nome == nome;
    });

    if(listaNome.length){
        res.status(200).json(listaNome);
    }else{
        res.status(404).send("nessun utente di nome:" + nome);
    }
});

router.get('/cognome',function(req,res){
    var cognome = req.query.cognome;
    var listaCognome = listaUtenti.filter(function(el){
        return el.cognome == cognome;
    });

    if(listaCognome.length){
        res.status(200).json(listaCognome);
    }else{
        res.status(404).send("nessun utente di cognome:" + cognome);
    }
});

router.delete('/id/:id', function(req,res){
    var id = req.params.id;
    var utente = listaUtenti.find(function(el){
        return el.id == id;
    });
    var indice = listaUtenti.indexOf(utente);
    listaUtenti.splice(indice,1);
    jsonfile.writeFile(path.join(__dirname, "database.json"),listaUtenti,function(err){
        console.log(err);
    });
    res.json(listaUtenti);
});

router.post('/',function(req,res){
    var nuovo = req.body;
    var max = 0;
    for(let i=0; i<listaUtenti.length; i++)
        if(listaUtenti[i].id >= max) {
            max = listaUtenti [i].id;
        }
        //assegno il nuovo ID
        nuovo.id = max + 1;
        //inserisco l'utente
        listaUtenti.push(nuovo);
        //salvo su file
        jsonfile.writeFile(path.join(__dirname, "database.json"), listaUtenti, 
        function(err){
        console.log(err);
    });
    //mando la nuova lista al client
    res.json(listaUtenti);
});

router.put('/id/:id', function(req,res){
    var id = req.params.id;
    var aggiornato = req.body;
    console.log(id, aggiornato);
    var vecchio = listaUtenti.find(function(el){
        return el.id == id;
    });
    var indice = listaUtenti.indexOf(vecchio);
    listaUtenti.splice(indice,1,aggiornato);
     jsonfile.writeFile(path.join(__dirname, "database.json"), listaUtenti, 
        function(err){
        console.log(err);
    });
    res.json(aggiornato);
});

module.exports = router;