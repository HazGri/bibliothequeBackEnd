const livreModel = require("../models/livres.model");
const auteursModel = require("../models/auteurs.model")
const mongoose = require("mongoose");
const fs = require('fs');


//affichage de la liste de livre
exports.livres_affichage = (req, res) => {
    auteursModel.find()
    .exec()
    .then(auteurs =>{
      livreModel.find()
        .populate("auteur")
        .exec()
        .then((livres) => {
          res.render("livres/liste.html.twig", {
             listeLivres: livres, 
             auteurs : auteurs, 
             message : res.locals.message });
        })
        .catch();
    })
    .catch(error => {
      console.log(error);
    })
  }

//ajout d'un livre
exports.livres_ajout = (req, res) => {
    const livre = new livreModel({
      _id : new mongoose.Types.ObjectId(),
      titre : req.body.titre,
      auteur : req.body.auteur,
      pages : req.body.pages,
      description : req.body.description,
      image : req.file.path.substring(14)
    })
    livre.save()
    .then(resultat=> {
      res.redirect("/livres")
    })
    .catch((error)=>{
      console.log(error);
    })
  }
//affichage détaillée d'un lire
exports.livre_affichage = (req, res) => {
    livreModel
      .findById(req.params.id)
      .exec()
      .then((livre) => {
        res.render("livres/livre.html.twig", { livre: livre, isModifcation:false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

//modifciation d'un livre 
exports.livre_modif = (req,res) => {
    livreModel
    .findById(req.params.id)
    .exec()
    .then((livre) => {
      res.render("livres/livre.html.twig", { livre: livre, isModification:true });
    })
    .catch((error) => {
      console.log(error);
    });
  }

//modif livre serveur
exports.livre_modif_serveur = async (req, res) => {
    try {
      const livreUpdate = {
        titre: req.body.titre,
        auteur: req.body.auteur,
        pages: req.body.pages,
        description: req.body.description
      };
  
      const resultat = await livreModel.updateOne(
        {_id:req.body.identifiant},
        livreUpdate
      );
      if(resultat.modifiedCount < 1){
        throw new Error("Requete de moficiation échouée");
      }
      req.session.message = {
        type: "success",
        contenu: "Modification effectuée"
      };
  
      res.redirect("/livres");
  
    } catch (error) {
      req.session.message = {
        type: "danger",
        contenu: error.message
      };
      res.redirect("/livres")
    }
  }

//modif image 
exports.image_modif = (req,res)=>{
    var livre = livreModel.findById(req.body.identifiant)
        .select("image")
        .exec()
        .then(livre => {
        fs.unlink("./public/images/"+livre.image, error => {
            console.log(error);
        })
    const livreUpdate = {
        image : req.file.path.substring(14)
        }
        livreModel.updateOne({_id:req.body.identifiant}, livreUpdate)
        .exec()
        .then(resulat => {
        res.redirect("/livres/modification/"+req.body.identifiant)
        })
        .catch(error => {
        console.log(error);
        })
        });

}

//Suppression livre

exports.livre_supprimer = async (req,res)=>{
    var livre = livreModel.findById(req.params.id)
    .select("image")
    .exec()
    .then(livre => {
      fs.unlink("./public/images/"+livre.image, error => {
        console.log(error);
      })
      livreModel.deleteOne({_id:req.params.id})
      .exec()
      .then(resultat => {
        req.session.message = {
          type : 'success',
          contenu : 'Suppression effectuée'
        }
        res.redirect("/livres");
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }