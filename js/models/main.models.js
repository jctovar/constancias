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

.factory('groups', function($resource, server_config) {
	return $resource(server_config.url + '/groups/:id', { id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('certificates', function($resource, server_config) {
	return $resource(server_config.url + '/certificates/:id', { id : '@_id' },
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

.factory('dates', function($resource, server_config) {
	return $resource(server_config.url + '/dates/:id', { id : '@_id' },
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

.factory('roles', function($resource, server_config) {
	return $resource(server_config.url + '/roles/:id', { id : '@_id' },
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

.factory('accounts', function($resource, server_config) {
	return $resource(server_config.url + '/accounts/:id', { id : '@_id' },
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
})

.factory('pdf_template', function () {
    return function(data) {  
        var template = {
            pageSize: 'LETTER',
            pageOrientation: 'landscape',
            pageMargins: [ 40, 60, 40, 60 ],
            footer: {
                columns: [
                data.date_date,
                { text: data.students_has_date_uuid, alignment: 'right' }
                ]
            },
            content: [
            {
                text: 'Otorga la presente',
                style: 'text',
                margin: [ 5, 100, 5, 5 ]
            },
            {
                text: 'Constancia',
                style: 'title',
            },
            {
                text: 'por su participación a:',
                style: 'text',
                margin: [ 5, 5, 5, 24 ]
            },
            {
                text: data.student_firstname + ' ' + data.student_lastname,
                style: 'name',
                margin: [ 5, 2, 10, 20 ]
            },
            {
                text: data.event_text, 
                style: 'body',
                margin: [ 5, 24, 5, 24 ]
            }
            ],
            styles: {
            header: {
                bold: true,
                color: '#000',
                fontSize: 11
            },
            title: {
                fontSize: 32,
                bold: true,
                alignment: 'center'
            },
            text: {
                color: '#666',
                fontSize: 18,
                bold: true,
                alignment: 'center'
            },
            body: {
                color: '#666',
                fontSize: 18,
                italics: true,
                alignment: 'center'
            },
            name: {
                color: '#666',
                fontSize: 28,
                italics: true,
                bold: true,
                alignment: 'center'
            }
            }
        };
        
        return template;
    }
});