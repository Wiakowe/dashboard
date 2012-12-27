function SVGPanel(obj, settings, variables)
{
    var self = this;

    var defaultSettings = {
        svgns: "http://www.w3.org/2000/svg",
        width: '300',
        height: '150'
    };

    self.svgns = null;

    self.width = null;
    self.height = null;

    self.elementId = null;
    self.svgId = null;
    self.svgElement = null;

    settings = $.extend({}, defaultSettings, settings || {});

    $.extend(this, new BasePanel());

    this.init = function() {

        self.svgns = settings.svgns;

        self.width = obj.width();
        self.height = obj.height();

        self.elementId = obj.attr('id');

        self.svgId = 'svg'+self.elementId;

        obj.html('<svg id="'+self.svgId+'" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>');

        self.svgElement = $("#"+self.svgId);
        self.svgElement.attr('width', self.width+"px");
        self.svgElement.attr('height', self.height+"px");

    }

    this.resizeSvgElement = function(width, height) {
        self.svgElement.attr('width', width+"px");
        self.svgElement.attr('height', height+"px");
    }

    this.getSvgElement = function()
    {
        return self.svgElement;
    }

    this.getMaxValueFromData = function(data)
    {
        var maxValue = 0;

        for (var i = 0; i < data.length; i++) {
            maxValue = (maxValue < data[i]) ? data[i] : maxValue;
        }

        return maxValue;
    }

    this.appendBoxValue = function() {
        if (settings.value) {
            obj.append($('<div class="boxValue">'+settings.value+'</div>'));
            obj.find('.boxValue').css('line-height', obj.height()+"px");
        }
    }

    this.appendBoxLabel = function() {
        if (settings.label) {
            obj.append($('<div class="boxLabel">'+settings.label+'</div>'));
        }
    }


    return this.init();
}
