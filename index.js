/**
 * Created by mattpiekarczyk on 11/4/15.
 */
"use strict";

var _ = require('lodash');
var options = {};

for(var i= 2, len=process.argv.length; i<len; i++){
    var argument = process.argv[i].split(':');
    options[argument[0]] = argument[1];
}

_.extend(options, {
    resourceName: 'actions',
    resourceFormat: {
        required$: ['name'],
        only$: ['id', 'name', 'movementId', 'description', 'image', 'organizers'],
        name: 'string$',
        movementId: 'string$',
        description: 'string$'
    }
});

require('seneca')()
    .use('redis-transport')
    .use('resource-service', options)
    .listen({type:'redis', pin:'role:actions,cmd:get'})
    .listen({type:'redis', pin:'role:actions,cmd:query'})
    .listen({type:'redis', pin:'role:actions,cmd:add'})
    .listen({type:'redis', pin:'role:actions,cmd:modify'})
    .listen({type:'redis', pin:'role:actions,cmd:delete'})
;