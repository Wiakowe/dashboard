WDB.Panel.Text = WDB.Class(WDB.Panel, {

    settings: null,


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

    draw: function() {

        var textValue = $('#'+this.objectId+'TextValue');

        if (!textValue.length) {
            textValue = $('<div id="'+this.objectId+'TextValue" class="boxValue"></div>');
            this.object.append(textValue);
        }
        textValue.css('line-height', this.object.height()+"px");
        textValue.text(this.settings.text);
    }

});
