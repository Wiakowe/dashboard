var Panel = Class.create({

    settings: {},

    init: function(obj, settings) {
        var defaultSettings = {};
        settings = $.extend({}, defaultSettings, settings || {});
    },

    appendBoxValue: function(settings) {
        if (settings.value) {
            object.append($('<div class="boxValue">'+settings.value+'</div>'));
            object.find('.boxValue').css('line-height', object.height()+"px");
        }
    },


    appendBoxLabel: function(settings) {
        if (settings.label) {
            object.append($('<div class="boxLabel">'+settings.label+'</div>'));
        }
    }
})

