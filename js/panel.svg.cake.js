var SVGCakeGraphPanel = SVGPanel.extend({

    init: function(obj, settings) {

        object = obj;

        if (!settings.values) {
            return false;
        }

        this._super(obj, settings);

        var numElements = settings.values.length;

        var sumValues = 0;

        for (var i = 0; i < numElements; i++) {
            sumValues += settings.values[i];
        }

        var colorEven = '#FC3370';
        var colorAdd = '#D8295D';


        var length = (self.width/2)-50;

        var sumAngle = 0;
        var centerX, centerY, startX, startY, endX, endY;

        for (i = 0; i < numElements; i++) {

            var path = document.createElementNS(self.svgns, "path");

            var angle = Math.PI * (settings.values[i]/sumValues);
            sumAngle += angle;

            centerX = (self.width/2);
            centerY = (self.height-15);

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
            path.setAttributeNS(null, "stroke-width", '0.5');

            svgElement.append(path);
        }


        if (settings.label) {
            obj.append($('<div class="boxLabel">'+settings.label+'</div>'));
        }

    }
});
