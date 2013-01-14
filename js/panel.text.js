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
