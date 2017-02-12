var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.VCAP_APP_PORT || 3000;
var pug = require('pug');

//watson stuff
// var watson = require('watson-developer-cloud');
// var language_translator = watson.language_translator({
//   username:"d508c7dc-d12c-45f7-9f99-581565efae87",
//   password:"Y42RPmsr5qIk",
//   version:"v2"
// });

// language_translator.translate({
//   text: 'hello', //get from input text
//   source: 'en', //get from profile
//   target: 'es' //get from profile
// }, function(err, translation){
//   if(err)
//     console.log(err);
//   else
//     console.log(translation);
// });

//enable pug
app.set('view engine', 'pug');
//allow assets to be found
app.use(express.static(__dirname));

//routes
app.get('/', function(req, res){
  res.render('index.pug', {});
});

app.get('/login', function (req, res) {
  res.render('login.pug', {})
});

<<<<<<< HEAD

//watson stuff
var watson = require('watson-developer-cloud');
var language_translator = watson.language_translator({
	username:"d508c7dc-d12c-45f7-9f99-581565efae87",
	password:"Y42RPmsr5qIk",
	version:"v2"
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

=======
>>>>>>> 5d9156a39a1e03872fccc787933d53773f70d357
//connection && listen on port
io.on('connection', function(socket) {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(port, function(){
    console.log('listening on *:3000');
});

