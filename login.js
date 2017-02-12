var jwt = require('jsonwebtoken');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.VCAP_APP_PORT || 3000;


app.get('/login', function (req, res) {

  // TODO: validate the actual user user
  // var profile = {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   email: 'john@doe.com',
  //   id: 123
  // };
  //
  // // we are sending the profile in the token
  // var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });
  //
  // res.json({token: token});
  res.sendFile(__dirname + '/html/login.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});
