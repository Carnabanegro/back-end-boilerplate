const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { dbConecction } = require('./db/config');

//DB CONNECTION
dbConecction();

//CONFIG CORS
app.use(cors());

//ROUTES
app.get('/', (req,res) =>{
    res.status(200).json({
        ok: true,
        msg: "Hola mundo"
    })
})


app.listen(process.env.PORT, ()=>{
    console.log("Server running on Port : " + 3000)
})

