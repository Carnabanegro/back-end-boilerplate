
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const Medico = require('../models/medico.model');
const Hospital = require('../models/Hospital.model');
const Usuario = require('../models/usuario.model');
const { updateImage } = require('../helpers/updateImage.helpers');





const getFile = async(req,res = response) => {
    
    const {pathFile,tabla} = req.params;

    var pathImage = path.join(__dirname, `../uploads/${tabla}/${pathFile}`);

    if(!fs.existsSync(pathImage)) {
        pathImage =  path.join(__dirname, `../uploads/no-img.jpg`);
    }

    res.sendFile(pathImage);
    

    

}

const uploadFile = async(req,res = response) => {

    const {tabla,id} = req.params;

    try {

        const tiposValidos = ['usuarios','medicos','hospitales']
        if (!tiposValidos.includes(tabla)){
            return res.status(400).json({
                ok:false,
                msg: 'TIPO INVALIDO'
            });

        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok:false,
                msg: 'NO FILE WERE UPLOADED'
            });
        }

        // tomar extension del archivo
        const file = req.files.imagen;
        const nombre = file.name.split('.');
        const extension = nombre[ nombre.length - 1 ];

        //validar extension
        const extensionValida = ['jpg','png','jpeg','gif'];
        if(!extensionValida.includes(extension)){
            return res.status(400).json({
                ok:false,
                msg: 'INVALID FILE EXTENSION'
            });
        }

        ///generar archivo
        const nombreArchivo = `${uuidv4()}.${extension}`

        //generar path de archivo

        const uploadPath = `./uploads/${tabla}/${nombreArchivo}`;
    
        const uploadRes = await updateImage(tabla,id,nombreArchivo);

        if(!uploadRes){
            return res.status(400).json({
                ok:false,
                msg: 'INVALID ID'
            });
        }
    
        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok:false,
                    msg: err
                });
            }
                

            res.status(200).json({
                ok: true,
                nombreArchivo,
                msg: "ARCHIVO SUBIDO CON EXITO"
            });
        });
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }
    
                    
    


}

module.exports = {uploadFile,getFile};