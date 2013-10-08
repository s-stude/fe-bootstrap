define(function (require) {
    console.log('Demo is running');

    var $ = require('jQuery'); // Not used - just example
    var _ = require('Underscore'); // Not used - just example
    var Backbone = require('Backbone');

    var headerTemplate = require('text!./templates/header.html');

    var MainView = Backbone.View.extend({
        initialize: function(){

        },
        render: function(){
            this.$el.html(headerTemplate);
        }
    });

    return {
        show: function(widgetOptions){
            var mainView = new MainView({ el: widgetOptions.el });
            mainView.render();
        }
    };
});