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