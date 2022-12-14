const Usuario = require('../models/usuario.model');
const {response} = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/JWT.helpers');

const getUsuarios = async(req,res = response) =>{

    const desde = Number(req.query.desde) || 0;
    const cant = Number(req.query.cant) || 5;

    const [usuarios, total] = await Promise.all([
        Usuario.find()
                .skip(desde)
                .limit(cant),
        Usuario.count()
    ]);


    res.status(200).json({
        ok: true,
        usuarios: usuarios,
        total,
        msg: "LISTADO DE USUARIOS"
    });
}

const getUsuario = async(req,res = response) =>{
    const id = req.params.id ;
    const usuario = await  Usuario.findById(id);

    if (!usuario) {
        return res.status(400).json({
            ok:false,
            msg: 'Usuario no encontrado'
        })
    }

    res.status(200).json({
        ok: true,
        usuario,
        msg: "USUARIO ENCONTRADO"
    });
  

}

const getUsuariosByName = async(req,res = response) =>{

    const desde = Number(req.query.desde) || 0;
    const cant = Number(req.query.cant) || 5;
    const name = req.params.name || '';
    const regex = RegExp( name, 'i' );

    const [usuarios, total] = await Promise.all([
        Usuario.find({nombre:regex})
                .skip(desde)
                .limit(cant),
        Usuario.count({nombre:regex})
    ]);

    res.status(200).json({
        ok: true,
        usuarios: usuarios,
        total,
        msg: "LISTADO DE USUARIOS"
    });
}


const crearUsuario = async(req,res) =>{

    const {password,email} = req.body;

    

    try{

        const usuarioExiste = await Usuario.findOne({email});

        if (usuarioExiste){

            return res.status(400).json({
                ok:false,
                msg: 'Ya existe un usuario con este mail'
            })

        }

        const usuario = new Usuario(req.body);

        //Encripto el usuario
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt);

        var usuarioGuardado  = await usuario.save();
        usuarioGuardado = await Usuario.findById(usuarioGuardado.id)
        const token = await generateJWT(usuarioGuardado.id);
    
        res.status(200).json({
            ok: true,
            usuario: usuario,
            token:token,
            msg: "USUARIO CREADO EXITOSAMENTE"
        });
        
    }catch(error){

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }
    
}

const updateUsuario = async(req,res = response) =>{

    const uid = req.params.id;

    try {

        const usuarioExiste = await Usuario.findById(uid);

        if (!usuarioExiste){
            return res.status(400).json({
                ok:false,
                msg: 'No existe el usuario'
            })
        }

        //ACTUALIZACION DE USUARIO
        const campos = req.body;
        //verifico si el mail cambio y si cambio busco que ese mail no exista en otro usuario
        if (usuarioExiste.email === campos.email){
            delete campos.email
        }else{
            const mailTomado = await Usuario.findOne({email:campos.email});
            if (mailTomado){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con este mail'
                })
            }
        }

        delete campos.password;
        delete campos.google;
    
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new:true});

        res.status(200).json({
            ok: true,
            usuarios: usuarioActualizado,
            msg: "USUARIO MODIFICADO EXITOSAMENTE"
        });

        
            
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }

}

const borrarUsuario = async(req,res = response) => {

    try {
        
        const uid = req.params.id
        const usuario = Usuario.findById(uid);

        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg: 'Usuario no existe'
            })
        }

        const usuarioBorrado = await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado,
            msg: "USUARIO BORRADO EXITOSAMENTE"
        });



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }

}

module.exports = {getUsuarios,crearUsuario,updateUsuario,borrarUsuario,getUsuario,getUsuariosByName};