const http = require ('http');
const app = require('./app');

const hostname = '127.0.0.1';
const port = 3500;

const server = http.createServer(app);


server.listen (port, hostname, () =>{
	console.log('Server started on port ' + port)
});