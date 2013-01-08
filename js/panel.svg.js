WDB.Panel.SVG = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.SVG',

    svgns: null,

    width: null,
    height: null,

    svgId: null,
    svgElement: null,

    defaultSettings: {},

    data: {},

    initialize: function(obj, settings) {

        self = this;

        defaultSettings= {
            svgns: 'http://www.w3.org/2000/svg',
            width: '300',
            height: '150'
        };
        settings = $.extend({}, defaultSettings, settings || {});


        WDB.Panel.prototype.initialize(obj, settings);

        this.width = this.object.width();
        this.height = this.object.height();

        var svgId = 'svg'+self.objectId;

        this.object.html('<svg id="'+svgId+'" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>');

        this.svgElement = $("#"+svgId);
        this.svgElement.attr('width', this.width+"px");
        this.svgElement.attr('height', this.height+"px");

        this.draw();

    },


    resizeSvgElement: function()
    {
        this.svgElement.attr('width', this.width+"px");
        this.svgElement.attr('height', this.height+"px");
    },

    getMaxValueFromData: function()
    {
        var maxValue = 0;

        for (var i = 0; i < this.data.length; i++) {
            maxValue = (maxValue < this.data[i]) ? this.data[i] : maxValue;
        }

        return maxValue;
    }

});
