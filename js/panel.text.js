WDB.Panel.Text = WDB.Class(WDB.Panel, {

    settings: null,

    textValue: null,


    initialize: function(obj, settings) {
        if (!settings.text) {
            return false;
        }

        self = this;

        self.defaultSettings = {};

        self.name = 'WDB.Panel.Text';

        WDB.Panel.prototype.initialize(obj, settings);

        self.draw();
    },

    createElement: function() {
        this.textValue = $('#'+this.objectId+'TextValue');

        if (!this.textValue.length) {
            this.textValue = $('<div id="'+this.objectId+'TextValue" class="boxValue"></div>');
            this.object.append(this.textValue);
        }
    },

    styleElement: function() {
        this.textValue.css('line-height', this.object.height()+"px");
    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {
        this.createElement();

        this.styleElement();

        this.textValue.text(this.settings.text);
    }

});
