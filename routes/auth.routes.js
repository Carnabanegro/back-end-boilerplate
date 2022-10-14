const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validarCampos.middlewares');

const router = Router();

router.post('/',
    [
        check('email','Email requerido').isEmail(),
        check('password','Password requerido').notEmpty(),
        validarCampos
    ], 
    login
);

router.get('/recoverPassword', (req,res)=>{});



router.post('/register', (req,res)=>{});


module.exports = router;