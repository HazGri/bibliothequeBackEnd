const mongoose = require("mongoose");

const auteurModel = mongoose.Schema({
    id_: mongoose.Schema.Types.ObjectId,
    nom : String,
    prenom : String,
    age : Number,
    sexe : Boolean
})

auteurModel.virtual("livres", {
    ref : "Livre",
    localField : "_id",
    foreignField : "auteur",
})




module.exports = mongoose.model("Auteur", auteurModel);
