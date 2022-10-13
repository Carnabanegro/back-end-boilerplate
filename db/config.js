////////Mongo conecction////////
const mongoose = require('mongoose');

const dbConecction = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECT);

        console.log('DB CONNECTED')
    }catch(error){
        console.log(error)
        throw new Error('Error en : '+ error)
    }
    
}


module.exports = {dbConecction};


//////////////////////////////////