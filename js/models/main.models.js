angular.module('main.models', ['ngResource'])

.constant("server_config",{ url : "https://galadriel.ired.unam.mx:3005" })

.factory('students', function($resource, server_config) {
	return $resource(server_config.url + '/students/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('teachers', function($resource, server_config) {
	return $resource(server_config.url + '/teachers/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('assignments', function($resource, server_config) {
	return $resource(server_config.url + '/assignments/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('origins', function($resource, server_config) {
	return $resource(server_config.url + '/origins/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('events', function($resource, server_config) {
	return $resource(server_config.url + '/events/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('schools', function($resource, server_config) {
	return $resource(server_config.url + '/schools/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('fields', function($resource, server_config) {
	return $resource(server_config.url + '/fields/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('grades', function($resource, server_config) {
	return $resource(server_config.url + '/grades/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('categories', function($resource, server_config) {
	return $resource(server_config.url + '/categories/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('users', function($resource, server_config) {
	return $resource(server_config.url + '/users/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('login', function($resource, server_config) {
	return $resource(server_config.url + '/login/:account_email/:account_password', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('navigation', function($resource, server_config) {
	return $resource(server_config.url + '/navigation/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
});