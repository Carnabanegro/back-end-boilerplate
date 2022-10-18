const { response } = require("express");
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/JWT.helpers");

const login = async(req,res = response,next) =>{

    const {email, password} = req.body

    try {
        

        const usuarioDB = await Usuario.findOne({email})

        if (!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'El mail no corresponde a un usuario registrado'
            });
        }

        const validPassword = bcryptjs.compareSync(password,usuarioDB.password,{ expiresIn: '12h' });

        if (!validPassword){

            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });

        }

        
        ///GENERO TOKEN
        const token= await generateJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token: token,
            msg: "USUARIO LOGEADO EXITOSAMENTE"
        });

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }

}



const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario
    });

}


module.exports = {login,renewToken} ;