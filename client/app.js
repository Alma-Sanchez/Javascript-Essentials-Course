(function() {
	const socket = io();

	$('form').on('submit', function() {
		let text = $('#message').val();
		let initials = $('#initials').val();
		
		socket.emit('messageInfo', {username: initials, message: text});
	
		$('#message').val(''); // clear input
		
		return false;
	})
	
	socket.on('messageInfo', function(msg) {
		let listElement = $('<li>');
		let usernameSpan = document.createElement("div");
		usernameSpan.innerHTML = msg.username;
		usernameSpan.className = "display_initials";
		
		let messageSpan = document.createElement("div");
		messageSpan.innerHTML = msg.message;
		messageSpan.className = "display_message";
		
		listElement.append(usernameSpan, messageSpan);
		
		listElement.appendTo('#history');
	})
})();