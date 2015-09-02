// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
});
// tell the express app to listen on port 8000
// app.listen(8000, function() {
//  console.log("listening on port 8000");
// });

var server = app.listen(8001, function() {
	console.log("socket listening on port 8001")
});

var io = require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {
	console.log("We are using sockets!!");
	console.log(socket.id);
	socket.on("posting_form", function (data){
	    console.log('Someone clicked a button!  Values are: ' + data.name + data.location + data.language + data.comment);

	    socket.emit('updated_message', {
	    	name: data.name,
	    	location: data.location,
	    	language: data.language,
	    	comment: data.comment
	    });

	    socket.emit('random_number', {
	    	rand_num: Math.floor(Math.random() * 1000) + 1
	    })
	})
})
