const mongoose = require("mongoose");
const fs = require('fs');
const auteurModel= require("../models/auteurs.model");

exports.auteur_affichage = (req, res) => {
    auteurModel.findById(req.params.id)
    .exec()
    .then(auteur => {
        console.log(auteur);
        res.render("auteurs/auteur.html.twig", {auteur : auteur});
    })
    .catch(error => {
        console.log(error);
    })
}