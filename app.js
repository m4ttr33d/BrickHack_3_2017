var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.VCAP_APP_PORT || 3000;
var pug = require('pug');
var session = require('express-session');
var sessionStore = require('connect-redis')(session);
var passportSocketIo = require("passport.socketio");
var cParse = require('cookie-parser');

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

app.get('/register', function (req, res) {
  res.render('register.pug', {})
});

//watson stuff
// var watson = require('watson-developer-cloud');
// var language_translator = watson.language_translator({
// 	username:"d508c7dc-d12c-45f7-9f99-581565efae87",
// 	password:"Y42RPmsr5qIk",
// 	version:"v2"
// });
//
// language_translator.translate({
// 	text:'hello', //get from input text
// 	source:'en', //get from profile
// 	target:'es' //get from profile
// 	}, function(err, translation){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(translation);
// });

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

// //sessions :)
// app.use(passportSocketIo.authorize({
//   cookieParser: cParse,       // the same middleware you registrer in express
//   key:          'express.sid',       // the name of the cookie where express/connect stores its session_id
//   secret:       'narwhals',          // the session_secret to parse the cookie
//   store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
//   success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
//   fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
// }));
//
// function onAuthorizeSuccess(data, accept){
//   console.log('successful connection to socket.io');
//
//   // The accept-callback still allows us to decide whether to
//   // accept the connection or not.
//   accept(null, true);
//
//   // OR
//
//   // If you use socket.io@1.X the callback looks different
//   accept();
// }
//
// function onAuthorizeFail(data, message, error, accept){
//   if(error)
//     throw new Error(message);
//   console.log('failed connection to socket.io:', message);
//
//   // We use this callback to log all of our failed connections.
//   accept(null, false);
//
//   // OR
//
//   // If you use socket.io@1.X the callback looks different
//   // If you don't want to accept the connection
//   if(error)
//     accept(new Error(message));
//   // this error will be sent to the user as a special error-package
//   // see: http://socket.io/docs/client-api/#socket > error-object
// }

