import express from 'express';

import usuarioRoutes from './routes/usuariosRoutes.js';

//Crear app
const app = express();

//habilitar pug

app.set('view engine', 'pug');
app.set('views', './views');  

app.use("/auth", usuarioRoutes)

//Definir puerto
const port = 3000;

//Definir ruta
app.listen(port, () => {
    console.log('El servidor está funcionando en el puerto ' + port);
});