const Medico = require('../models/medico.model');
const Hospital = require('../models/Hospital.model');
const Usuario = require('../models/usuario.model');

const fs = require('fs');

const deleteImage = (path) =>{
    
    if (fs.existsSync(path)){
        fs.unlinkSync(path)
    }
}

const updateImage = async(tabla,id,nombreArchivo) => {

    var oldPath = null ;

    switch (tabla) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario){
                return false;
            }
            
            oldPath = `./uploads/usuarios/${usuario.img}`
            deleteImage(oldPath);
            usuario.img = nombreArchivo;
            await usuario.save()
            return true;

    
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico){
                return false;
            }

            oldPath = `./uploads/medicos/${medico.img}`
            deleteImage(oldPath);
            medico.img = nombreArchivo;
            await medico.save()
            return true;

        case 'hospitales':
          
            const hospital = await Hospital.findById(id);
            if (!hospital){
                return false;
            }
            
            
            oldPath = `./uploads/hospitales/${hospital.img}`
            deleteImage(oldPath);
            hospital.img = nombreArchivo;
            await hospital.save()
            return true;

        default:
            console.log(error)
            res.status(500).json({
                ok:false,
                msg: 'Tipo Erroneo'
            });
            break;
    }

}


module.exports = {updateImage};