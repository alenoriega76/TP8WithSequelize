const  {body,validationResult}=require('express-validator');
const validateUpdate=[
    body('name').notEmpty().withMessage("Este campo no puede estar vacio")
    .bail(),
    body('description').notEmpty().withMessage("Ingrese la descripcion "),
    body('price').notEmpty().withMessage("Ingrese el precio"),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next();
    }
    
] 
module.exports =validateUpdate;