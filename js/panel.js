WDB.Panel = WDB.Class({

    object: null,
    objectId: null,

    settings: null,

    defaultSettings: {
        fontMaxSize: 40,
        fontValueMaxSize: 40,
        fontLabelMaxSize: 10,
        style: {
            backgroundColor: '#BBBBBB'
        }
    },

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

    stylePanel: function() {
        this.object.css('background-color', this.settings.style.backgroundColor);
    },

    styleTextValue: function() {
        if (this.valueText) {
            fontSize = this.object.width() / this.valueText.text().length * 1.5;
            if (this.defaultSettings.fontValueMaxSize) {
                fontSize = Math.min(fontSize, this.object.height() * this.defaultSettings.fontValueMaxSize / 100);
            } else if (this.defaultSettings.fontMaxSize) {
                fontSize = Math.min(fontSize, this.object.height() * this.defaultSettings.fontMaxSize / 100);
            }
            this.valueText.css('font-size', fontSize);
            this.valueText.css('line-height', this.object.height()+"px");
        }

        if (this.labelText) {
            fontSize = this.object.width() / 10;
            if (this.defaultSettings.fontLabelMaxSize) {
                fontSize = Math.min(fontSize, this.object.height() * this.defaultSettings.fontLabelMaxSize / 100);
            }
            this.labelText.css('font-size', fontSize);
        }


    },

    appendBoxValue: function() {

        if (this.settings.value) {
            if (!this.valueText) {
                this.valueText = $('<div class="dashboardPanelValue"></div>');
                this.object.append(this.valueText);
            }
            this.valueText.text(this.settings.value);
            this.styleTextValue();
        }
    },


    appendBoxLabel: function() {
        if (this.settings.label) {
            if (!this.labelText) {
                this.labelText = $('<div class="dashboardPanelLabel">'+this.settings.label+'</div>');
                this.object.append(this.labelText);
            }
            this.labelText.text(this.settings.label);
        }
    }
})

