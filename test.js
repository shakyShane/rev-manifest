"use strict";

var gutil    = require("gulp-util");
var assert   = require("assert");

var manifest = require("./index");

var cwd      = process.cwd();

it("should write manifest with no opts/config", function (cb) {

    var stream = manifest();
    var file = new gutil.File({
        path: cwd + "/public/css/dist/unicorn.css",
        contents: new Buffer('')
    });

    file.revOrigPath = cwd + "/public/css/unicorn.css";

    stream.on("data", function (file) {
        var actual   = JSON.parse(file.contents.toString());
        var expected = {
            "/public/css/unicorn.css": "/public/css/dist/unicorn.css"
        };
        assert.deepEqual(actual, expected);
        cb();
    });

    stream.write(file);
    stream.end();
});

it("should write manifest with existing", function (cb) {

    var stream = manifest({"css/shane.css": "css/dist/shane.css"});
    var file = new gutil.File({
        path: cwd + "/public/css/dist/unicorn.css",
        contents: new Buffer('')
    });

    file.revOrigPath = cwd + "/public/css/unicorn.css";

    stream.on("data", function (file) {
        var actual   = JSON.parse(file.contents.toString());
        var expected = {
            "/public/css/unicorn.css": "/public/css/dist/unicorn.css",
            "css/shane.css": "css/dist/shane.css"
        };
        assert.deepEqual(actual, expected);
        cb();
    });

    stream.write(file);
    stream.end();
});


it("should write manifest with no opts/config", function (cb) {

    var stream = manifest({}, {strip: "/public"});
    var file = new gutil.File({
        path: cwd + "/public/css/dist/unicorn.css",
        contents: new Buffer('')
    });

    file.revOrigPath = cwd + "/public/css/unicorn.css";

    stream.on("data", function (file) {
        var actual   = JSON.parse(file.contents.toString());
        var expected = {
            "/css/unicorn.css": "/css/dist/unicorn.css"
        };
        assert.deepEqual(actual, expected);
        cb();
    });

    stream.write(file);
    stream.end();
});