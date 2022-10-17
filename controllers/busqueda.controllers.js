const Medico = require('../models/medico.model');
const Hospital = require('../models/Hospital.model');
const Usuario = require('../models/usuario.model');

const getTodo = async(req,res) => {

    const regex = RegExp(req.params.busqueda,'i') ;

    const [usuarios,medicos,hospitales] = await Promise.all([
        Usuario.find({nombre:regex}),
        Medico.find({nombre:regex})
                .populate('usuario','nombre img')
                .populate('hospital','nombre img'),
        Hospital.find({nombre:regex})
            .populate('usuario','nombre img')     
    ]);
    
                    
    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
        msg: "LISTADO GENERAL"
    });


}

module.exports = {getTodo};