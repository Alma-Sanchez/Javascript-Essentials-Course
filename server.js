const PORT = 8080;

const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const io = require('socket.io')(server);

const messageHistory = [];

// Server the files in the client folder
app.use(express.static('client'));

io.on('connection', function(socket) {
	const messageHistoryLength = messageHistory.length;
	
	if(messageHistoryLength > 1) {
		console.log(`length ${messageHistoryLength}`);
		
		for (let i = 0; i < messageHistoryLength; i++) {
			console.log(`message ${messageHistory[i]}`);
			io.emit('messageInfo', messageHistory[i]);
		}
	}
	
	socket.on('messageInfo', function(info) {
		messageHistory.push(info);
		io.emit('messageInfo', info);
		console.log(messageHistory.length)
	});
});

server.listen(PORT, function() {
	console.log(`Listening at port: ${PORT}`);
});