WDB.Dashboard = WDB.Class({

    settings: {},

    object: null,

    width: null,
    height: null,
    panels: null,
    panelObjects: null,
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

        this.settings = $.extend({}, defaultSettings, settings || {});

        this.object = obj;

        this.panelObjects = new Array();


        //set body css
        $('body').css('margin', '0px');
        $('body').css('padding', '0px');

        this.object.css('margin', '10px 0 0 10px');
        this.object.css('padding', '0px');

        //get the panels
        this.panels = this.object.find(this.settings.panelsSelector);

        this.drawDashboard();

        $(window).resize(function() {
            self.resizeDashboard();
        })

    },

    setDashboardSizes: function()
    {
        //hide dashboard
        this.object.hide();

        $('body').css('overflow', 'auto');

        //get the width and height of the window
        this.width = $(document).width();
        this.height = $(document).height();

        $('body').css('overflow', 'hidden');

        //show the dashboard
        this.object.show();
    },

    setPanelsSizes: function()
    {
        //calculate the size of the panels
        this.panelWidth = Math.round((this.width - (parseInt(this.settings.marginH) * (parseInt(this.settings.panelH) * 2))) / parseInt(this.settings.panelH));
        this.panelHeight = Math.round((this.height - (parseInt(this.settings.marginV) * (parseInt(this.settings.panelV) * 2))) / parseInt(this.settings.panelV));

        //set the default CSS data for the panels
        this.panels.width(this.panelWidth);
        this.panels.height(this.panelHeight);
        this.panels.css('float', 'left');
        this.panels.css('padding', '0px')
        this.panels.css('margin', '0 '+this.settings.marginH+' '+this.settings.marginV+' 0');

    },

    drawDashboard: function()
    {
        this.setDashboardSizes();

        this.setPanelsSizes();

        this.createPanels();
    },

    resizeDashboard: function()
    {
        this.setDashboardSizes();

        this.setPanelsSizes();


        var self = this;

        this.resizePanels();

        $('body').css('overflow', 'hidden');
    },

    resizePanels: function()
    {
        var dashboard = this;
        for (var i = 0; i < this.panelObjects.length; i++) {
            this.panelObjects[i].resize();
        }
    },

    createPanels: function()
    {
        var dashboard = this;
        this.panels.each(function(index, element) {
            dashboard.panelObjects.push(dashboard.createPanel($(element)));
        });
    },

    createPanel: function(element)
    {
        if (element.data('panel-type') == 'panel.text') {
            return new WDB.Panel.Text(element, {'text': element.data('panel-text')});
        }
        if (element.data('panel-type') == 'panel.time') {
            return new WDB.Panel.Time(element);
        }
        if (element.data('panel-type') == 'panel.image') {
            return new WDB.Panel.Image(element, {'src': element.data('panel-src')});
        }
        if (element.data('panel-type') == 'panel.svg.lineBar') {
            return new WDB.Panel.SVG.LineBar(element, {'values':element.data('panel-values').split(','), 'value': element.data('panel-value'), 'label': element.data('panel-text'), 'url': element.data('panel-url')});
        }
        if (element.data('panel-type') == 'panel.svg.cake') {
            return new WDB.Panel.SVG.Cake(element, {'values':element.data('panel-values').split(','), 'label': element.data('panel-text'), 'url': element.data('panel-url')});
        }

    }

})
