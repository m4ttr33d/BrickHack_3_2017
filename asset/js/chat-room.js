// <script>
var form = document.querySelector('form[name="chatbox"]');
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

function submitChat() {
  var msg = user + ': ' + $('#m').val();
  socket.emit('chat message', msg );
  $('#m').val('');
}

var socket = io();
user = Math.random();

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
  var m = $('#room');
  m.scrollTop(m.prop("scrollHeight"));
});
// </script>

function onEnter(event, id) {
  if (event.keyCode == 13) { document.getElementById(id).click(); }
}
function login() { console.log("hey"); }

