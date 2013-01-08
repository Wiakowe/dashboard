WDB.Panel.SVG.LineBar = WDB.Class(WDB.Panel.SVG, {

    initialize: function(obj, settings) {

        if (!settings.values) {
            return false;
        }

        WDB.Panel.SVG.prototype.initialize(obj, settings);

        this.data = this.settings.values;

        this.draw();
    },

    draw: function() {

        var numElements = this.settings.values.length;

        var widthBar = this.width / (numElements-1);

        var barPoints = new Array();

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';

        var maxValue = this.getMaxValueFromData(this.data);
        maxValue += maxValue * 0.15;
        var unitHeight = this.height / maxValue;

        for (var i = 0; i < numElements; i++) {
            //create the path
            var path = document.createElementNS(this.settings.svgns, "path");

            if (this.data[i] !== null) {

                if (i == 0) {
                    barPoints[0] = [0, this.height - this.data[i] * unitHeight];
                    barPoints[1] = [0, this.height];
                } else {
                    barPoints[0] = barPoints[3];
                    barPoints[1] = barPoints[2];
                }
                barPoints[2] = [widthBar*(i), this.height];
                barPoints[3] = [widthBar*(i), this.height - this.data[i] * unitHeight];

                path.setAttributeNS(null, "d", "M"+barPoints[0][0]+" "+barPoints[0][1]+" L"+barPoints[1][0]+" "+barPoints[1][1]+" L"+barPoints[2][0]+" "+barPoints[2][1]+" L"+barPoints[3][0]+" "+barPoints[3][1]+" Z");
                path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke-width", '0.5');

                this.svgElement.append(path);
            }
        }
        this.appendBoxValue();
        this.appendBoxLabel();
    }

});
