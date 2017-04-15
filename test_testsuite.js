var async = require("async");

var rawconf = require(__dirname + "/index.js");

var tests = [];

// // example passing test
// tests.push(function(stats, callback) {
//     stats["pass"] += 1;
//     callback(null);
// });
// 
// // example failing test
// tests.push(function(stats, callback) {
//     stats["pass"] += 1;
//     callback(null);
// });



module.exports = {
    tests: tests
};
