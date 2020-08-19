/*const express = require('express');
const router = express.Router();
//Lien vers le controller gif
const messageCtrl = require('../controllers/message');
//Lien vers les middlewares
const auth = require('../middleware/auth');//gestion token d'authentification
const multer = require('../middleware/multer-config');//gestion des images

router.post('/create', auth, multer, messageCtrl.create);// auth est placée avant multer pour être certain que la requète est bien liée à un token d'identification
router.put('/update', auth, multer, messageCtrl.update);
router.delete('/delete', auth, messageCtrl.delete);
router.get('/', auth, messageCtrl.listingGif);
module.exports = router;
*/