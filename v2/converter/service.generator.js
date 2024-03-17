"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateService = exports.generateServiceMethod = void 0;
function generateServiceMethod(endpoint) {
    var _a, _b, _c, _d, _e, _f, _g;
    return "\nasync ".concat(endpoint.function, "() {\n    try {\n      return await this.prisma.").concat(endpoint.return["200"].data.prisma.model, ".").concat((_a = endpoint.return["200"].data) === null || _a === void 0 ? void 0 : _a.prisma.action, "({\n        select: ").concat(JSON.stringify((_b = endpoint.return["200"].data) === null || _b === void 0 ? void 0 : _b.prisma.args.select), ",\n        include: ").concat(JSON.stringify((_c = endpoint.return["200"].data) === null || _c === void 0 ? void 0 : _c.prisma.args.include), ",\n        skip: ").concat(((_d = endpoint.return["200"].data) === null || _d === void 0 ? void 0 : _d.prisma.args.skip) || 0, ",\n        take: ").concat(((_e = endpoint.return["200"].data) === null || _e === void 0 ? void 0 : _e.prisma.args.take) || 10, ",\n        orderBy: ").concat(JSON.stringify((_f = endpoint.return["200"].data) === null || _f === void 0 ? void 0 : _f.prisma.args.orderBy), ",\n        where: ").concat(JSON.stringify((_g = endpoint.return["200"].data) === null || _g === void 0 ? void 0 : _g.prisma.args.where), "\n      });\n    } catch(e) {\n      console.error(`Failed ").concat(endpoint.function, " Server Error 500:`);\n      console.error(e);\n    }\n  }");
}
exports.generateServiceMethod = generateServiceMethod;
// Function to generate service code
function generateService(moduleName, methods) {
    return "import { Injectable } from '@nestjs/common';\n    \n  @Injectable()\n  export class ".concat(moduleName, "Service {\n      constructor(private readonly prisma: PrismaService) {}\n  ").concat(methods, "\n  }");
}
exports.generateService = generateService;
