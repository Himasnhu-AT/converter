"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertJsonToNest = void 0;
var handleModules_1 = require("./handleModules");
function ConvertJsonToNest(JsonData) {
    JsonData.modules.forEach(function (module) {
        (0, handleModules_1.HandleModules)(module);
    });
}
exports.ConvertJsonToNest = ConvertJsonToNest;
