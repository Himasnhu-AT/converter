"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseJson = void 0;
var fs = require("fs");
function ParseJson(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    catch (e) {
        return null;
    }
}
exports.ParseJson = ParseJson;
