var async = require("async");
var jassert = require("jassert.js");

var rawconf = require(__dirname + "/index.js");

var tests = [];

// generate_file_path tests
tests.push(function(stats, callback) {
    jassert.assert_equal(__dirname + "/conf/conf.json", rawconf.generate_file_path(0, "conf/conf.json"), stats);
    
    jassert.assert_equal(__dirname + "/../conf/conf.json", rawconf.generate_file_path(1, "conf/conf.json"), stats);
    
    callback(null);
});

module.exports = {
    tests: tests
};
