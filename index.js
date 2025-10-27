import express from 'express';
import usuarioRoutes from './routes/usuariosRoutes.js';
import db from './config/db.js';

//Crear app
const app = express();

//conexion a la db
try {
    await db.authenticate();
    console.log('Conexion correcta a la base de datos');
} catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
}

//habilitar pug

app.set('view engine', 'pug');
app.set('views', './views');  

//definir la ruta public
app.use(express.static('public'));

//routing
app.use("/auth", usuarioRoutes)

//Definir puerto
const port = process.env.PORT || 3000;

//Definir ruta
app.listen(port, () => {
    console.log('El servidor está funcionando en el puerto ' + port);
});