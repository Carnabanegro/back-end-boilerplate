const { Schema, model } = require('mongoose') ;

const MedicoSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: false,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital', 
    }
})

MedicoSchema.method('toJSON', function(){
    const {__v,_id, ...object } = this.toObject();
    object.mid = _id;
    return object
})


module.exports = model('Medico',MedicoSchema);