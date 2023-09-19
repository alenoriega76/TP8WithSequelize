const Sequelize = require ('sequelize');

const sequelize = new Sequelize('technoespacio','root','Capitan20#',{
    host: 'localhost',
    dialect: 'mysql',
});
sequelize.authenticate()
.then(()=>{
    console.log("CONEXION EXITOSA")
})
.catch((error)=>{
    console.log("ERROR" +error)
})


module.exports = sequelize;