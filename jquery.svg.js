(function($, window, document, undefined) {

    $.fn.svg = function(settings) {

        var self = this;

        var svgns = "http://www.w3.org/2000/svg";

        var defaultSettings = {};

        this.initialize = function() {


        };

        return self.initialize();
    }

    $.fn.textPanel = function(settings) {

        var textPanel = new TextPanel(this, settings);
    }

    $.fn.timePanel = function(settings) {

        var timePanel = new TimePanel(this, settings);
    }

    $.fn.svgBarGraphPanel = function(settings) {

        var svgBarGraphPanel = new SVGBarGraphPanel(this, settings);
    }

    $.fn.svgCakeGraphPanel = function(settings) {

        var svgCakeGraphPanel = new SVGCakeGraphPanel(this, settings);
    }

})(jQuery, window, document);



function BasePanel(obj, settings) {

    var self = this;

    var defaultSettings = {};

    settings = $.extend({}, defaultSettings, settings || {});

    this.init = function() {

    }

    this.callback = function() {
        console.log('callback');


    }
}

function SVGCakeGraphPanel(obj, settings)
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

            path.setAttributeNS(null, "d", "M"+centerX+" "+centerY+" L"+startX+" "+startY+" A100 100 0 0 1 "+endX+" "+endY+" Z");
            path.setAttributeNS(null, "fill", (i % 2 == 0) ? colorEven : colorAdd);
            path.setAttributeNS(null, "stroke", colorAdd);
            path.setAttributeNS(null, "stroke-width", '0.5');

            self.getSvgElement().append(path);
        }


        if (settings.label) {
            obj.append($('<div class="boxLabel">'+settings.label+'</div>'));
        }

    }

    return this.init();

}

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

        if (settings.value) {
            obj.append($('<div class="boxValue">'+settings.value+'</div>'));
            if (settings.label) {
                obj.append($('<div class="boxLabel">'+settings.label+'</div>'));
            }
        }

    }

    return this.init();

}

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

    return this.init();
}

function TextPanel(obj, settings) {

    var self = this;

    if (!settings.text) {
        return false;
    }

    var defaultSettings = {};

    settings = $.extend({}, defaultSettings, settings || {});

    $.extend(this, new BasePanel());

    this.init = function() {

        var objectId = obj.attr('id');

        var textValue = $('#'+objectId+'TextValue');
        if (!textValue.length) {
            textValue = $('<div id="'+objectId+'TextValue" class="boxValue"></div>');
            obj.append(textValue);
        }
        textValue.text(settings.text);
    }
    /*
    baseHello = this.hello;

    this.hello = function() {
        baseHello();
        console.log('say hello to the Child Class');
    }
    */

    return this.init();
}

function TimePanel(obj, settings) {
    var self = this;

    var defaultSettings = {};

    settings = $.extend({}, defaultSettings, settings || {});

    $.extend(this, new BasePanel());

    this.callback = function() {
        self.printTime();
        console.log('printTime');
    }

    this.init = function() {
        self.printTime();

        t = setTimeout(
            function(){
                obj.timePanel();
            },500
        );
    }

    this.printTime = function() {
        var today=new Date();

        var elementId = obj.attr('id');

        var timerValue = $('#'+elementId+'TimerValue');
        if (!timerValue.length) {
            timerValue = $('<div id="'+elementId+'TimerValue" class="boxValue"></div>');
            obj.append(timerValue);
        }
        timerValue.text(self.checkTime(today.getHours())+':'+self.checkTime(today.getMinutes())+':'+self.checkTime(today.getSeconds()));

        var dateValue = $('#'+elementId+'DateValue');
        if (!dateValue.length) {
            dateValue = $('<div id="'+elementId+'DateValue" class="boxLabel"></div>');
            obj.append(dateValue);
        }

        dateValue.text(self.checkTime(today.getDate())+'/'+self.checkTime(today.getMonth()+1)+'/'+today.getFullYear());
    }

    this.checkTime = function(i)
    {
        if (i < 10) {
            return "0"+i;
        }
        return i;
    }

    return this.init();

}
