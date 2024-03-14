"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModuleTemplateCode = void 0;
var fs = require("fs");
function CreateModuleTemplateCode(module) {
    var Controller = "import { Controller } from '@nestjs/common';\n    import { ".concat(module.name, "Service } from './").concat(module.name.toLowerCase(), ".service';\n    \n    @Controller('").concat(module.resources[0].moduleEndpoint, "')\n    export class ").concat(module.name, "Controller {\n      constructor(private readonly ").concat(module.name.toLowerCase(), "Service: ").concat(module.name, "Service) {}\n    \n      @Get()\n      getHello(): string {\n        return this.").concat(module.name.toLowerCase(), "Service.getHello();\n      }\n    }\n    ");
    var Module = "import { Module } from '@nestjs/common';\n    import { ".concat(module.name, "Controller } from './").concat(module.name.toLowerCase(), ".controller';\n    import { ").concat(module.name, "Service } from './").concat(module.name.toLowerCase(), ".service';\n    \n    @Module({\n      imports: [],\n      controllers: [").concat(module.name, "Controller],\n      providers: [").concat(module.name, "Service],\n    })\n    export class ").concat(module.name, "Module {}\n    ");
    var Service = "import { Injectable } from '@nestjs/common';\n    \n    @Injectable()\n    export class ".concat(module.name, "Service {\n      getHello(): string {\n        return 'Hello World!';\n      }\n    }\n    ");
    fs.mkdirSync("".concat(module.name), { recursive: true });
    WriteToFile("".concat(module.name, "/").concat(module.name, ".controller.ts"), Controller);
    WriteToFile("".concat(module.name, "/").concat(module.name, ".module.ts"), Module);
    WriteToFile("".concat(module.name, "/").concat(module.name, ".service.ts"), Service);
}
exports.CreateModuleTemplateCode = CreateModuleTemplateCode;
function WriteToFile(filename, data) {
    fs.writeFile(filename, data, function (err) {
        if (err) {
            console.error("Error writing Template: ", err);
        }
        else {
            console.log("".concat(filename, " Template generated successfully!"));
        }
    });
}
