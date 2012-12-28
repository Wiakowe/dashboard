var SVGLineBarGraphPanel = SVGPanel.extend({

    init: function(obj, settings) {

        object = obj;

        if (!settings.values) {
            return false;
        }

        this._super(obj, settings);

        var numElements = settings.values.length;

        var widthBar = width / (numElements-1);

        var barPoints = new Array();

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';

        var maxValue = this.getMaxValueFromData(settings.values);
        maxValue += maxValue * 0.15;
        var unitHeight = height / maxValue;

        for (var i = 0; i < numElements; i++) {
            //create the path
            var path = document.createElementNS(svgns, "path");

            if (settings.values[i] !== null) {

                if (i == 0) {
                    barPoints[0] = [0, height - settings.values[i] * unitHeight];
                    barPoints[1] = [0, height];
                } else {
                    barPoints[0] = barPoints[3];
                    barPoints[1] = barPoints[2];
                }
                barPoints[2] = [widthBar*(i), height];
                barPoints[3] = [widthBar*(i), height - settings.values[i] * unitHeight];

                path.setAttributeNS(null, "d", "M"+barPoints[0][0]+" "+barPoints[0][1]+" L"+barPoints[1][0]+" "+barPoints[1][1]+" L"+barPoints[2][0]+" "+barPoints[2][1]+" L"+barPoints[3][0]+" "+barPoints[3][1]+" Z");
                path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke-width", '0.5');

                svgElement.append(path);
            }
        }
        this.appendBoxValue(settings);
        this.appendBoxLabel(settings);
    }

});
