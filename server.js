const express = require('express');
const app = express();
const MongoDB = require('./database/mongodb');
const {PORT} = require('./config');
const router = require('./routes');
const server = require('http').Server(app);
const sockets = require('./sockets');

MongoDB.init();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);

sockets.socketServer(server);
server.listen(PORT , () => console.log(`server's running on port ${PORT}`));