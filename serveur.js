const express = require("express");
const server = express();
const morgan = require("morgan");
const routerLivre = require("./routeurs/livres.routeur");
const routerGlobal = require("./routeurs/global.routeur");
const routerAuteur = require("./routeurs/auteur.routeur");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");


server.use(session({
secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

mongoose.connect("mongodb://localhost/biblio2")

server.use((req,res,suite)=> {
    res.locals.message = req.session.message;
    delete req.session.message;
    suite();
})


server.use(express.static("public"));
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({extended:false}));

server.use("/livres", routerLivre);
server.use("/auteurs/", routerAuteur);
server.use("/", routerGlobal);

server.listen(3000);
