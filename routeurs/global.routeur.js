var express = require("express");
var routeur = express.Router();
var twig = require("twig");

routeur.get("/", (requete, reponse) => {
  reponse.render("accueil.html.twig");
});

//mettre ces routes bien à la fin pour les erreurs
routeur.use((requete, reponse, suite) => {
  const error = new Error("Page non trouvée");
  error.status = 404;
  suite(error);
});

routeur.use((error, requete, reponse) => {
  reponse.status(error.status || 500);
  reponse.end(error.message);
});

module.exports = routeur;
