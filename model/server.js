const express = require('express');
require('dotenv').config();
const port = process.env.PORT;

class Server {
    constructor(){
        this.app = express();
        this.middlewares();
        this.rutas();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    rutas(){
        this.app.post('/dni', function(req, res){
            let dni = req.body.dni
            let numero
            let letr
            let letra
            let expresion_regular_dni
            let mensaje;
            expresion_regular_dni = /^[0-9]{8,8}[A-Za-z]$/;
        
            if(expresion_regular_dni.test(dni) == true){
                
                numero = dni.substr(0,dni.length-1);
                letr = dni.substr(dni.length-1,1);
                numero = numero % 23;
                letra='TRWAGMYFPDXBNJZSQVHLCKET';
                letra=letra.substring(numero,numero+1);
                if (letra!=letr.toUpperCase()) {
                    mensaje = "Dni erroneo, la letra del DNI no se corresponde"
                }else{
                    mensaje = "Dni Correcto"
                }
            }else{
                mensaje = "Dni erroneo, formato no válido"
            }
            res.json({
                msg: mensaje
            })
        })
    }

    listen(){
        this.app.listen(port, function() { 
            console.log('Escuchando el puerto',port)});
    }

     validarDNI(dni) {
        var numero
        var letr
        var letra
        var expresion_regular_dni
       
        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
       
        if(expresion_regular_dni.test (dni) == true){
           numero = dni.substr(0,dni.length-1);
           letr = dni.substr(dni.length-1,1);
           numero = numero % 23;
           letra='TRWAGMYFPDXBNJZSQVHLCKET';
           letra=letra.substring(numero,numero+1);
          if (letra!=letr.toUpperCase()) {
             return 'Dni erroneo, la letra del NIF no se corresponde';
           }else{
            return 'Dni correcto';
           }
        }else{
           return 'Dni erroneo, formato no válido';
        }
    }
}

module.exports = Server;