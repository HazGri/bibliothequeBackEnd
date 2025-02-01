const mongoose = require("mongoose");
const fs = require("fs");
const auteurModel = require("../models/auteurs.model");
const livreModel = require("../models/livres.model");

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
      res.render("auteurs/listeAuteur.html.twig", { auteurs: auteurs, isModification:false });
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

exports.auteur_suppression = (req, res) => {
    auteurModel.find()
    .where("nom").equals("anonyme")
    .exec()
    .then(auteur => {
        livreModel.updateMany({"auteur":req.params.id},{"$set":{
            "auteur": auteur[0]._id
        }}, {"multi": true})
        .exec()
        .then(
            auteurModel.deleteOne({_id:req.params.id})
            .where("nom").ne("anonyme")
            .exec()
            .then(res.redirect("/auteurs"))
            .catch(error => {
                console.log(error);
            })
        )
    })
}

exports.auteur_modif = (req, res) => {
    auteurModel.findById(req.params.id)
    .populate("livres")
    .exec()
    .then((auteur) => {
      res.render("auteurs/auteur.html.twig", { auteur: auteur, isModification:true});
    })
    .catch((error) => {
      console.log(error);
    });
}

exports.auteur_modif_validation = (req, res) => {
    const auteurUpdate = {
        nom : req.body.nom,
        prenom : req.body.prenom,
        age : req.body.age,
        sexe : (req.body.sexe) ? true : false,
    };
    auteurModel.updateOne({_id:req.body.identifiant}, auteurUpdate)
    .exec()
    .then(resultat => {
        res.redirect("/auteurs");
    })
    .catch();
}