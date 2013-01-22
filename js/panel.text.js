WDB.Panel.Text = WDB.Class(WDB.Panel, {

    textValue: null,

    name: 'WDB.Panel.Text',

    initialize: function(obj, settings) {
        if (!settings.text) {
            return false;
        }

        WDB.Panel.prototype.initialize(obj, settings);

        this.object = this.object;
        this.settings = this.settings;

        this.draw();
    },

    createElement: function() {
        this.valueText = $('#'+this.object.attr('id')+'TextValue');

        if (!this.valueText.length) {
            this.valueText = $('<div id="'+this.object.attr('id')+'TextValue" class="boxValue"></div>');
            this.object.append(this.valueText);
        }
    },

    styleElement: function() {
        this.styleTextValue();
    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {
        this.createElement();

        this.valueText.text(this.settings.text);

        this.styleElement();
    }

});
