const {Router} = require('express');
const { getMedicos, updateMedico, crearMedico, borrarMedico} = require('../controllers/medicos.controllers');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',validarJWT, getMedicos);

router.post('/createMedico', 
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearMedico);

router.put('/updateMedico/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
        
    ],
    updateMedico);


router.delete('/deleteMedico/:id',validarJWT,borrarMedico);


module.exports = router;