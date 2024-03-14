"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleModules = void 0;
var module_template_1 = require("./module.template");
function HandleModules(moduleData) {
    //   console.log("\n\nModules Are Present Here:   \n", moduleData);
    console.log("Module Parsed ");
    (0, module_template_1.CreateModuleTemplateCode)(moduleData);
}
exports.HandleModules = HandleModules;
