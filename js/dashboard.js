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
            'panelsSelector':   'li',
            'panelsSettings': {
                colorOdd: '#D8295D',
                colorEven: '#FC3370'
            }
        };

        var panelSettings = $.extend({}, defaultSettings.panelsSettings, settings.panelsSettings || {});
        this.settings = $.extend({}, defaultSettings, settings || {});

        this.settings.panelsSettings = panelSettings;

        this.object = obj;

        this.object.css('padding', 0);
        this.object.css('margin', 0);
        this.object.css('float', 'left');

        this.panelObjects = new Array();
        this.panels = new Array();

        this.createPanels();

        //this.drawDashboard();

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
        this.panels.css('margin-right', this.settings.marginV);
        this.panels.css('margin-bottom', this.settings.marginH);

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
        var ulContainer = $('<ul id="'+this.object.attr('id')+'" class="dashboard"/>');

        var dashboard = this;

        $(this.settings.panels).each(function(index, element) {


            var panelClass= "dashboardPanel";
            if (element.class) {
                panelClass += " "+element.class;
            }
            var liPanel = $('<li id="'+dashboard.object.attr('id')+'Panel'+index+'" class="'+panelClass+'"></li>');
            dashboard.panelObjects.push(dashboard.createPanel(liPanel, element));

            ulContainer.append(liPanel)
        });

        this.object.append(ulContainer);

        this.panels = this.object.find('li.dashboardPanel');

        this.resizeDashboard();
    },

    createPanel: function(element, settings)
    {
        settings = $.extend({}, this.settings.panelsSettings, settings || {});

        if (settings.type == 'text') {
            return new WDB.Panel.Text(element, settings);
        }
        if (settings.type == 'time') {
            return new WDB.Panel.Time(element, settings);
        }
        if (settings.type == 'image') {
            return new WDB.Panel.Image(element, settings);
        }
        if (settings.type == 'svg.lineBar') {
            return new WDB.Panel.SVG.LineBar(element, settings);
        }
        if (settings.type == 'svg.cake') {
            return new WDB.Panel.SVG.Cake(element, settings);
        }
    }
})
