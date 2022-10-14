const Hospital = require('../models/Hospital.model');
const {response} = require('express');



const getHospitales = async(req,res = response) =>{

    const hospitales = await Hospital.find();
    res.status(200).json({
        ok: true,
        hospitales,
        msg: "LISTADO DE HOSPITALES"
    });
}


const crearHospital = async(req,res) =>{

    const {nombre} = req.body;
    const uid = req.uid;
    

    try{

        const HospitalExiste = await Hospital.findOne({nombre});

        if (HospitalExiste){

            return res.status(400).json({
                ok:false,
                msg: 'Ya existe un hospital con este nombre'
            })

        }
        console.log(uid)
        const hospital = new Hospital({usuario: uid, ...req.body});
        var hospitalGuardado  = await hospital.save();
      
        res.status(200).json({
            ok: true,
            hostpital: hospitalGuardado,
            msg: "HOSPITAL CREADO EXITOSAMENTE"
        });
        
    }catch(error){

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }
    
}

const updateHospital = async(req,res = response) =>{

    const mid = req.params.id;

    try {

        const HospitalExiste = await Hospital.findById(mid);

        if (!HospitalExiste){
            return res.status(400).json({
                ok:false,
                msg: 'No existe el hospital'
            })
        }

        //ACTUALIZACION DE HOSPITAL
        const campos = req.body;
        //verifico si el nombre cambio y si cambio busco que ese Hospital no exista 
        if (hospitalExiste.nombre === campos.nombre){
            delete campos.nombre
        }else{
            const nombreTomado = await Hospital.findOne({nombre:campos.nombre});
            if (nombreTomado){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un hospital con este nombre'
                })
            }
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(mid,campos, {new:true});

        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado,
            msg: "HOSPITAL MODIFICADO EXITOSAMENTE"
        });

        
            
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }

}

const borrarHospital = async(req,res = response) => {

    try {
        
        const mid = req.params.id
        const hospital = Hospital.findById(mid);

        if (!hospital){
            return res.status(400).json({
                ok:false,
                msg: 'Hospital no existe'
            })
        }

        const hospitalBorrado = await Hospital.findByIdAndDelete(mid);

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado,
            msg: "HOSPITAL BORRADO EXITOSAMENTE"
        });



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }

}

module.exports = {getHospitales,crearHospital,borrarHospital,updateHospital};