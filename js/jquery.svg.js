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
        var textPanel = new WDB.Panel.Text(this, settings);
    }

    $.fn.timePanel = function(settings) {

        var timePanel = new WDB.Panel.Time(this, settings);
    }

    $.fn.svgLineBarGraphPanel = function(settings) {

        var svgLineBarGraphPanel = new SVGLineBarGraphPanel(this, settings);
    }

    $.fn.svgCakeGraphPanel = function(settings) {

        var svgCakeGraphPanel = new SVGCakeGraphPanel(this, settings);
    }

    $.fn.dashboard = function(settings) {
        var dashboard = new WDB.Dashboard(this, settings);
    }

})(jQuery, window, document);







