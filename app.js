var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );
var app = express();
var server = http.createServer(app);

var io = socket.listen( server);
var balsal;
var client_id = 0;
io.sockets.on( 'connection', function( client ) {

    console.log( "New client id: ", client_id++);
    client.on( 'message', function( data ) {
        console.log( 'Message received ' + data.name + ":" + data.message );

        io.sockets.emit( 'message', { name: data.name, message: data.message  } );
    });

});
app.set('port', (process.env.PORT || 8000));
app.get('/', function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

server.listen( app.get('port'),function () {
    console.log('Node app is running on port', app.get('port'));
} );
