WDB.Panel.Text = WDB.Class(WDB.Panel, {

    textValue: null,

    name: 'WDB.Panel.Text',

    initialize: function(obj, settings) {
        if (!settings.value) {
            return false;
        }

        WDB.Panel.prototype.initialize(obj, settings);

        this.object = this.object;
        this.settings = this.settings;

        this.draw();

        this.stylePanel();
    },

    styleElement: function() {
        this.styleTextValue();
    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {
        this.appendBoxValue();
        this.appendBoxLabel();

        this.styleElement();
    }

});
