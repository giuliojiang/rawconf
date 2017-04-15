var async = require("async");
var jassert = require("jassert.js");

var rawconf = require(__dirname + "/index.js");

var tests = [];

// generate_file_path tests
tests.push(function(callback) {
    jassert.assert_equal(__dirname + "/conf/conf.json", rawconf.generate_file_path(0, "conf/conf.json"));
    
    jassert.assert_equal(__dirname + "/../conf/conf.json", rawconf.generate_file_path(1, "conf/conf.json"));
    
    callback(null);
});

module.exports = {
    tests: tests
};
