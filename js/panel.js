WDB.Panel = WDB.Class({

    object: null,
    objectId: null,

    settings: null,

    defaultSettings: {},

    self: null,

    name: 'WDB.Panel',

    initialize: function(obj, settings) {

        this.settings = new Array();
        this.settings = $.extend({}, this.defaultSettings, settings || {});

        this.object = obj;

        this.objectId = obj.attr('id');

    },

    resize: function() {
    },

    draw: function() {
    },

    appendBoxValue: function() {
        if (this.settings.value) {
            boxValue = this.object.find('.boxValue');
            if (!boxValue.length) {
                this.object.append($('<div class="boxValue">'+this.settings.value+'</div>'));
                boxValue = this.object.find('.boxValue');
            } else {
                boxValue.text(this.settings.value);
            }
            boxValue.css('line-height', this.object.height()+"px");
        }
    },


    appendBoxLabel: function() {
        if (this.settings.label) {
            boxLabel = this.object.find('.boxLabel');
            if (!boxLabel.length) {
                this.object.append($('<div class="boxLabel">'+this.settings.label+'</div>'));
                boxLabel = this.object.find('.boxLabel');
            } else {
                boxLabel.text(this.settings.label);
            }
        }
    }
})

