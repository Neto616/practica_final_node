//IP http://192.168.164.181:3010
require('dotenv').config()

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const Connection = require('./models/mySQLConnection')
const myConnection = require('express-myconnection')
const cors = require("cors");

//settings
app.set('port', 8080);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

console.log(process.env.PORT_DB)
const DB_URL = process.env.DATABASE_URL;
const dbConfig = new Connection(DB_URL);

app.use(myConnection(mysql, dbConfig.pool, 'pool'))

//routes
require('./routes/userRoutes')(app);


//statis files


app.listen(app.get('port'), () => {
		console.log('server on port 3010');
	});
