const {Router} = require('express');
const fileUpload = require('express-fileupload');

const { uploadFile, getFile } = require('../controllers/upload.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();
router.use(fileUpload());

router.get('/:tabla/:pathFile', getFile );

router.put('/:tabla/:id',validarJWT, uploadFile);


module.exports = router;