# waigo-plugin-method-override

[![Build Status](https://secure.travis-ci.org/waigo/method-override.png)](http://travis-ci.org/waigo/method-override)

This [waigo](http://waigojs.com) plugin provides:

**methodOverride**

This middleware allows you to override the HTTP method for an incoming request 
by either specifying the new HTTP method in the `_method` query parameter or the 
`_method` body parameter.
 
This allows you to, for example, call `DELETE` routes using a HTTP `GET` request. 


## Installation

```bash
$ npm install waigo-plugin-method-override
```

## Example

You can enable this middleware per route:

```javascript
// <app folder>/routes.js

module.exports = {
  ...

  'DELETE /item': ['methodOverride', 'item.delete'],

  ...
}
```

...or as common middleware for all routes:

```javascript
// <app folder>/config/base.js

module.exports = function(config) {
  ...

  config.middleware.order = [
    'errorHandler',
    'staticResources',
    'methodOverride', 
    ...
  ];  
}
```


## License

MIT - see LICENSE.md
