var TimePanel = Panel.extend({

    object: null,

    init: function(obj, settings) {

        object = obj;

        this.printTime();

        t = setTimeout(
            function(){
                obj.timePanel();
            },500
        );
    },

    printTime: function() {
        var today=new Date();

        var elementId = object.attr('id');

        var timerValue = $('#'+elementId+'TimerValue');
        if (!timerValue.length) {
            timerValue = $('<div id="'+elementId+'TimerValue" class="boxValue"></div>');
            object.append(timerValue);
            object.find('.boxValue').css('line-height', object.height()+"px");
        }
        timerValue.text(this.checkTime(today.getHours())+':'+this.checkTime(today.getMinutes())+':'+this.checkTime(today.getSeconds()));

        var dateValue = $('#'+elementId+'DateValue');
        if (!dateValue.length) {
            dateValue = $('<div id="'+elementId+'DateValue" class="boxLabel"></div>');
            object.append(dateValue);
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
