const mongoose = require("mongoose");

const auteurModel = mongoose.Schema({
    id_: mongoose.Schema.Types.ObjectId,
    nom : String,
    prenom : String,
    age : Number,
    sexe : Boolean
})

module.exports = mongoose.model("Auteur", auteurModel);
