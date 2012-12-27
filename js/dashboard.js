function Dashboard(obj, settings) {

    var self = this;

    var defaultSettings = {
        'marginV':          '10px',
        'marginH':          '10px',
        'panelH' :          '4',
        'panelV' :          '3',
        'panelsSelector':   'li'
    };

    settings = $.extend({}, defaultSettings, settings || {});

    var width, height, panels, panelWidth, panelHeight;

    this.initialize = function() {

        //set body css
        $('body').css('margin', '0px');
        $('body').css('padding', '0px');

        obj.css('margin', '10px 0 0 10px');
        obj.css('padding', '0px');

        self.resizeDashboard();

        $(window).resize(function() {
            self.resizeDashboard();
        })

    }

    this.resizeDashboard = function()
    {
        $('body').css('overflow', 'auto');

        //get the width and height of the window
        width = $(window).width();
        height = $(window).height();

        //calculate the size of the panels
        panelWidth = Math.round((width - (parseInt(settings.marginH) * (parseInt(settings.panelH) * 2))) / parseInt(settings.panelH));
        panelHeight = Math.round((height - (parseInt(settings.marginV) * (parseInt(settings.panelV) * 2))) / parseInt(settings.panelV));

        //get the panels
        panels = obj.find(settings.panelsSelector);

        //set the default CSS data for the panels
        panels.width(panelWidth);
        panels.height(panelHeight);
        panels.css('float', 'left');
        panels.css('padding', '0px')
        panels.css('margin', '0 '+settings.marginH+' '+settings.marginV+' 0');

        $('body').css('overflow', 'hidden');
    }

    return self.initialize();
}
