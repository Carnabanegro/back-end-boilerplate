const {Router} = require('express');
const { getHospitales,crearHospital,borrarHospital,updateHospital} = require('../controllers/hospitales.controllers');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',validarJWT, getHospitales);

router.post('/createHospital', 
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearHospital);

router.put('/updateHospital/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
        
    ],
    updateHospital);


router.delete('/deleteHospital/:id',validarJWT,borrarHospital);


module.exports = router;