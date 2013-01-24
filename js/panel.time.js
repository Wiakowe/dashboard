WDB.Panel.Time = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.Time',

    initialize: function(obj, settings) {

        WDB.Panel.prototype.initialize(obj, settings);

        this.object = this.object;
        this.settings = this.settings;

        this.draw();

        this.timer();
    },

    timer: function() {

        var panelTimer = this;

        setInterval(function(){
            panelTimer.draw()
        }, 500);
    },

    createElement: function() {
        this.valueText = $('#'+this.object.attr('id')+'TimerValue');
        if (!this.valueText.length) {
            this.valueText = $('<div id="'+this.object.attr('id')+'TimerValue" class="boxValue"></div>');
            this.object.append(this.valueText);
        }

        this.labelText = $('#'+this.object.attr('id')+'DateValue');
        if (!this.labelText.length) {
            this.labelText = $('<div id="'+this.object.attr('id')+'DateValue" class="boxLabel"></div>');
            this.object.append(this.labelText);
        }
    },

    styleElement: function() {
        this.styleTextValue();
    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {

        this.createElement();

        var today=new Date();

        this.valueText.text(this.checkTime(today.getHours())+':'+this.checkTime(today.getMinutes())+':'+this.checkTime(today.getSeconds()));

        this.labelText.text(this.checkTime(today.getDate())+'/'+this.checkTime(today.getMonth()+1)+'/'+today.getFullYear());

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
