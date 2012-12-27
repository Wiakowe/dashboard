(function($, window, document, undefined) {

    $.fn.svg = function(settings) {

        var self = this;

        var svgns = "http://www.w3.org/2000/svg";

        var defaultSettings = {};

        this.initialize = function() {
        console.log('ahsioahsio');

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

    $.fn.dashboard = function(settings) {

        var dashboard = new Dashboard(this, settings);
    }

})(jQuery, window, document);








