const jwt = require('jsonwebtoken');

const generateJWT = (usuario) =>{


    return new Promise( (resolve,reject) => {
        const payload = {
            uid: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            role: usuario.role
        }
    
        return jwt.sign(
                payload,
                process.env.JWT_SECRET,
                (err,token)=>{

                    if(err){
                        console.log(err);
                        reject('NO SE PUDO GENERAR EL JWT');
                    }else{
                        resolve(token);
                    }

                }
        );

    });

    

} 

module.exports = {generateJWT};