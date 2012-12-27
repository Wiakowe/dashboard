function TimePanel(obj, settings) {
    var self = this;

    var defaultSettings = {};

    settings = $.extend({}, defaultSettings, settings || {});

    $.extend(this, new BasePanel());

    this.callback = function() {
        self.printTime();
    }

    this.init = function() {

        self.initialize();

        self.printTime();

        t = setTimeout(
            function(){
                obj.timePanel();
            },500
        );
    }

    this.printTime = function() {
        var today=new Date();

        var elementId = obj.attr('id');

        var timerValue = $('#'+elementId+'TimerValue');
        if (!timerValue.length) {
            timerValue = $('<div id="'+elementId+'TimerValue" class="boxValue"></div>');
            obj.append(timerValue);
            obj.find('.boxValue').css('line-height', obj.height()+"px");
        }
        timerValue.text(self.checkTime(today.getHours())+':'+self.checkTime(today.getMinutes())+':'+self.checkTime(today.getSeconds()));

        var dateValue = $('#'+elementId+'DateValue');
        if (!dateValue.length) {
            dateValue = $('<div id="'+elementId+'DateValue" class="boxLabel"></div>');
            obj.append(dateValue);
        }

        dateValue.text(self.checkTime(today.getDate())+'/'+self.checkTime(today.getMonth()+1)+'/'+today.getFullYear());
    }

    this.checkTime = function(i)
    {
        if (i < 10) {
            return "0"+i;
        }
        return i;
    }

    return this.init();

}
