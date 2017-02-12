var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.VCAP_APP_PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
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
var language_translator = watson.language_translator({
	     "password": "Y42RPmsr5qIk",
     "url": "https://gateway.watsonplatform.net/language-translator/api",
     "username": "d508c7dc-d12c-45f7-9f99-581565efae87"username: 'dfb9e5d8-930f-4707-9851-c7e0e504045d',
	version: 'v2'
});

language_translator.translate({
	text:'hello', //get from input text
	source:'en', //get from profile
	target:'es' //get from profile
	}, function(err, translation){
	if(err)
		console.log(err);
	else
		console.log(translation);
});	
