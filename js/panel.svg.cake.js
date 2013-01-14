WDB.Panel.SVG.Cake = WDB.Class(WDB.Panel.SVG, {

    name: 'WDB.Panel.SVG.Cake',

    initialize: function(obj, settings) {

        if (!settings.values) {
            return false;
        }

        this.data = settings.values;

        WDB.Panel.SVG.prototype.initialize(obj, settings);

        this.object = this.object;
        this.svgElement = this.svgElement;
        this.settings = this.settings;

        this.draw();
    },

    createElement: function() {

    },

    styleElement: function() {

    },

    resize: function() {
        this.resizeSvgElement();

        this.drawCake();

    },

    draw: function() {
        this.drawCake();
    },

    drawCake: function() {

        var numElements = this.data.length;

        var sumValues = 0;

        for (var i = 0; i < numElements; i++) {
            sumValues += parseInt(this.data[i]);
        }

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';

        var margin = 15;

        var length = (this.width/2)-margin * 2;

        if (length > (this.height - margin * 2)) {
            length = this.height - margin * 2;
        }

        var sumAngle = 0;
        var centerX, centerY, startX, startY, endX, endY;

        centerX = (this.width/2);
        centerY = (this.height-margin);

        this.clearSvgElement();

        for (i = 0; i < numElements; i++) {

            var path = document.createElementNS(this.settings.svgns, "path");

            var angle = Math.PI * (parseInt(this.data[i])/sumValues);
            sumAngle += angle;

            if (i == 0) {
                startX = centerX - length;
                startY = centerY;
            } else {
                startX = endX;
                startY = endY;
            }

            endX = centerX - Math.cos(sumAngle)*length;
            endY = centerY - Math.sin(sumAngle)*length;

            path.setAttributeNS(null, "d", "M"+centerX+" "+centerY+" L"+startX+" "+startY+" A"+length+" "+length+" 0 0 1 "+endX+" "+endY+" Z");
            path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
            path.setAttributeNS(null, "stroke", colorAdd);
            path.setAttributeNS(null, "stroke-width", '0.5');

            this.svgElement.append(path);
        }
        this.appendBoxLabel();
    }
});
