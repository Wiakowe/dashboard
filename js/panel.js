var Panel = Class.create({

    settings: {},

    init: function(obj, settings) {
        var defaultSettings = {};
        settings = $.extend({}, defaultSettings, settings || {});
    },

    appendBoxValue: function() {
        if (settings.value) {
            obj.append($('<div class="boxValue">'+settings.value+'</div>'));
            obj.find('.boxValue').css('line-height', obj.height()+"px");
        }
    },


    appendBoxLabel: function() {
        if (settings.label) {
            obj.append($('<div class="boxLabel">'+settings.label+'</div>'));
        }
    }
})

