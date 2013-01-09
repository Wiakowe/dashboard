WDB.Dashboard = WDB.Class({

    settings: {},

    object: null,

    width: null,
    height: null,
    panels: null,
    panelWidth: null,
    panelHeight: null,

    initialize: function(obj, settings) {

        var self = this;

        var defaultSettings = {
            'marginV':          '10px',
            'marginH':          '10px',
            'panelH' :          '4',
            'panelV' :          '3',
            'panelsSelector':   'li'
        };

        self.settings = $.extend({}, defaultSettings, settings || {});

        self.object = obj;


        //set body css
        $('body').css('margin', '0px');
        $('body').css('padding', '0px');

        self.object.css('margin', '10px 0 0 10px');
        self.object.css('padding', '0px');

        self.resizeDashboard();

        $(window).resize(function() {
            self.resizeDashboard();
        })


    },

    resizeDashboard: function()
    {
        //hide dashboard
        this.object.hide();

        $('body').css('overflow', 'auto');

        //get the width and height of the window
        this.width = $(document).width();
        this.height = $(document).height();

        //show the dashboard
        this.object.show();

        //calculate the size of the panels
        this.panelWidth = Math.round((this.width - (parseInt(this.settings.marginH) * (parseInt(this.settings.panelH) * 2))) / parseInt(this.settings.panelH));
        this.panelHeight = Math.round((this.height - (parseInt(this.settings.marginV) * (parseInt(this.settings.panelV) * 2))) / parseInt(this.settings.panelV));

        //get the panels
        this.panels = this.object.find(this.settings.panelsSelector);

        //set the default CSS data for the panels
        this.panels.width(this.panelWidth);
        this.panels.height(this.panelHeight);
        this.panels.css('float', 'left');
        this.panels.css('padding', '0px')
        this.panels.css('margin', '0 '+this.settings.marginH+' '+this.settings.marginV+' 0');

        $('body').css('overflow', 'hidden');
    }

})
