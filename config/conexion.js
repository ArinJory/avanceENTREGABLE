const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'maquillaje_db'
})

conexion.connect((e)=>{
    if(e){
        console.log("Conexion fallida: ",e)
        return;
    }

    console.log("conexion exitada");
})

module.exports = conexion;