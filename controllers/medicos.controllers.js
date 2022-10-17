const Medico = require('../models/medico.model');
const Hospital = require('../models/Hospital.model');
const {response} = require('express');
const { findOne } = require('../models/medico.model');


const getMedicos = async(req,res = response) =>{

    const medicos = await Medico.find()
                    .populate('usuario','nombre img')
                    .populate('hospital','nombre img');

                    
    res.status(200).json({
        ok: true,
        medicos,
        msg: "LISTADO DE MEDICOS"
    });
}


const crearMedico = async(req,res) =>{

    const {nombre,hospital} = req.body;
    const uid = req.uid;

    

    try{

        const medicoExiste = await Medico.findOne({nombre});

        if (medicoExiste){

            return res.status(400).json({
                ok:false,
                msg: 'Ya existe un medico con este nombre'
            })

        }

    
        if(hospital){
            console.log('dsfdsfsd')
            const hospitalDB = await Hospital.findOne({nombre: hospital});
            console.log(hospitalDB)
            if (!hospitalDB) {
                return res.status(400).json({
                    ok:false,
                    msg: 'No existe un hospital con este nombre en nuestra base de datos'
                })
            } 
            req.body.hospital = hospitalDB._id;
            
        }
        const medico = new Medico({usuario:uid,...req.body});
        var medicoGuardado  = await medico.save();
      
        res.status(200).json({
            ok: true,
            medicoGuardado,
            msg: "MEDICO CREADO EXITOSAMENTE"
        });
        
    }catch(error){

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }
    
}

const updateMedico = async(req,res = response) =>{

    const mid = req.params.id;

    try {

        const medicoExiste = await Medico.findById(mid);

        if (!medicoExiste){
            return res.status(400).json({
                ok:false,
                msg: 'No existe el medico'
            })
        }

        //ACTUALIZACION DE MEDICO
        const campos = req.body;
        //verifico si el nombre cambio y si cambio busco que ese medico no exista 
        if (medicoExiste.nombre === campos.nombre){
            delete campos.nombre
        }else{
            const nombreTomado = await Medico.findOne({nombre:campos.nombre});
            if (nombreTomado){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un medico con este nombre'
                })
            }
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(mid,campos, {new:true});

        res.status(200).json({
            ok: true,
            medicos: medicoActualizado,
            msg: "MEDICO MODIFICADO EXITOSAMENTE"
        });

        
            
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });

    }

}

const borrarMedico = async(req,res = response) => {

    try {
        
        const mid = req.params.id
        const medico = Medico.findById(mid);

        if (!medico){
            return res.status(400).json({
                ok:false,
                msg: 'Medico no existe'
            })
        }

        const medicoBorrado = await Medico.findByIdAndDelete(mid);

        res.status(200).json({
            ok: true,
            medico: medicoBorrado,
            msg: "MEDICO BORRADO EXITOSAMENTE"
        });



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        });
    }

}

module.exports = {getMedicos,crearMedico,borrarMedico,updateMedico};