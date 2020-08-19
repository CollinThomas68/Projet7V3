
const jwt = require('jsonwebtoken');

//Code permettant de vérfier la validité du token d'authentification
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //On vérifie si l'utilisateur a une autorisation
    if(authHeader){
      //On récupère le token
      const TOKEN = authHeader.split(' ')[1];
      jwt.verify(TOKEN,'qhk4GCN6hoEHeiVvNbOQ078CkUAfASwb5kK318NiYj4keZ6CGDC6wcjlVOOj', (err,user)=>{
          if(err){
            return res.status(403);
          }
          next();
      });
    }
    else{
      res.status(401).json({error:"Vous n'avez pas le droit d'accéder à ce contenu"});
    
  }
};