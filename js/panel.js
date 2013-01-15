WDB.Panel = WDB.Class({

    object: null,
    objectId: null,

    settings: null,

    defaultSettings: {},

    self: null,

    valueText: null,
    labelText: null,

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

    styleTextValue: function() {
        if (this.valueText) {
            this.valueText.css('font-size', this.object.width() / this.valueText.text().length * 1.5)
            this.valueText.css('line-height', this.object.height()+"px");
        }

    },

    appendBoxValue: function() {
        if (this.settings.value) {
            if (!this.valueText) {
                this.valueText = $('<div class="boxValue"></div>');
                this.object.append(this.valueText);
            }
            this.valueText.text(this.settings.value);
            this.styleTextValue();
        }
    },


    appendBoxLabel: function() {
        if (this.settings.label) {
            if (!this.labelText) {
                this.labelText = $('<div class="boxLabel">'+this.settings.label+'</div>');
                this.object.append(this.labelText);
            }
            this.labelText.text(this.settings.label);
        }
    }
})

