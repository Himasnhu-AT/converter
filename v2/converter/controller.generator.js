"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateController = exports.generateControllerMethod = void 0;
function generateControllerMethod(endpoint) {
    var method = "  @".concat(endpoint.methods[0], "('").concat(endpoint.path, "')\n");
    method += "  async ".concat(endpoint.function, "() {\n");
    method += "    return await this.controllerService.".concat(endpoint.function, "();\n");
    method += "  }\n";
    return method;
}
exports.generateControllerMethod = generateControllerMethod;
// Function to generate controller code
function generateController(moduleName, endpoint, methods) {
    return "import { Controller, Get, Post, Put, Delete } from '@nestjs/common';\n  import { ".concat(moduleName, "Service } from './").concat(endpoint.toLowerCase(), ".service';\n    \n  @Controller('").concat(endpoint, "')\n  export class ").concat(moduleName, "Controller {\n      constructor(private readonly controllerService: ").concat(moduleName, "Service) {}\n  ").concat(methods, "\n  }");
}
exports.generateController = generateController;
