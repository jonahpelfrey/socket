var instance = require('./socket.js');
var activeServers = [];


var serverA = instance(8000);
activeServers.push(serverA);

var serverB = instance(8080);
activeServers.push(serverB);

activeServers.forEach(function(server) {
	console.log(server.name);
})