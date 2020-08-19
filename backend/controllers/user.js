var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwtUtils')
var models = require('../models')
const { Op } = require('sequelize')

//Regex permettant le contrôle des saisies utilisateurs
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;


//Fonction de création d'un utilisateur
exports.inscription= (req,res)=>{
    //On récupère les données de la requète du front
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    //On vérifie si les 3 champs sont bien remplis
    if(email == null || username == null || password == null){
        return res.status(400).json({error:'Tous les champs requis ne sont pas remplis!'});

    }
    if (username.length >= 21 || username.length <= 4) {
        return res.status(400).json({ 'error': 'Votre nom d\'utilisateur doit contenir entre 5 et 20 caractères '});
    }
  
    if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'Votre email n\'est pas valide! ' });
    }

    if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'Votre mot de passe est incorrect : il doit contenir entre 4 et 8 caractères avec au moins une majuscule, une minuscule et un chiffre ' });
    }

    //On vérifie si l'email existe déjà dans la base de données
    models.User.findOne({
        attributes:['email'],
            where:{[Op.or]: [{email:email}, {username: username}]} 
       //[Op.or]:[{email:email},{username:username}]
    })
        .then(userfound=>{
            if(!userfound){
                bcrypt.hash(password, 10, function (err, bcryptPassword) {
                    // Création de l'user
                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptPassword,
                        isAdmin: false
                    })
                        .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                        .catch(err => {
                            res.status(500).json({ err })
                        })
                })     
            }else{
                res.status(409).json({'error':'Cet utilisateur existe déjà !'});
            }
        })
        .catch(err=>{res.status((500).json({ err }))})
};

exports.authentification=(req,res)=>{
    let username = req.body.username;
    let password= req.body.password;
    //On vérifie si les 2 champs sont bien remplis
    if(username == null || password == null){
        return res.status(400).json({error:'Tous les champs requis ne sont pas remplis!'})
    }
    models.User.findOne({
        where: {username : username}
    })
        .then(userfound=>{
            if (userfound) {
                bcrypt.compare(password, userfound.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: userfound.id,
                            token: jwtUtils.generateToken(userfound),
                            isAdmin: userfound.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: 'Le mot de passe est incorrect' });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })

};