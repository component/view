
/**
 * Module dependencies.
 */

var reactive = require('reactive')
  , delegate = require('delegate')
  , object = require('object')
  , keys = object.keys;

/**
 * Expose `View`.
 */

module.exports = View;

/**
 * Initialize a view with the given `obj` / `el`.
 *
 *    function ItemView(item) {
 *      View.call(this, item, tmpl.cloneNode(true));
 *    }
 *
 * @param {Object} obj
 * @param {Element} el
 * @api public
 */

function View(obj, el) {
  this.el = el;
  this.obj = obj;
  this.view = reactive(el, obj, this);
  this.bindings = {};
}

/**
 * Bind to an event with the given `str`, and invoke `method`:
 *
 *    this.bind('click .remove', 'remove')
 *    this.bind('click .complete', 'complete')
 *    this.bind('dblclick .info a', 'showDetails')
 *
 * @param {String} str
 * @param {String} method
 * @api public
 */

View.prototype.bind = function(str, method){
  var parts = str.split(' ');
  var event = parts.shift();
  var selector = parts.join(' ');
  var meth = this[method];
  if (!meth) throw new TypeError('method "' + method + '" is not defined');
  var fn = delegate.bind(this.el, selector, event, meth.bind(this));
  this.bindings[str] = fn;
};

/**
 * Unbind all listeners, all for a specific event, or 
 * a specific combination of event / selector.
 *
 *    view.unbind()
 *    view.unbind('click')
 *    view.unbind('click .remove')
 *    view.unbind('click .details')
 *
 * @param {String} [str]
 * @api public
 */

View.prototype.unbind = function(str){
  if (str) {
    var fn = this.bindings[str];
    if (!fn) return;
    var parts = str.split(' ');
    var event = parts.shift();
    delegate.unbind(this.el, event, fn);
  } else {
    keys(this.bindings).forEach(this.unbind.bind(this));
  }
};
