//IP http://192.168.164.181:3010

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('./models/mySQLConnection')
const myConnection = require('express-myconnection')
const cors = require("cors");
require('dotenv').config()

//settings
app.set('port', process.env.PORT || 3010);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

//Configuracion de la base de datos (host, usuario, contrase�a, nombre de la DB y puerto)
const dbConfig = new Connection(
	(process.env.HOST || 'localhost'),
	(process.env.USR || 'root'),
	(process.env.PASS || 'Neto_616'),
	(process.env.DB || 'clasePrueba'),
	(process.env.PORT_DB || '3306')
);

app.use(myConnection(mysql, dbConfig.pool, 'pool'))

//routes
require('./routes/userRoutes')(app);


//statis files


app.listen(app.get('port'), () => {
		console.log('server on port 3010');
	});
