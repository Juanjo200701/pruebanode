import {exit} from 'node:process';
import categoria from './categoria.js';
import precio from './precio.js';
import Categorias from '../models/Categorias.js';
import db from '../config/db.js';
import Precios from '../models/Precios.js';

const importarDatos = async () => {
    try {
        //autenticar
        await db.authenticate();
        //Generar las columnas
        await db.sync();
        //insertar los 
        await Promise.all([
            Categorias.bulkCreate(categoria),
            Precios.bulkCreate(precio),
        ])

    } catch (error) {
        console.log(error);
        exit(1);
    }
};

const eliminarDatos = async () => {
    try {
        // await Promise.all([
        //     Categorias.destroy({where: {}, truncate: true}),
        //     Precios.destroy({where: {}, truncate: true}),
        // ])
        // console.log('Datos eliminados correctamente')
        // exit();
        await db.sync({force: true});
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if(process.argv[2] === '-i'){
    importarDatos();
}

if(process.argv[2] === '-e'){
    eliminarDatos();
}