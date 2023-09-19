const express = require('express');
const router = express.Router();
const login = require('../middleware/validateLogin');
const validate = require('../middleware/validateRegister');
const validateUpdate = require('../middleware/update');
const { createUser, getProduct, createProduct, obtenerProductoId, deleteProduct,
       renderIndex, renderRegister, renderLogin,
        loginSesion, getUser, deleteUser, updateUser, obtenerUsuarioId,
       updateProduct } = require('../controllers/indeControllers');

// rutas para Login y Register
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.get('/usuarios', getUser);
router.post('/login', login,loginSesion);
router.post('/register', validate,createUser);


// rutas para operaciones CRUD
router.get('/', renderIndex);
router.get('/products', getProduct);
// router.post('/products', createProduct);
router.get('/products/:id', obtenerProductoId);
router.get('/usuarios/:id', obtenerUsuarioId)
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.put('/usuarios/edit/:id', updateUser);
router.delete('/usuarios/delete/:id', deleteUser);

module.exports = router;