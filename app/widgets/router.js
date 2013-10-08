define(function (require) {
    var Backbone = require('Backbone');

    var AppRouter = Backbone.Router.extend({
        routes:{
            'demo' : 'demoPage'
        },

        demoPage: function(){
            var demo = require('demo');
            demo.show({ el: '#app'});
        }
    });

    var appRouter = new AppRouter();
    Backbone.history.start();
});