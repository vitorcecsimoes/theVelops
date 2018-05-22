const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const AWS = require('aws-sdk');

//Routes
const userRoutes = require('./api/routes/users');

//MongoDB connection
mongoose.connect('mongodb+srv://main_user:' +
	process.env.MONGO_PW +
	'@carsappdb-mgswt.mongodb.net/test?retryWrites=false');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Headers
app.use ((req,res,next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//Request routers
app.use('/', userRoutes);


//Error handling
app.use((req,res,next) =>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

const albumBucketName = 'thevelops-assessment';
const bucketRegion = 'us-east-1';
const identityPoolId = 'C:/Users/vitorcs/.aws/credentials.txt';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

module.exports = app