WDB.Panel.SVG.LineBar = WDB.Class(WDB.Panel.SVG, {

    name: 'WDB.Panel.SVG.LineBar',

    initialize: function(obj, settings) {

        if (!settings.values && !settings.url) {
            return false;
        }

        this.data = settings.values;

        WDB.Panel.SVG.prototype.initialize(obj, settings);

        this.object = this.object;
        this.svgElement = this.svgElement;
        this.settings = this.settings;

        if (!this.data) {
            this.ajaxLoad();
        }

        console.log(this.settings);

        this.draw();

        this.timer();
    },

    createElement: function() {
    },

    styleElement: function() {

        this.stylePanel();

        this.styleTextValue();
    },

    resize: function() {

        this.resizeSvgElement();

        this.drawLineBar();

        this.styleElement();
    },

    draw: function() {

        this.drawLineBar();
    },

    drawLineBar: function() {

        if (!this.data) {
            return false;
        }

        var numElements = this.data.length;

        var widthBar = this.width / (numElements-1);

        var barPoints = new Array();

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';

        var maxValue = this.getMaxValueFromData(this.data);
        maxValue += maxValue * 0.15;
        var unitHeight = this.height / maxValue;

        this.clearSvgElement();

        for (var i = 0; i < numElements; i++) {
            //create the path
            var path = document.createElementNS(this.settings.svgns, "path");

            if (parseInt(this.data[i]) !== null) {

                if (i == 0) {
                    barPoints[0] = [0, this.height - parseInt(this.data[i]) * unitHeight];
                    barPoints[1] = [0, this.height];
                } else {
                    barPoints[0] = barPoints[3];
                    barPoints[1] = barPoints[2];
                }
                barPoints[2] = [widthBar*(i), this.height];
                barPoints[3] = [widthBar*(i), this.height - parseInt(this.data[i]) * unitHeight];

                path.setAttributeNS(null, "d", "M"+barPoints[0][0]+" "+barPoints[0][1]+" L"+barPoints[1][0]+" "+barPoints[1][1]+" L"+barPoints[2][0]+" "+barPoints[2][1]+" L"+barPoints[3][0]+" "+barPoints[3][1]+" Z");
                path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke", (i % 2 == 0) ? colorEven : colorAdd);
                path.setAttributeNS(null, "stroke-width", '0.5');
                $(this.svgElement).append(path);
            }
        }
        this.appendBoxValue();
        this.appendBoxLabel();
    }

});
