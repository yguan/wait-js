# wait-js

This repository contains a simple class for waiting condition to be met. This is a modification of waitfor.js from https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js

## Usage

```javascript
var wait = require('wait-js');

wait.for({
    testFn: function () {
        // check if condition is met
    },
    onReady: function () {
        // thing to do when the condition is met
    },
    onTimeout: function () {
        // thing to do when timeout occurs
    },
    timeoutMs: 3000
});
```

## License

[MIT](http://opensource.org/licenses/MIT)