/*jslint nomen: true*/
/*global module */

var defaultCheckIntervalInMs = 100;

function executeFn(fn) {
    return typeof(fn) === "string" ? eval(fn) : fn();
}

/**
 * This is a modification of waitfor.js from https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 * @param {Object} options options of the method.
 * @param {Function} options.testFn javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param {Function} options.onReady what to do when testFn condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param {Function} options.onTimeout what to do when testFn condition is not fulfilled and timeout occurs.
 * @param {Number} options.timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
module.exports.for = function (options) {
    var maxTimeoutMillis = options.timeOutMillis || 3000, // Default Max Timeout is 3s
        start = new Date().getTime(),
        interval = setInterval(function () {
            try {
                if (executeFn(options.testFn)) {      // The condition is met
                    clearInterval(interval);  // Stop the interval
                    executeFn(options.onReady);
                    return;
                }

                if (new Date().getTime() - start > maxTimeoutMillis) { // It timeouts
                    clearInterval(interval);
                    executeFn(options.onTimeout);
                }
            }
            catch (e) {
                clearInterval(interval);
                throw e;
            }
        }, defaultCheckIntervalInMs); // repeat check
};