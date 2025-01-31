var express = require("express");
var routeur = express.Router();
var twig = require("twig");
const multer = require("multer");
const livreController = require("../controllers/livre.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    var date = new Date().toLocaleDateString().replace(/\//g, '-'); 
    const uniqueSuffix = date + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' +file.originalname); // Ajoute l'extension au nom
  }
});


const fileFilter = (requete, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
      cb(null, true)
    } else {
      cb(new Error("l'image n'est pas acceptée"),false)
    }

}

const upload = multer({
  storage : storage,
  limits : {
    fileSize : 1024*1024*5
  },
  fileFilter : fileFilter
})


//affichage liste de livre
routeur.get("/",livreController.livres_affichage);
//création d'un livre et insertion dans la base de donnée
routeur.post("/", upload.single("image"), livreController.livres_ajout);
//affichage détaillé d'un livre
routeur.get("/:id", livreController.livre_affichage);
//modification d'un livre (formulaire)
routeur.get("/modification/:id",livreController.livre_modif)
routeur.post("/modificationServer", livreController.livre_modif_serveur);
//modif image
routeur.post("/updateImage", upload.single("image"),livreController.image_modif)
//supression d'un livre
routeur.post("/delete/:id",livreController.livre_supprimer)



module.exports = routeur;
