require("dotenv").config();
const http = require('http');
const app = require('./index');
const session = require('express-session');


const server = http.createServer(app);
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
server.listen(process.env.PORT);