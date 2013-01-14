WDB.Panel.Time = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.Time',

    timerValue: null,
    dateValue: null,

    initialize: function(obj, settings) {

        WDB.Panel.prototype.initialize(obj, settings);

        this.object = this.object;
        this.settings = this.settings;

        self = this;

        this.draw();

        t = setTimeout(
            function(){
                self.draw();
            },500
        );

    },

    createElement: function() {
        this.timerValue = $('#'+this.objectId+'TimerValue');
        if (!this.timerValue.length) {
            this.timerValue = $('<div id="'+this.objectId+'TimerValue" class="boxValue"></div>');
            this.object.append(this.timerValue);
        }

        this.dateValue = $('#'+this.objectId+'DateValue');
        if (!this.dateValue.length) {
            this.dateValue = $('<div id="'+this.objectId+'DateValue" class="boxLabel"></div>');
            this.object.append(this.dateValue);
        }
    },

    styleElement: function() {
        this.timerValue.css('line-height', this.object.height()+"px");

    },

    resize: function() {
        this.styleElement();
    },

    draw: function() {

        this.createElement();
        this.styleElement();

        var today=new Date();

        this.timerValue.text(this.checkTime(today.getHours())+':'+this.checkTime(today.getMinutes())+':'+this.checkTime(today.getSeconds()));

        this.dateValue.text(this.checkTime(today.getDate())+'/'+this.checkTime(today.getMonth()+1)+'/'+today.getFullYear());
    },

    checkTime: function(i)
    {
        if (i < 10) {
            return "0"+i;
        }
        return i;
    }
});
