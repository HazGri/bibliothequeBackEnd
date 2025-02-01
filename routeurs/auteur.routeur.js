var express = require("express");
var routeur = express.Router();
var twig = require("twig");

const auteurController = require("../controllers/auteur.controller")

routeur.get("/:id", auteurController.auteur_affichage)
routeur.get("/", auteurController.auteurs_affichage)

module.exports = routeur;