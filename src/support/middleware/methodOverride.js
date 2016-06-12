"use strict";


var debug = require('debug')('waigo-plugin-method-override');


/**
 * # Middleware: Method override
 *
 * This allows you to override the HTTP method for an incoming request by 
 * either specifying the new method type in the `_method` query or body 
 * parameter.
 *
 * This allows you to, for example, call `DELETE` routes using a HTTP `GET` 
 * request. 
 */



/**
 * Middleware for overriding request method using a request query or form body parameter.
 */
module.exports = function() {
  return function*(next) {
    var override = this.request.query._method ||
      (this.request.body && this.request.body._method);

    if (override) {
      debug('Override method: ' + this.request.method + ' -> ' + override);
      this.request.method = override;
    }

    yield next;
  }
};
