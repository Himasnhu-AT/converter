"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModuleTemplateCode = void 0;
var fs = require("fs");
function CreateModuleTemplateCode(module) {
    module.resources.forEach(function (resource) {
        var controllerMethods = [];
        var serviceMethods = [];
        resource.endpoints.forEach(function (endpoint) {
            var controllerMethod = generateControllerMethod(endpoint);
            var serviceMethod = generateServiceMethod(endpoint);
            controllerMethods.push(controllerMethod);
            serviceMethods.push(serviceMethod);
        });
        var controller = generateController(module.name, resource.moduleEndpoint, controllerMethods.join("\n"));
        var service = generateService(module.name, serviceMethods.join("\n"));
        var moduleFile = "import { Module } from '@nestjs/common';\nimport { ".concat(module.name, "Controller } from './").concat(resource.moduleEndpoint.toLowerCase(), ".controller';\nimport { ").concat(module.name, "Service } from './").concat(resource.moduleEndpoint.toLowerCase(), ".service';\n\n@Module({\n    controllers: [").concat(module.name, "Controller],\n    providers: [").concat(module.name, "Service],\n})\nexport class ").concat(module.name, "Module {}\n");
        fs.mkdirSync("".concat(module.name), { recursive: true });
        WriteToFile("".concat(module.name, "/").concat(resource.moduleEndpoint, ".controller.ts"), controller);
        WriteToFile("".concat(module.name, "/").concat(resource.moduleEndpoint, ".module.ts"), moduleFile);
        WriteToFile("".concat(module.name, "/").concat(resource.moduleEndpoint, ".service.ts"), service);
    });
}
exports.CreateModuleTemplateCode = CreateModuleTemplateCode;
function generateControllerMethod(endpoint) {
    var method = "  @".concat(endpoint.methods[0], "('").concat(endpoint.path, "')\n");
    method += "  async ".concat(endpoint.function, "() {\n");
    method += "    return await this.controllerService.".concat(endpoint.function, "();\n");
    method += "  }\n";
    return method;
}
function generateController(moduleName, endpoint, methods) {
    return "import { Controller, Get, Post, Put, Delete } from '@nestjs/common';\n  import { ".concat(moduleName, "Service } from './").concat(endpoint.toLowerCase(), ".service';\n  \n@Controller('").concat(endpoint, "')\nexport class ").concat(moduleName, "Controller {\n    constructor(private readonly controllerService: ").concat(moduleName, "Service) {}\n").concat(methods, "\n}\n");
}
function generateServiceMethod(endpoint) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return "\nasync ".concat(endpoint.function, "() {\n  try {\n    ").concat(((_a = endpoint.return[200]) === null || _a === void 0 ? void 0 : _a.data)
        ? "return await this.prisma.".concat(endpoint.return[200].data.prisma.model, ".").concat((_b = endpoint.return[200].data) === null || _b === void 0 ? void 0 : _b.prisma.action, "({\n            ").concat(((_c = endpoint.return[200].data) === null || _c === void 0 ? void 0 : _c.prisma.select)
            ? "select: ".concat(JSON.stringify((_d = endpoint.return[200].data) === null || _d === void 0 ? void 0 : _d.prisma.select))
            : "").concat(((_e = endpoint.return[200].data) === null || _e === void 0 ? void 0 : _e.prisma.include)
            ? ",\ninclude: ".concat(JSON.stringify((_f = endpoint.return[200].data) === null || _f === void 0 ? void 0 : _f.prisma.include))
            : "").concat(((_g = endpoint.return[200].data) === null || _g === void 0 ? void 0 : _g.prisma.skip)
            ? ",\nskip: ".concat((_h = endpoint.return[200].data) === null || _h === void 0 ? void 0 : _h.prisma.skip)
            : "").concat(((_j = endpoint.return[200].data) === null || _j === void 0 ? void 0 : _j.prisma.take)
            ? ",\ntake: ".concat(endpoint.return[200].data.prisma.take)
            : "").concat(((_k = endpoint.return[200].data) === null || _k === void 0 ? void 0 : _k.prisma.orderBy)
            ? ",\norderBy: ".concat(JSON.stringify((_l = endpoint.return[200].data) === null || _l === void 0 ? void 0 : _l.prisma.orderBy))
            : "").concat(((_m = endpoint.return[200].data) === null || _m === void 0 ? void 0 : _m.prisma.where)
            ? ",\nwhere: ".concat(JSON.stringify((_o = endpoint.return[200].data) === null || _o === void 0 ? void 0 : _o.prisma.where))
            : "", "\n          })")
        : "", "\n  } catch(e) {\n    console.error(`Failed ").concat(endpoint.function, " Server Error 500:`);\n    console.error(e);\n  }\n}");
}
// function generateServiceMethod(endpoint: Endpoint): string {
//   return `\nasync ${endpoint.function}() {
//   try {
//     ${
//       endpoint.return[200]?.data
//         ? `return await this.prisma.${
//             endpoint.return[200].data!.prisma.model
//           }.${endpoint.return[200].data?.prisma.action}({
//             where: {
//       ${
//         endpoint.return[200].data?.prisma.where
//           ? endpoint.return[200].data?.prisma.where
//               .map((param) => {
//                 return `${param.name}: ${param.value}`;
//               })
//               .join(", ")
//           : ""
//       }
//     },
//     select: {
//       ${
//         endpoint.return[200].data?.prisma.select
//           ? endpoint.return[200].data?.prisma.select
//               .map((param) => {
//                 return `${param.name}: ${param.value}`;
//               })
//               .join(", ")
//           : ""
//       }
//     },
//     include: {
//       ${
//         endpoint.return[200].data?.prisma.include
//           ? endpoint.return[200].data?.prisma.include
//               .map((param) => {
//                 return `${param.name}: ${param.value}`;
//               })
//               .join(", ")
//           : ""
//       }
//           })`
//         : ""
//     }
//   } catch(e) {
//     console.error(\`Failed ${endpoint.function} Server Error 500:\`);
//     console.error(e);
//   }
// }`;
// }
function generateService(moduleName, methods) {
    return "import { Injectable } from '@nestjs/common';\n  \n@Injectable()\nexport class ".concat(moduleName, "Service {\n    constructor(private readonly prisma: PrismaService) {}\n").concat(methods, "\n}\n");
}
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
