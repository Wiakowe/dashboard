WDB.Panel.Time = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.Time',

    initialize: function(obj, settings) {

        WDB.Panel.prototype.initialize(obj, settings);

        this.object = this.object;
        this.settings = this.settings;

        this.draw();

        this.stylePanel();

        this.timer();
    },

    timer: function() {

        var panelTimer = this;

        setInterval(function(){
            panelTimer.draw()
        }, 500);
    },

    styleElement: function() {
        this.styleTextValue();
    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {

        var today=new Date();

        this.settings.value = this.checkTime(today.getHours())+':'+this.checkTime(today.getMinutes())+':'+this.checkTime(today.getSeconds());
        this.settings.label = this.checkTime(today.getDate())+'/'+this.checkTime(today.getMonth()+1)+'/'+today.getFullYear();

        this.appendBoxValue();
        this.appendBoxLabel();

        this.styleElement();
    },

    checkTime: function(i)
    {
        if (i < 10) {
            return "0"+i;
        }
        return i;
    }
});
