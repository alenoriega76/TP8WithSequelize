const express = require('express');
const router = express.Router();
const login = require('../middleware/validateLogin');
const validate = require('../middleware/validateRegister');
const validateUpdate = require('../middleware/update');
const { createUser, getProduct, createProduct, obtenerProductoId, deleteProduct,
       renderIndex, renderRegister, renderLogin,
        loginSesion, getUser, deleteUser, updateUser, obtenerUsuarioId,
       updateProduct,renderProductos,renderNuevoProducto } = require('../controllers/indexControllers');

// rutas para Login y Register
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login,loginSesion);
router.post('/register', validate,createUser);


// rutas para operaciones CRUD
router.get('/', renderIndex);
// rutas para productos CRUD
router.get('/products',getProduct);
router.get('/products/new',renderNuevoProducto)
router.post('/products' ,createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.get('/products/:id', obtenerProductoId);

// rutas para usuarios CRUD
router.get('/usuarios', getUser);
router.get('/usuarios/:id', obtenerUsuarioId)
router.put('/usuarios/edit/:id', updateUser);
router.delete('/usuarios/delete/:id', deleteUser);

module.exports = router;