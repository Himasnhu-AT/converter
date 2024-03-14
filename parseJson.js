"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
var converter_1 = require("./converter");
function parseJson(filepath) {
    try {
        var fs = require("fs");
        var data = fs.readFileSync(filepath, "utf8");
        try {
            var jsonData = JSON.parse(data);
            console.log("JSON parsed successfully");
            (0, converter_1.ConvertJsonToNest)(jsonData);
        }
        catch (e) {
            console.error("Error parsing JSON: ", e);
            return null;
        }
    }
    catch (e) {
        console.error("Error reading file: ", e);
        return null;
    }
}
exports.parseJson = parseJson;
