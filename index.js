/**
 * Created by mattpiekarczyk on 11/4/15.
 */
"use strict"

var _ = require('lodash')
var options = {}

for(var i= 2, len=process.argv.length; i<len; i++){
    var argument = process.argv[i].split(':')
    options[argument[0]] = argument[1]
}

_.extend(options, {
    resourceName: 'actions',
    resourceFormat: {
        required$: ['sourceId','name'],
        only$: ['id','sourceId','type','name','targets','suspenseDate','content'],
        id: 'string$',
        sourceId: 'string$',
        type: 'string$',
        name: 'string$',
        targets: 'object$',
        suspenseDate: 'string$',
        content: 'object$'
    }
})

require('seneca')()
    .use('redis-transport')
    .use('resource-service', options)
    .listen({type:'redis', pin:'role:actions,cmd:get'})
    .listen({type:'redis', pin:'role:actions,cmd:query'})
    .listen({type:'redis', pin:'role:actions,cmd:add'})
    .listen({type:'redis', pin:'role:actions,cmd:modify'})
    .listen({type:'redis', pin:'role:actions,cmd:delete'})
