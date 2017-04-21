'use strict';


module.exports = function( server ) {
    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: ['../public/bower_components/','../public'],
                defaultExtension: 'html'
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/{any*}',
        handler: function( req, rep ) {
            rep.view('index');
        }
    });
};
