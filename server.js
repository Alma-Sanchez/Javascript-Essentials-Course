let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8080;
}

const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const io = require('socket.io')(server);

const messageHistory = [];

// Serve the files in the client folder
app.use(express.static('client'));

io.on('connection', function(socket) {
	const messageHistoryLength = messageHistory.length;
	
	// If there's past messages, display them
	if(messageHistoryLength > 1) {	
		for (let i = 0; i < messageHistoryLength; i++) {
			io.emit('messageInfo', messageHistory[i]);
		}
	}
	
	// Listen for new mesages
	socket.on('messageInfo', function(info) {
		messageHistory.push(info); // Add message to array
		io.emit('messageInfo', info);
	});
});

server.listen(PORT, function() {
	console.log(`Listening at port: ${PORT}`);
});