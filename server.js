const express = require('express'); 
const logger = require('morgan');
const movies = require('./routes/movies');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
const app = express();

//connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('secretKey', 'nodeRestApi');
mongoose.connection.on('error', console.error.bind(console, 'Mongo connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.json({"Tut":"Intro to node"});
});
//public route
app.use('/users', users);
//private route
app.use('movies', validateUser, movies);
app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});
function validateUser(req,res, next) {
	jwt.verify(req.headers['x-access-token'],
req.app.get('secretKey'), function(err, decoded) {
	if(err) {
		req.json({status:"error", message:err.message, data:null});
	} else {
		//add user id to request
		req.body.userId = decode.id;
		next();
	}
});
}

//handling 404
app.use(function(req,res,next){
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});


//handling errors
app.use(function(err, req, res, next) {
	console.log(err);
	if(err.status === 404)
		res.status(404).json({message: "Something looks wrong : (!!!"});
});

app.listen(3000, function()
	{ console.log('Server Listening on Port 2000');
});
