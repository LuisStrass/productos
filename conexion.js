var sequelize = require('sequelize')
var productoModelo = require('./models/producto')

//Conexion con la bd
const conexion = new sequelize('productosDSM2', 'ks8ajvVjJz2krSc.root', 'wYNBPYbk81eitN01', {
    host: 'localhost', //no dejo con localhost
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    }
});

const producto = productoModelo(conexion);

await conexion.sync({force:false})
.then(() => {
    console.log('Conexion exitosa con la BD')
})
.catch((e) => {
    console.log('Error en la conexion: '+e)
});
module.exports = {
    producto
}