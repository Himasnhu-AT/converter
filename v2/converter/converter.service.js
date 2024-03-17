"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToFile = void 0;
var fs = require("fs");
var controller_generator_1 = require("./controller.generator");
var service_generator_1 = require("./service.generator");
function createModuleTemplateCode(module) {
    module.resources.forEach(function (resource) {
        var controllerMethods = [];
        var serviceMethods = [];
        resource.endpoints.forEach(function (endpoint) {
            var controllerMethod = (0, controller_generator_1.generateControllerMethod)(endpoint);
            var serviceMethod = (0, service_generator_1.generateServiceMethod)(endpoint);
            controllerMethods.push(controllerMethod);
            serviceMethods.push(serviceMethod);
        });
        var controller = (0, controller_generator_1.generateController)(module.name, resource.moduleEndpoint, controllerMethods.join("\n"));
        var service = (0, service_generator_1.generateService)(module.name, serviceMethods.join("\n"));
        var moduleFile = "import { Module } from '@nestjs/common';\nimport { ".concat(module.name, "Controller } from './").concat(resource.moduleEndpoint.toLowerCase(), ".controller';\nimport { ").concat(module.name, "Service } from './").concat(resource.moduleEndpoint.toLowerCase(), ".service';\n\n@Module({\n    controllers: [").concat(module.name, "Controller],\n    providers: [").concat(module.name, "Service],\n})\nexport class ").concat(module.name, "Module {}");
        fs.mkdirSync(module.name, { recursive: true });
        writeToFile("".concat(module.name, "/").concat(resource.moduleEndpoint, ".controller.ts"), controller);
        writeToFile("".concat(module.name, "/").concat(resource.moduleEndpoint, ".module.ts"), moduleFile);
        writeToFile("".concat(module.name, "/").concat(resource.moduleEndpoint, ".service.ts"), service);
    });
}
exports.default = createModuleTemplateCode;
function writeToFile(filename, data) {
    fs.writeFile(filename, data, function (err) {
        if (err) {
            console.error("Error writing Template: ", err);
        }
        else {
            console.log("".concat(filename, " Template generated successfully!"));
        }
    });
}
exports.writeToFile = writeToFile;
