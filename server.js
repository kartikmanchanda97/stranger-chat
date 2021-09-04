const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);
const io = socket(server);

app.use(express.static('public'));

const user = {}

io.on('connect', socket => {
	socket.on('user-name', name => {
		user[socket.id] = name;
		socket.broadcast.emit('broadcast', name);
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('disconnect-message', user[socket.id]);
	});

	socket.on('chatMessage', msg => {
		io.emit('message',{msg, name: user[socket.id]});
	});
});


server.listen(5000, () => console.log('Server running on port 5000'));