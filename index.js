var fs = require('fs');

var base_dir = __dirname + "/../../";

var set_base_dir = function(new_base_dir) {
    base_dir = new_base_dir;
};

var default_relative_path = "config/server_config.json";
// Generates the absolute file path of the location of the configuration
// param "levels" [int]: Number of levels of parent directories to traverse
// param "relative_path" [string]: Relative part of file path.
var generate_file_path = function(levels, relative_path) {
    
    // Get relative part of the path
    // and set default value if necessary
    rpath = relative_path;
    if (!rpath) {
        rpath = default_relative_path;
    }
    
    // Header of the absolute path
    out_path = base_dir;
    
    // Generate the (../)* of the path
    for (var i = 0; i < levels; i++) {
        out_path += "/..";
    }
    
    // Add up the relative path section
    out_path += "/" + rpath;
    
    return out_path;
};

var config_file_path = null;

var config = null;

// Reads the configuration file from disk
// param "callback" [callback]: Standard callback
// return: nothing
var load_config_file = function(callback) {
    fs.readFile(config_file_path, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        try {
            config = JSON.parse(data);
            callback(null)
        } catch(err) {
            config = null;
            callback(err);
            return;
        }
    });
};

// Changes levels and relative path of the configuration file,
// and reloads file from disk
// param "levels" [int]: Number of levels of parent directories to add to the path
// param "relative_path" [int]: Relative path of the json configuration file
// param "callback" [callback]: Standard callback
// return: nothing
var set_configuration_file = function(levels, relative_path, callback) {
    config_file_path = generate_file_path(levels, relative_path);
    load_config_file(callback);
};

// Returns the parsed configuration object
// return: configuration object
var get_config = function() {
    return config;
};

module.exports = {
    get_config: get_config,
    set_configuration_file: set_configuration_file,
    generate_file_path: generate_file_path,
    set_base_dir: set_base_dir
};
