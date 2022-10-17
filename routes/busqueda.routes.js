const {Router} = require('express');


const { getTodo } = require('../controllers/busqueda.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/:busqueda',validarJWT, getTodo);

module.exports = router;