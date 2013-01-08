WDB.Panel.SVG.Cake = WDB.Class(WDB.Panel.SVG, {

    initialize: function(obj, settings) {

        if (!settings.values) {
            return false;
        }

        WDB.Panel.SVG.prototype.initialize(obj, settings);

        this.data = this.settings.values;

        this.draw();

    },

    draw: function() {

        var numElements = this.data.length;

        var sumValues = 0;

        for (var i = 0; i < numElements; i++) {
            sumValues += this.data[i];
        }

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';


        var length = (this.width/2)-50;

        var sumAngle = 0;
        var centerX, centerY, startX, startY, endX, endY;

        //for (i = 0; i < numElements; i++) {
        for (i = 0; i < 1; i++) {

            var path = document.createElementNS(this.svgns, "path");

            var angle = Math.PI * (this.data[i]/sumValues);

            sumAngle += angle;

            centerX = (this.width/2);
            centerY = (this.height-15);

            if (i == 0) {
                startX = centerX - length;
                startY = centerY;
            } else {
                startX = endX;
                startY = endY;
            }

            endX = centerX - Math.cos(sumAngle)*length;
            endY = centerY - Math.sin(sumAngle)*length;

            path.setAttributeNS(null, "d", "M"+centerX+" "+centerY+" L"+startX+" "+startY+" A"+length+","+length+" 0 0,1 "+endX+","+endY+" Z");
            path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
            path.setAttributeNS(null, "stroke", colorAdd);
            path.setAttributeNS(null, "stroke-width", '5');

            this.svgElement.append(path);
        }

        if (this.settings.label) {
            this.object.append($('<div class="boxLabel">'+this.settings.label+'</div>'));
        }

    }
});
