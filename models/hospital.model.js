const { Schema, model } = require('mongoose') ;

const HospitalSchema = Schema({
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
        required: true
    }

},{collection: 'hospitales'})

HospitalSchema.method('toJSON', function(){
    const {__v,_id, ...object } = this.toObject();
    object.hid = _id;
    return object
})


module.exports = model('Hospital',HospitalSchema);