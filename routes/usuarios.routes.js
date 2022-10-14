const {Router} = require('express');
const { getUsuarios, crearUsuario, updateUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',validarJWT, getUsuarios);

router.post('/createUsuario', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email debe tenes el formato email@email.com...').isEmail(),
        validarCampos
    ] , 
    crearUsuario);

router.put('/updateUsuario/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email debe tenes el formato email@email.com...').isEmail(),
        validarCampos
        
    ],
    updateUsuario);


router.delete('/deleteUsuario/:id',validarJWT,borrarUsuario);


module.exports = router;