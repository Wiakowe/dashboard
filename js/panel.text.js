var TextPanel = Panel.extend({

    init: function(obj, settings) {
        if (!settings.text) {
            return false;
        }

        var defaultSettings = {};

        settings = $.extend({}, defaultSettings, settings || {});

        var objectId = obj.attr('id');

        var textValue = $('#'+objectId+'TextValue');
        if (!textValue.length) {
            textValue = $('<div id="'+objectId+'TextValue" class="boxValue"></div>');
            obj.append(textValue);
            obj.find('.boxValue').css('line-height', obj.height()+"px");
        }
        textValue.text(settings.text);

    }

});
