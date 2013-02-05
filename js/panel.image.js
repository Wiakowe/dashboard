WDB.Panel.Image = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.Image',

    timerValue: null,
    dateValue: null,

    initialize: function(obj, settings) {

        WDB.Panel.prototype.initialize(obj, settings);

        this.object = this.object;
        this.settings = this.settings;

        this.draw();
    },

    createElement: function() {
        this.image = $('#'+this.object.attr('id')+'Image');
        if (!this.image.length) {
            this.image = $('<img id="'+this.object.attr('id')+'Image" src="">');
            this.object.append(this.image);
        }
    },

    styleElement: function() {

        this.stylePanel();

        this.image.css('width', "90%");

        //wait for loading the image
        if ((this.object.height() == 0) || (this.image.height() == 0)) {
            var panelImage = this;
            setTimeout(function() {
                panelImage.styleElement();
            });
        } else {
            this.image.css('margin-top', Math.round((this.object.height() - this.image.height()) / 2) + "px");
            this.image.css('margin-left', Math.round((this.object.width() - this.image.width()) / 2) + "px")
        }
    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {
        this.createElement();
        this.image.attr('src', this.settings.src);

        this.styleElement();
    }
});
