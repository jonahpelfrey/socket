var app = angular.module('trivia', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
	'use strict';

	$routeProvider
	.when('/', {
		templateUrl: 'views/connection.html',
		controller: 'ConnectController'
	})
	.otherwise({
		redirectTo: '/'
	});
	
});

app.factory('userService', function($resource) {
	return $resource('/trivia/users/:token', {}, {
		query: {
			method:'GET',
			isArray: true, 
		}
	});
});

app.factory('socket', function($rootScope) {
	var socket = io.connect('http://localhost:8000');
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootscope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});

app.controller('ConnectController', function($scope, $http, userService, socket) {
	
	$scope.users = [];
	$scope.user = {};
	$scope.name = '';
	$scope.token = '';
	$scope.socket = '';

	socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('message', function(data) {
    	$scope.socket = data;
    });

    socket.on('player.joined', function() {
    	$scope.users = userService.query({token: '12345'});
    });


    $scope.join = function() {
    	var data = {
    		token: '12345'
    	}
    	socket.emit('join.game', data);
    }

	$scope.addUser = function() {

		$http({
	      method: 'POST',
	      url: 'http://localhost:8000/trivia/user/name',
	      data: {name: $scope.name, socket: $scope.socket}
	    }).then(function successCallback(response) {
	     

	     
	     
	    }, function errorCallback(response) {
	      // called asynchronously if an error occurs
	      // or server returns response with an error status.
	      console.log(response);
	    });

	};

	$scope.start = function() {
		var data = {
			token: $scope.token
		}
		socket.emit('begin', data);
	}

});




