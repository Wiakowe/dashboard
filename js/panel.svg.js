WDB.Panel.SVG = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.SVG',

    svgns: null,

    width: null,
    height: null,

    svgId: null,
    svgElement: null,

    data: new Array(),

    initialize: function(obj, settings) {

        self = this;

        defaultSettings= {
            svgns: 'http://www.w3.org/2000/svg',
            width: '300',
            height: '150'
        };

        this.defaultSettings = $.extend({}, this.defaultSettings, defaultSettings || {});

        settings = $.extend({}, this.defaultSettings, settings || {});

        WDB.Panel.prototype.initialize(obj, settings);

        this.width = this.object.width();
        this.height = this.object.height();

        var svgId = self.object.attr('id')+'Svg';

        this.object.html('<svg id="'+svgId+'" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>');

        this.svgElement = this.object.find("#"+svgId);
        this.svgElement.attr('width', this.width+"px");
        this.svgElement.attr('height', this.height+"px");

        this.data = settings.values;

        this.draw();

    },

    timer: function()
    {
        if (this.settings.url) {
            var panelTimer = this;
            setInterval(function(){
                $.ajax({
                    url: panelTimer.settings.url,
                    method: 'get',
                    dataType: 'json',
                    success: function(data) {
                        panelTimer.data = data.values;
                        panelTimer.settings.value = data.value;
                        panelTimer.draw()
                    }
                });
            }, 1500);
        }
    },

    clearSvgElement: function() {
        this.svgElement.empty();
    },


    resizeSvgElement: function()
    {
        this.width = this.object.width();
        this.height = this.object.height();

        this.svgElement.attr('width', this.width+"px");
        this.svgElement.attr('height', this.height+"px");
    },

    getMaxValueFromData: function()
    {
        var maxValue = 0;

        for (var i = 0; i < this.data.length; i++) {
            maxValue = (maxValue < parseInt(this.data[i])) ? parseInt(this.data[i]) : maxValue;
        }

        return maxValue;
    }

});
