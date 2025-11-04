import { check, validationResult } from "express-validator";

import Usuario from '../models/Usuarios.js';

const formularioLogin = (req, res) => {
    res.render('auth/login' ,{
        tituloPagina: "Inicio de Sesión",
    });
};

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        tituloPagina: "Registro de Usuario",
    });
};

const registrar = async (req, res) => {
    //Validaciones

    await check('nombre')
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

    await check('email')
    .isEmail()
    .withMessage("Esto no parece un correo")
    .run(req);

    await check('password')
    .isLength({ min: 6 })
    .withMessage("La contraseña debe ser de al menos 6 caracteres")
    .run(req);

    await check('repeat_password')
    .equals(req.body.password)
    .withMessage("Las contraseñas no coinciden")
    .run(req);

    //verificar que el resultado este vacio
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('auth/registro', {
            tituloPagina: "Registro de Usuario",
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })
    }

    //validar si el correo ya existe en la base de datos
    const { nombre, email, password } = req.body;
    const existeUsuario = await Usuario.findOne({ where: { email}});

    if(existeUsuario){
        return res.render('auth/registro', {
            tituloPagina: "Registro de Usuario",
            errores: [{ msg: 'Ese correo ya está registrado' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        });
    }

    // Si no existe, crear el usuario
    const usuarios = await Usuario.create({
        nombre,
        email,
        password,
        token: 123,
    });
    res.json(usuarios);

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        tituloPagina: "Olvide Contraseña",
    });
};


export { formularioLogin, formularioRegistro, registrar, formularioOlvidePassword };