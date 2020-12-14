const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/index');
const bodyPArser = require('body-parser');
const cors = require('cors');
//instancia de express en mi app
const app = express();
app.use(cors());
app.use((rec,res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    next();
});
//midleware morgan para detectar peticiones
app.use(morgan('dev'));
app.use(bodyPArser.json());
app.use(bodyPArser.urlencoded({ extend: true}));
//primera ruta
app.use('/api', apiRouter);
// .com/api/usuario
// .com/api/usuario/listar
// .com/api/usuario/registrar
// .com/api/usuario/login
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});

module.exports = app;