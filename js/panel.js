WDB.Panel = WDB.Class({

    object: null,
    objectId: null,

    settings: {},

    defaultSettings: {},

    self: null,

    name: 'WDB.Panel',

    initialize: function(obj, settings) {

        self.settings = $.extend({}, this.defaultSettings, settings || {});

        self.object = obj;

        self.objectId = obj.attr('id');

    },

    resize: function() {
    },

    draw: function() {
    },

    appendBoxValue: function() {
        if (this.settings.value) {
            this.object.append($('<div class="boxValue">'+this.settings.value+'</div>'));
            this.object.find('.boxValue').css('line-height', this.object.height()+"px");
        }
    },


    appendBoxLabel: function() {
        if (this.settings.label) {
            this.object.append($('<div class="boxLabel">'+this.settings.label+'</div>'));
        }
    }
})

