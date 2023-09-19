const fs = require("fs");
const bcrypt = require("bcrypt");
const session = require('express-session');
const producto = require("../model/modelProduct");
const usuario = require("../model/modelUser");
const Sequelize = require("../db/sequelize");

// pagina inicio
const renderIndex = (req, res) => {
    res.render('index');
};
const renderLogin = (req, res) => {
    res.render('login', { errors: [] });
};
const renderRegister = (req, res) => {
    res.render('register', { errors: [] });
}
const renderProductos= (req,res) => {
    res.render('productos', { errors: [] });
}
const renderNuevoProducto = (req,res) => {
    res.render('newProduct', { errors: [] });
}
const loginSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            console.log('Contraseña correcta');
            req.session.usuario = user;
            res.render('perfil', { usuario: user }); // Pasar el usuario como variable a la vista
        } else {
            console.log('Contraseña incorrecta');
            res.status(401).send('Contraseña incorrecta');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al autenticar usuario');
    }
};

// creo el registro 
const createUser = async (req, res) => {
    const { name, email, password, userName, fec_nac } = req.body;
    try {
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await usuario.create({
            name,
            email,
            password: hashedPassword, 
            userName,
            fec_nac
        });
        
        console.log("Usuario creado con éxito")
        res.status(200).json(newUser); 
        res.render('/')
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al crear un usuario");
    }
}


//leo los registros

const getUser = async (req, res) => {
    try {
        const users = await usuario.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los usuarios");
    }

}

// actualiza los usuarios
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, userName, fec_nac } = req.body;
    try {
        const user = await usuario.findByPk(id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        await user.update({
            name,
            email,
            password,
            userName,
            fec_nac
        });
        res.status(200).send("Usuario actualizado con éxito");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar usuario");
    }
}

const obtenerUsuarioId = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await
            usuario.findByPk(id);
        res.status(200).json(userId);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Usuario no encontrado" })
    }
}

//elimino los usuarios

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usuario.findByPk(id); 
        if (!user) {
            return res.status(404).send("Usuario no encontrado"); 
        }
        await user.destroy();
        res.status(200).send("Usuario eliminado con éxito");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al eliminar usuario");
    }
};
//////////productos!!!!!!/////////////
// creo un producto nuevo

const createProduct = async (req, res) => {
    console.log(req.body);
    const { name, description, price } = req.body;
  
    try {
       
      const newProduct = await producto.create({
        name,
        description,
        price,
      });
  
      console.log("Producto Creado con éxito");
      res.redirect('/products');
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Error al crear el producto" });
    }
  };
  
  // Función para obtener todos los productos
  const getProduct = async (req, res) => {
    try {
      const products = await producto.findAll();
      res.render('productos', { products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Error al obtener los productos" });
    }
  }
//actualiza el producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const product = await producto.findByPk(id); 
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        await product.save(); 
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
}


//elimina un producto

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }


        await product.destroy({
            where: { idProduct: id }
        });

        res.status(200).json({ message: 'Producto eliminado' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}

const obtenerProductoId = async (req, res) => {
    try {
        const { id } = req.params;
        const productId = await
            producto.findByPk(id);
        res.status(200).json(productId);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Producto no encontrado" })
    }
}
module.exports = {
    createUser,
    getUser,
    renderIndex,
    updateUser,
    deleteUser,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    obtenerUsuarioId,
    obtenerProductoId,
    renderLogin,
    renderRegister,
    loginSesion,
    renderProductos,
    renderNuevoProducto
};