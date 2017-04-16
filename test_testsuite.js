var async = require("async");
var jassert = require("jassert.js");

var rawconf = require(__dirname + "/index.js");

var tests = [];

// generate_file_path tests
tests.push((callback) => {
    jassert.assert_equal(__dirname + "/conf/conf.json", rawconf.generate_file_path(0, "conf/conf.json"));
    
    jassert.assert_equal(__dirname + "/../conf/conf.json", rawconf.generate_file_path(1, "conf/conf.json"));
    
    jassert.assert_equal(__dirname + "/conf/conf.json", rawconf.generate_file_path({}, "conf/conf.json"));
    
    callback(null);
});

// configuration load test
tests.push((callback) => {
    rawconf.set_configuration_file(0, "/test/test.json", (err) => {
        // there should be no errors
        jassert.assert_equal_deep(null, err);

        // get the configuration object
        var conf = rawconf.get_config();
        
        // check configuration content
        var expected = {
            version: "0.1",
            test: "yes"
        };
        jassert.assert_equal_deep(expected, conf);
        
        callback(null);
    });
});

// bad path configuration load test
tests.push((callback) => {
    rawconf.set_configuration_file(12, "this_is_a/bad_path.json", (err) => {
        jassert.assert_true(err != null);
        
        jassert.assert_equal(null, rawconf.get_config());
        
        callback(null);
    });
});

module.exports = {
    tests: tests
};
