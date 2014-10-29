
if(arguments[0]) {
  var args = arguments[0];

  if (args.id) {
    exports.id = args.id;
    delete args.id;
  }
  delete args.__parentSymbol;
  delete args.__itemTemplate;
  delete args['$model'];

  if(OS_IOS) {
    attachToolbar();
  }

  applyProperties(arguments[0]);

  delete args.children;
}

/**
 * Attach a keyboard toolbar with a 'done' button to dismiss the keyboard
 *
 * @return {[type]} [description]
 */
function attachToolbar() {
    var flexSpace = Ti.UI.createButton({
        systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    var doneBtn = Ti.UI.createButton({
        systemButton : Titanium.UI.iPhone.SystemButton.DONE
    });
    doneBtn.addEventListener('click', function(e) {
      $.input.blur();
    });
    $.input.keyboardToolbar = [flexSpace, doneBtn];
}

/**
 * Apply TSS style properties to our widget
 *
 * @param  {[type]} properties [description]
 * @return {[type]}            [description]
 */
function applyProperties(properties) {
  properties = _.omit(properties, 'children');

  console.log('applyProperties : ' + JSON.stringify(properties));

  $.input.applyProperties(properties);
}

function getValue() {
  return $.input.value;
}
function setValue(value) {
  $.input.value = value;
}

/**
 * EXPORTS
 */
exports.setValue = setValue;
exports.getValue = getValue;
Object.defineProperty($, "value", {
    get: getValue,
    set: setValue
});
exports.applyProperties = applyProperties;

/**
 * Events
 * proxies for standard Ti/Alloy event handling
 */
exports.addEventListener = $.input.on;
exports.removeEventListener = $.input.off;
exports.fireEvent = $.input.trigger;