var router = require('express').Router()
const { where } = require('sequelize')
var {producto} = require('../conexion')

//ruta rais
router.get('/',(req,res) => {
    res.render('pages/index')
})

//ruta para la pagina de insertar
router.get('insertarProgucto',(req,res) => {
    res.render('pages/insertarProducto')
})

//ruta o peticion para insertar un registro (producto nuevo)
router.post('/guardarProducto',(req,res) => {
    producto.create(req.body)
    .then(() => {
        console.log('Se insertp correctamente')
        res.redirect('/listaProductos')
    })
    .catch((e) => {
        console.log('Error al insertar: '+e)
    })
})

//ruta o peticion para obtener todos los productos
router.get('/listaProductos',(req,res) => {
    producto.findAll()
    .then((data) => {
        res.render('pages/listaProductos', {productos: data})
    })
    .catch((e) => {
        console.log('Error en la consulta: '+e)
    })
})

//ruta o peticion para obtener un producto por su ID
router.get('/buscarProducto/:idProducto',(req,res) => {
    producto.findAll({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then((data) => {
        res.render('pages/modificarProducto', {producto: data})
    })
    .catch((e) => {
        console.log('Error en la consulta: '+e)
    })
})

//ruta o peticion para modificar un producto existente
router.post('/modificarProducto',(req,res) =>{
    var idProducto = req.body.idProducto;
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    }
    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
    .then(() => {
        console.log('Se modifico correctamente el producto')
        res.redirect('/listaProductos')
    })
    .catch((e) => {
        console.log('Error al modificar: '+e)
    })
})

//ruta o peticion para eliminar un producto
router.get('/eliminarProducto/:idProducto',(req,res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then(() => {
        console.log('Se elimino exitosamente el producto: '+e)
        res.redirect('pages/listaProductos')
    })
    .catch((e) => {
        console.log('Error al eliminar: '+e)
    })
})
module.exports = router;