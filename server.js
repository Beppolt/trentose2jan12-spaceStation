const bodyParser=require('body-parser');
const express = require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 
var port = process.env.PORT || 8080;
var uuid = require('uuid-v4');

var astronauts = [];

// FUNZIONE PER AGGIUNGERE UTENTI. IL BODY E' PENSATO PRINCIPALMENTE IN FORMATO URL-ENCODED, VISTO CHE VIENE FACILE DA TESTARE SU POSTMAN
app.post('/api/astronauts', (req,res) => {
	var id=uuid();
	astronauts.push({"id":id, firstName: req.body.firstName, lastName: req.body.lastName, isInSpace: req.body.isInSpace });
	res.json({"id":id, firstName: req.body.firstName, lastName: req.body.lastName, isInSpace: req.body.isInSpace });
});

// FUNZIONE PER MOSTRARE TUTTI GLI UTENTI (SIMPLE GET)
app.get('/api/astronauts', (req,res) => {
	res.json(astronauts);
});

// FUNZIONE PER MOSTRARE UTENTE TRAMITE ID (GETBYID)
app.get('/api/astronauts/:id', (req,res) => {
	var id=req.params.id;
	var index = astronauts.findIndex(item => {return item.id == id});
	if(index != -1){
		res.json(astronauts[index]);
	}
	else{
		res.sendStatus(404);
	}
});

// FUNZIONE PER MODIFICARE DATI DI UN ASTRONAUTA (ESCLUSO IL SUO ID UNIVOCO)
app.put('/api/astronauts/:id', (req,res) => {
	var id=req.params.id;
	var index = astronauts.findIndex(item => {return item.id == id});
	if(index != -1){
		var param = astronauts[index].id;
		astronauts[index] = {id: param, firstName: req.body.firstName, lastName: req.body.lastName, isInSpace: req.body.isInSpace };
		res.json(astronauts[index]);
	}
	else{
		res.sendStatus(404);
	}
});
