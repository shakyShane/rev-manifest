"use strict";

var through2 = require("through2");
var gutil    = require("gulp-util");
var path     = require("path");

var cwd      = process.cwd();

module.exports = function (existing, opts) {

    var firstFile = null;
    var manifest  = existing || {};
    var config    = opts || {};

    return through2.obj(function (file, enc, cb) {
        // ignore all non-rev'd files
        if (file.path && file.revOrigPath) {
            firstFile = firstFile || file;
            var toStrip = file.cwd + (config.strip || "");
            var key   = file.revOrigPath.replace(toStrip, "");
            var value = firstFile.path.replace(toStrip, "");
            manifest[key] = value;
        }
        cb();
    }, function (cb) {

        if (firstFile) {
            this.push(new gutil.File({
                cwd: cwd,
                base: cwd,
                path: './manifest.json',
                contents: new Buffer(JSON.stringify(manifest, null, '  '))
            }));
        }
        cb();
    });
};