var express = require("express");
var routeur = express.Router();
var twig = require("twig");

const auteurController = require("../controllers/auteur.controller")

routeur.get("/:id", auteurController.auteur_affichage);
routeur.get("/", auteurController.auteurs_affichage);
routeur.post("/",auteurController.auteur_ajout);
routeur.post("/delete/:id", auteurController.auteur_suppression);
routeur.get("/modification/:id", auteurController.auteur_modif);
routeur.post("/modificationServer",auteurController.auteur_modif_validation)

module.exports = routeur;