const mongoose = require("mongoose");
const fs = require("fs");
const auteurModel = require("../models/auteurs.model");

exports.auteur_affichage = (req, res) => {
  auteurModel
    .findById(req.params.id)
    .populate("livres")
    .exec()
    .then((auteur) => {
      console.log(auteur);
      res.render("auteurs/auteur.html.twig", { auteur: auteur });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.auteurs_affichage = (req, res) => {
  auteurModel
    .find()
    .populate("livres")
    .exec()
    .then((auteurs) => {
      res.render("auteurs/listeAuteur.html.twig", { auteurs: auteurs });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.auteur_ajout = (req, res) => {
  const auteur = new auteurModel({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    sexe: (req.body.sexe) ? true : false,
  });
  auteur
    .save()
    .then((resultat) => {
      res.redirect("/auteurs");
    })
    .catch((error) => {
      console.log(error);
    });
};
