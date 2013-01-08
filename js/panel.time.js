WDB.Panel.Time = WDB.Class(WDB.Panel, {

    name: 'WDB.Panel.Time',

    initialize: function(obj, settings) {

        self = this;

        WDB.Panel.prototype.initialize(obj, settings);

        self.draw();

        t = setTimeout(
            function(){
                self.draw();
            },500
        );

    },

    draw: function() {
        var today=new Date();

        var timerValue = $('#'+this.objectId+'TimerValue');
        if (!timerValue.length) {
            timerValue = $('<div id="'+this.objectId+'TimerValue" class="boxValue"></div>');
            this.object.append(timerValue);
        }
        timerValue.css('line-height', this.object.height()+"px");
        timerValue.text(this.checkTime(today.getHours())+':'+this.checkTime(today.getMinutes())+':'+this.checkTime(today.getSeconds()));

        var dateValue = $('#'+this.objectId+'DateValue');
        if (!dateValue.length) {
            dateValue = $('<div id="'+this.objectId+'DateValue" class="boxLabel"></div>');
            this.object.append(dateValue);
        }

        dateValue.text(this.checkTime(today.getDate())+'/'+this.checkTime(today.getMonth()+1)+'/'+today.getFullYear());
    },

    checkTime: function(i)
    {
        if (i < 10) {
            return "0"+i;
        }
        return i;
    }
});
