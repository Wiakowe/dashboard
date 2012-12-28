var SVGPanel = Panel.extend({

    object: null,

    svgns: null,

    width: null,
    height: null,

    elementId: null,
    svgId: null,
    svgElement: null,

    defaultSettings: {},


    init: function(obj, settings) {

        object = obj;

        defaultSettings= {
            svgns: 'http://www.w3.org/2000/svg',
            width: '300',
            height: '150'
        };

        settings = $.extend({}, defaultSettings, settings || {});

        svgns = settings.svgns;

        width = object.width();
        height = object.height();

        elementId = object.attr('id');

        svgId = 'svg'+elementId;

        object.html('<svg id="'+svgId+'" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>');

        svgElement = $("#"+svgId);
        svgElement.attr('width', width+"px");
        svgElement.attr('height', height+"px");

    },


    resizeSvgElement: function(width, height)
    {
        svgElement.attr('width', width+"px");
        svgElement.attr('height', height+"px");
    },

    getMaxValueFromData: function(data)
    {
        var maxValue = 0;

        for (var i = 0; i < data.length; i++) {
            maxValue = (maxValue < data[i]) ? data[i] : maxValue;
        }

        return maxValue;
    }

});
