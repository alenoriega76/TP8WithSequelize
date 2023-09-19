const { body, validationResult } = require('express-validator');

const validate = [
    body('email').notEmpty().withMessage('este campo email no puede estar vacio')
    .bail(),
    body('password').notEmpty().withMessage('ingrese su contraseña'),
    body('name').notEmpty().withMessage(' ingrese su nombre este campo no puede estar vacio'),
    body('userName').notEmpty().withMessage('ingrese su usuario'),
    body('fec_nac').notEmpty().withMessage('ingrese su fecha de nacimineto')
    .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body)
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.render("register", {
                errors: errors.array(),
            });
        }
        next()
    }
]
module.exports = validate;