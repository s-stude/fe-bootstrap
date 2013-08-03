require.config({
    paths:{
        jQuery:'./../components/jquery/jquery',
        Underscore:'./../components/underscore/underscore',
        Backbone:'./../components/backbone/backbone',
        text: './../components/requirejs-text/text'
    },

    shim:{
        'jQuery':{
            exports:'$'
        },

        'Underscore':{
            exports:'_'
        },

        'Backbone':{
            deps:['Underscore', 'jQuery'],
            exports:'Backbone'
        }
    },
    packages:[
        'demo'
    ]
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require(['router']);