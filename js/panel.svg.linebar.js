function SVGBarGraphPanel(obj, settings)
{
    var self = this;

    var defaultSettings = {};

    var svgElement;

    $.extend(this, new SVGPanel(obj, settings));

    settings = $.extend({}, defaultSettings, settings || {});

    if (!settings.values) {
        return false;
    }

    svgInit = this.init;

    this.init = function() {

        initSettings = svgInit();
        settings = $.extend({}, settings, initSettings);

        var numElements = settings.values.length;

        var widthBar = self.width / (numElements-1);

        var barPoints = new Array();

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';

        var maxValue = self.getMaxValueFromData(settings.values);
        maxValue += maxValue * 0.15;
        var unitHeight = self.height / maxValue;

        for (var i = 0; i < numElements; i++) {
            //create the path
            var path = document.createElementNS(self.svgns, "path");

            if (settings.values[i] !== null) {

                if (i == 0) {
                    barPoints[0] = [0, self.height - settings.values[i] * unitHeight];
                    barPoints[1] = [0, self.height];
                } else {
                    barPoints[0] = barPoints[3];
                    barPoints[1] = barPoints[2];
                }
                barPoints[2] = [widthBar*(i), self.height];
                barPoints[3] = [widthBar*(i), self.height - settings.values[i] * unitHeight];

                path.setAttributeNS(null, "d", "M"+barPoints[0][0]+" "+barPoints[0][1]+" L"+barPoints[1][0]+" "+barPoints[1][1]+" L"+barPoints[2][0]+" "+barPoints[2][1]+" L"+barPoints[3][0]+" "+barPoints[3][1]+" Z");
                path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke-width", '0.5');

                self.getSvgElement().append(path);
            }
        }
        self.appendBoxValue();
        self.appendBoxLabel();


    }

    return this.init();

}
