var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.VCAP_APP_PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:3000');
});

var watson = require('watson-developer-cloud');
var language_translator = watson.language_-translator({
	username: '{mdr2130}',
	password: '{CSkop991$}',
	version:'v2'
});
language_translator.translate({
	text:'hello',
	source:'en', //get from profile
	target:'es'
	}, function(err, translation){
	if(err)
		console.log(err);
	else
		console.log(translation);
		
});	
