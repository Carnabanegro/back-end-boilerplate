const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { dbConecction } = require('./db/config');

///ROUTES IMPORTS
const usuarios = require('./routes/usuarios.routes');
const auth = require('./routes/auth.routes');
//const medicos = require('./routes/medicos.routes');
//const hospitales = require('./routes/hospitales.routes');

//DB CONNECTION
dbConecction();

//CONFIG CORS
app.use(cors());

//LECTURA Y PARSEO DEL BODY
app.use(express.json());

//ROUTES
app.use('/api/usuarios',usuarios);
app.use('/api/login',auth);
//app.use('/api/medicos',medicos):
//app.use('/api/hospitales',hospitales);


app.get('/', (req,res) =>{
    res.status(200).json({
        ok: true,
        msg: "Hola mundo"
    })
})


app.listen(process.env.PORT, ()=>{
    console.log("Server running on Port : " + 3000)
})

