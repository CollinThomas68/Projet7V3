//Imports
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
//const auth = require('../middleware/auth');

//Routage
router.post("/inscription", userCtrl.inscription);
router.post("/authentification", userCtrl.authentification);
/*router.get('/perso', auth, userCtrl.espacePerso);
router.put('/update',auth, userCtrl.modifMdp);
router.delete('/delete', auth, userCtrl.suppressionProfil)
*/
module.exports = router;